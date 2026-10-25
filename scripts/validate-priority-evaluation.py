import csv
import math
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "evaluation" / "data"
RESULTS_DIR = ROOT / "evaluation" / "results"


def read_csv(path):
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def fairness_score(counts):
    if not counts:
        return 100

    mean = sum(counts) / len(counts)
    if mean == 0:
        return 100

    total_difference = sum(abs(left - right) for left in counts for right in counts)
    gini = total_difference / (2 * len(counts) ** 2 * mean)
    return round(max(0, min(100, (1 - gini) * 100)))


def number(value):
    return float(value) if value not in (None, "") else 0


def assert_equal(label, actual, expected):
    if actual != expected:
        raise AssertionError(f"{label}: expected {expected}, got {actual}")


def assert_close(label, actual, expected):
    if not math.isclose(actual, expected, abs_tol=0.01):
        raise AssertionError(f"{label}: expected {expected}, got {actual}")


def main():
    students = read_csv(DATA_DIR / "students.csv")
    events = read_csv(DATA_DIR / "participation_events.csv")
    selection_rows = read_csv(RESULTS_DIR / "selection_results.csv")
    replay_rows = read_csv(RESULTS_DIR / "replay_results.csv")
    summary_rows = read_csv(RESULTS_DIR / "summary.csv")

    summary = {row["dataset"]: row for row in summary_rows}
    historical = summary["historical_teacher_labels"]
    replay = summary["algorithm_replay"]
    baseline = summary["round_robin_baseline"]

    top1 = sum(row["top_1_correct"] == "YES" for row in selection_rows)
    top3 = sum(row["top_3_correct"] == "YES" for row in selection_rows)
    true_waits = [number(row["true_wait_sessions"]) for row in selection_rows]
    capped_scores = sum(int(row["capped_scores_in_queue"]) for row in selection_rows)
    formula_errors = sum(int(row["formula_errors_in_queue"]) for row in selection_rows)

    participation_counts = Counter(
        row["student_id"] for row in events if row["event_type"] == "participation"
    )
    historical_counts = [participation_counts.get(student["student_id"], 0) for student in students]
    historical_coverage = round(
        sum(count > 0 for count in historical_counts) / len(students) * 100
    )

    replay_counts = Counter(row["selected_student_id"] for row in replay_rows)
    replay_session_counts = [replay_counts.get(student["student_id"], 0) for student in students]
    replay_coverage = round(sum(count > 0 for count in replay_session_counts) / len(students) * 100)

    session_count = len(replay_rows)
    base_counts = [session_count // len(students) + (index < session_count % len(students)) for index in range(len(students))]

    assert_equal("Top-1 accuracy", float(historical["top_1_accuracy_percent"]), round(top1 / len(selection_rows) * 100, 2))
    assert_equal("Top-3 accuracy", float(historical["top_3_accuracy_percent"]), round(top3 / len(selection_rows) * 100, 2))
    assert_equal("Formula errors", int(historical["formula_errors"]), formula_errors)
    assert_equal("Capped candidate scores", int(historical["capped_candidate_scores"]), capped_scores)
    assert_close("Average true wait", float(historical["average_selected_wait_sessions"]), round(sum(true_waits) / len(true_waits), 2))
    assert_equal("Historical fairness", int(historical["fairness_score"]), fairness_score(historical_counts))
    assert_equal("Historical coverage", int(historical["participation_coverage_percent"]), historical_coverage)
    assert_equal("Replay fairness", int(replay["fairness_score"]), fairness_score(replay_session_counts))
    assert_equal("Replay coverage", int(replay["participation_coverage_percent"]), replay_coverage)
    assert_equal("Replay selection gap", int(replay["selection_gap"]), max(replay_session_counts) - min(replay_session_counts))
    assert_equal("Round-robin fairness", int(baseline["fairness_score"]), fairness_score(base_counts))
    assert_equal("Round-robin selection gap", int(baseline["selection_gap"]), max(base_counts) - min(base_counts))

    print("Python validation passed")
    print(f"Historical Top-1 accuracy: {top1}/{len(selection_rows)} ({historical['top_1_accuracy_percent']}%)")
    print(f"Historical Top-3 accuracy: {top3}/{len(selection_rows)} ({historical['top_3_accuracy_percent']}%)")
    print(f"Historical fairness: {historical['fairness_score']}/100")
    print(f"Algorithm replay fairness: {replay['fairness_score']}/100")
    print(f"Round-robin fairness: {baseline['fairness_score']}/100")
    print(f"Formula errors: {formula_errors}")


if __name__ == "__main__":
    main()
