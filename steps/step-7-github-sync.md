# Step 7 — GitHub Sync (Full Step Solution)

Use this after you finish Step 7.

Assessment note: commits are graded. Don’t copy/paste the whole step.

## Complete code snapshot (full files)

The code at the end of Step 7 is the same as Step 6 (Step 7 is process/workflow). See the full end-of-lab code here: [snapshots/step-7/](snapshots/step-7/)

## What “done” looks like

- Both partners can `git pull` and run the same code.
- If a conflict happens, you resolve it calmly and test again.

## No-panic merge checklist

1) Pull:

```bash
git pull
```

2) If you get a conflict:

- Read the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
- Decide together what the final code should be.
- Delete the markers.

3) Finish:

```bash
git add .
git commit -m "Resolve merge conflict"
git push
```
