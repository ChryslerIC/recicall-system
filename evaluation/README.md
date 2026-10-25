# ReciCall Priority Queue Evaluation

This package provides a reproducible simulation for evaluating the ReciCall priority-selection algorithm.

## Purpose

The evaluation measures two separate outcomes:

1. **Selection accuracy:** whether the algorithm ranks the student identified by the teacher as needing the next turn.
2. **Selection fairness:** whether participation opportunities are distributed across the class instead of repeatedly selecting the same students.

The dataset is synthetic and is intended for development, demonstration, and thesis-method testing. It must not be presented as real beneficiary data.

## Input datasets

- `data/students.csv`: enrolled students and seat positions.
- `data/participation_events.csv`: historical participation and absence records.
- `data/teacher_labels.csv`: independent teacher-review labels for the preferred student per session.

The teacher-label file is the accuracy reference. The algorithm must not use that file when calculating its ranking.

## Run the evaluation

From the project root:

```powershell
npm.cmd run evaluate:algorithm
py scripts/validate-priority-evaluation.py
```

The first command loads the real implementation from `src/services/analyticsService.js` through Vite, so the simulation uses the same scoring and queue logic as the application. The second command independently recalculates the key metrics in Python and fails if the generated CSV results do not reconcile.

## Notebook workflow

Open `priority_queue_evaluation.ipynb` in Jupyter Notebook or VS Code after running the JavaScript simulation. The notebook reads the generated CSV files and displays tables for accuracy, fairness, waiting time, coverage, and formula validity. It uses pandas for table display; the command-line validator uses only Python's standard library.

From the project root, a local Jupyter launch is:

```powershell
py -m jupyter notebook evaluation/priority_queue_evaluation.ipynb
py -m jupyter notebook evaluation/large_scale_evaluation.ipynb
```

## Large-scale synthetic experiment

Run the reproducible multi-scenario simulation with:

```powershell
npm.cmd run evaluate:large-scale
```

The default run uses 5 repetitions for each combination of 5 scenarios, 5 class sizes, and 3 algorithms. It writes `results/large_scale_results.csv`.

The scenarios are `balanced`, `unequal`, `cold_start`, `attendance`, and `tie_heavy`. The algorithms are ReciCall's priority queue, round-robin selection, and random eligible selection. Class sizes are 30, 100, 300, 500, and 1,000 students, with five selection rounds per student.

Metrics include priority compliance, fairness, starvation prevention, eligibility compliance, participation coverage, distribution range, longest unselected wait, formula validity, consecutive-repeat rate, and successful selections. Use `--repetitions 100` for the thesis experiment after confirming the smaller run behaves correctly.

## Output files

- `results/summary.csv`: accuracy, waiting-time, fairness, coverage, and formula-validity results.
- `results/selection_results.csv`: one row per historical session, including the selected student, expected student, rank, and Top-1/Top-3 result.
- `results/replay_results.csv`: the algorithm's own 12-session replay selections.

## Metrics

### Accuracy

```text
Top-1 accuracy = correct first selections / total labeled sessions x 100
Top-3 accuracy = expected student appearing in top 3 / total labeled sessions x 100
```

### Waiting time

The evaluation records the selected student's true number of sessions since the last participation before selection. Lower and more balanced waiting time is preferred. It also preserves the algorithm's internal waiting value for comparison.

The current implementation appears to calculate its waiting value from a participation-event index rather than a session index. When a session has multiple event rows, this can overstate the waiting time. This is reported as `algorithm_wait_value` in `results/selection_results.csv` and should be fixed before using the waiting factor as an accuracy claim.

### Fairness

The evaluation follows the same Gini-based fairness calculation used by ReciCall:

```text
Fairness score = (1 - Gini coefficient) x 100
```

Higher values indicate a more balanced distribution of participation sessions.

### Coverage and selection gap

```text
Participation coverage = students with at least one turn / enrolled students x 100
Selection gap = highest participation count - lowest participation count
```

### Formula validity

For every candidate, the script verifies that the priority-breakdown factors reconstruct the raw priority score before the 0-100 cap. It also counts how often the score cap is applied. A capped score is not automatically an error, but it can create ties and should be reported.

## Replay comparison

The replay starts with the same roster and seat layout but no prior participation events. For each session, the algorithm selects one student and records a three-point participation event. The resulting fairness, coverage, and selection gap are compared with a round-robin baseline using the same number of sessions.

## Interpretation guidance

- Accuracy should be reported from real teacher-reviewed sessions when available. Synthetic labels only verify that the evaluation process works.
- Fairness should be reported for both cumulative history and a recent rolling window, because cumulative counts can hide a recent selection imbalance.
- A high fairness score does not prove that the algorithm selected the pedagogically correct student.
- A high accuracy score does not prove fair distribution. Both dimensions must be reported together.
- The score cap can cause multiple students to reach 100. Tie-break behavior should be documented in the results.

## Thesis-ready method statement

> The priority-selection algorithm was evaluated through historical replay and controlled simulation. At the beginning of each session, the algorithm received only the roster, seat arrangement, participation events, and absence records available before that session. Selection accuracy was measured using Top-1 and Top-3 agreement with an independent teacher-review label. Selection fairness was measured using the Gini-based fairness score, participation coverage, selection gap, and waiting-session distribution. The algorithm replay was compared with a round-robin baseline using the same class size and number of sessions.
