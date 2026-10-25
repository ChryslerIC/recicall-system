import argparse
import csv
import math
import random
from collections import defaultdict
from pathlib import Path
from statistics import mean, stdev


ROOT = Path(__file__).resolve().parents[1]
RESULTS_DIR = ROOT / "evaluation" / "results"
MAX_POINTS_PER_TURN = 5
HISTORY_ROUNDS = 10


def js_round(value, digits=0):
    factor = 10**digits
    return math.floor(value * factor + 0.5) / factor


def clamp(value, minimum, maximum):
    return min(max(value, minimum), maximum)


def fairness_score(counts):
    counts = list(counts)
    if not counts or sum(counts) == 0:
        return 100

    average = sum(counts) / len(counts)
    difference = sum(abs(left - right) for left in counts for right in counts)
    gini = difference / (2 * len(counts) ** 2 * average)
    return round(clamp((1 - gini) * 100, 0, 100))


def create_students(size, scenario, rng):
    students = []
    for index in range(size):
        if scenario == "balanced":
            sessions = 2
            points_per_turn = 3
        elif scenario == "unequal":
            sessions = rng.randint(0, 12)
            points_per_turn = rng.choice([1, 3, 5])
        elif scenario == "cold_start":
            sessions = 0 if index < size * 0.4 else rng.randint(1, 5)
            points_per_turn = rng.choice([1, 3, 5])
        elif scenario == "attendance":
            sessions = rng.randint(1, 6)
            points_per_turn = rng.choice([1, 3, 5])
        else:  # tie_heavy
            sessions = 2
            points_per_turn = 3

        last_round = rng.randint(1, HISTORY_ROUNDS) if sessions else 0
        row = index // max(2, int(math.sqrt(size)))
        column = index % max(2, int(math.sqrt(size)))
        row_depth = row / max(1, math.ceil(size / max(2, int(math.sqrt(size)))) - 1)
        edge_distance = abs(column - 0.5) / 0.5
        seat_boost = round(clamp(row_depth * 16 + edge_distance * 10, 0, 24))
        if scenario == "tie_heavy":
            seat_boost = 0
            last_round = HISTORY_ROUNDS - 2

        students.append(
            {
                "id": f"STU{index + 1:04d}",
                "name": f"Student {index + 1:04d}",
                "sessions": sessions,
                "points": sessions * points_per_turn,
                "last_round": last_round,
                "missed": rng.randint(0, 2) if scenario == "attendance" else 0,
                "seat_boost": seat_boost,
            }
        )
    return students


def participation_score(student, tracked_sessions):
    sessions = max(student["sessions"], 0)
    points = max(student["points"], 0)
    average_points = points / sessions if sessions else 0
    quality_ratio = clamp(average_points / MAX_POINTS_PER_TURN, 0, 1)
    consistency_ratio = clamp(sessions / max(tracked_sessions, 1), 0, 1)
    return round(clamp(quality_ratio * 60 + consistency_ratio * 40, 0, 100))


def find_oracle(students, eligible_ids, total_sessions):
    best = None
    formula_checks = 0
    formula_total = 0

    for student in students:
        if student["id"] not in eligible_ids:
            continue

        score = participation_score(student, total_sessions)
        wait = total_sessions - student["last_round"] if student["last_round"] else total_sessions
        wait_boost = clamp(wait * 18, 0, 45)
        first_boost = 28 if student["sessions"] == 0 else 0
        absence_boost = clamp(student["missed"] * 10, 0, 24)
        need_boost = js_round((100 - score) * 0.52, 1)
        raw_score = js_round(need_boost + wait_boost + first_boost + absence_boost + student["seat_boost"], 1)
        priority_score = clamp(raw_score, 0, 100)
        component_total = js_round(need_boost + wait_boost + first_boost + absence_boost + student["seat_boost"], 1)

        formula_total += 1
        formula_checks += component_total == raw_score
        candidate = {
            "id": student["id"],
            "score": priority_score,
            "wait": wait,
            "raw_score": raw_score,
            "component_total": component_total,
        }
        if best is None or (-candidate["score"], -candidate["wait"], candidate["id"]) < (
            -best["score"],
            -best["wait"],
            best["id"],
        ):
            best = candidate

    return best, formula_checks, formula_total


def run_algorithm(initial_students, scenario, rounds, algorithm, seed):
    rng = random.Random(seed)
    students = [student.copy() for student in initial_students]
    student_by_id = {student["id"]: student for student in students}
    attendance_schedule = []
    for _ in range(rounds):
        if scenario == "attendance":
            attendance_schedule.append({student["id"] for student in students if rng.random() >= 0.2})
        else:
            attendance_schedule.append({student["id"] for student in students})

    selected_ids = []
    selection_counts = {student["id"]: 0 for student in students}
    eligible_ever = set()
    priority_compliant = 0
    successful_selections = 0
    formula_checks = 0
    formula_total = 0
    round_robin_pointer = -1
    ordered_ids = [student["id"] for student in students]

    for round_number, eligible_ids in enumerate(attendance_schedule, start=1):
        eligible_ever.update(eligible_ids)
        total_sessions = HISTORY_ROUNDS + round_number - 1
        oracle, round_formula_checks, round_formula_total = find_oracle(
            students, eligible_ids, total_sessions
        )
        formula_checks += round_formula_checks
        formula_total += round_formula_total
        if oracle is None:
            continue

        if algorithm == "priority_queue":
            selected_id = oracle["id"]
        elif algorithm == "random":
            selected_id = rng.choice(sorted(eligible_ids))
        else:
            selected_id = next(
                ordered_ids[(round_robin_pointer + offset) % len(ordered_ids)]
                for offset in range(1, len(ordered_ids) + 1)
                if ordered_ids[(round_robin_pointer + offset) % len(ordered_ids)] in eligible_ids
            )
            round_robin_pointer = ordered_ids.index(selected_id)

        if selected_id == oracle["id"]:
            priority_compliant += 1
        if selected_id in eligible_ids:
            successful_selections += 1
        selected_ids.append(selected_id)
        selection_counts[selected_id] += 1

        selected = student_by_id[selected_id]
        selected["sessions"] += 1
        selected["points"] += 3
        selected["last_round"] = total_sessions

    counts = [student["sessions"] for student in students]
    selected_at_least_once = sum(count > 0 for count in selection_counts.values())
    eligible_count = max(len(eligible_ever), 1)
    consecutive_repeats = sum(left == right for left, right in zip(selected_ids, selected_ids[1:]))
    unselected_wait = [rounds for student_id, count in selection_counts.items() if count == 0 and student_id in eligible_ever]
    longest_wait = max(unselected_wait or [0])

    return {
        "priority_compliance_percent": successful_selections and round(priority_compliant / len(selected_ids) * 100, 2) or 0,
        "fairness_score": fairness_score(counts),
        "starvation_prevention_percent": round(selected_at_least_once / eligible_count * 100, 2),
        "eligibility_compliance_percent": round(successful_selections / max(len(selected_ids), 1) * 100, 2),
        "participation_coverage_percent": round(selected_at_least_once / len(students) * 100, 2),
        "distribution_range": max(counts) - min(counts),
        "longest_unselected_wait_rounds": longest_wait,
        "formula_validity_percent": round(formula_checks / max(formula_total, 1) * 100, 2),
        "consecutive_repeat_rate_percent": round(consecutive_repeats / max(len(selected_ids) - 1, 1) * 100, 2),
        "successful_selections": len(selected_ids),
    }


def aggregate(rows):
    grouped = defaultdict(list)
    metric_names = [
        "priority_compliance_percent",
        "fairness_score",
        "starvation_prevention_percent",
        "eligibility_compliance_percent",
        "participation_coverage_percent",
        "distribution_range",
        "longest_unselected_wait_rounds",
        "formula_validity_percent",
        "consecutive_repeat_rate_percent",
        "successful_selections",
    ]

    for row in rows:
        grouped[(row["scenario"], row["students"], row["algorithm"])].append(row)

    output = []
    for (scenario, students, algorithm), group in sorted(grouped.items()):
        summary = {
            "scenario": scenario,
            "students": students,
            "rounds": group[0]["rounds"],
            "algorithm": algorithm,
            "repetitions": len(group),
        }
        for metric in metric_names:
            values = [float(row[metric]) for row in group]
            summary[f"avg_{metric}"] = round(mean(values), 2)
            summary[f"sd_{metric}"] = round(stdev(values), 2) if len(values) > 1 else 0
        output.append(summary)
    return output


def main():
    parser = argparse.ArgumentParser(description="Run large-scale synthetic ReciCall algorithm evaluation")
    parser.add_argument("--repetitions", type=int, default=5)
    parser.add_argument("--seed", type=int, default=20261021)
    parser.add_argument("--round-factor", type=int, default=5)
    parser.add_argument("--sizes", type=int, nargs="*", default=[30, 100, 300, 500, 1000])
    args = parser.parse_args()

    scenarios = ["balanced", "unequal", "cold_start", "attendance", "tie_heavy"]
    algorithms = ["priority_queue", "round_robin", "random"]
    rows = []

    for scenario_index, scenario in enumerate(scenarios):
        for size in args.sizes:
            rounds = size * args.round_factor
            for repetition in range(args.repetitions):
                run_seed = args.seed + scenario_index * 1000000 + size * 100 + repetition
                initial_students = create_students(size, scenario, random.Random(run_seed))
                for algorithm_index, algorithm in enumerate(algorithms):
                    metrics = run_algorithm(
                        initial_students,
                        scenario,
                        rounds,
                        algorithm,
                        run_seed + algorithm_index * 100000000,
                    )
                    rows.append(
                        {
                            "scenario": scenario,
                            "students": size,
                            "rounds": rounds,
                            "algorithm": algorithm,
                            "repetition": repetition + 1,
                            **metrics,
                        }
                    )

    summaries = aggregate(rows)
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    output_path = RESULTS_DIR / "large_scale_results.csv"
    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(summaries[0].keys()))
        writer.writeheader()
        writer.writerows(summaries)

    print(f"Large-scale evaluation complete: {len(rows)} runs")
    print(f"Results written to {output_path}")
    print("Priority queue at 100 students:")
    for row in summaries:
        if row["students"] == 100 and row["algorithm"] == "priority_queue":
            print(
                f"  {row['scenario']}: fairness={row['avg_fairness_score']}, "
                f"starvation={row['avg_starvation_prevention_percent']}%, "
                f"coverage={row['avg_participation_coverage_percent']}%"
            )


if __name__ == "__main__":
    main()
