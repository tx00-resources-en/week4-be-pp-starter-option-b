# Pair Activity Guide (Not Strict Pair Programming)

This guide is meant to reduce stress and make progress predictable.

## Choose a collaboration style (both are valid)

### Option A: Shared keyboard (switch often)

- One person types for 10–15 minutes.
- The other person watches for bugs and asks questions.
- Switch at the end of every micro-step.

### Option B: Parallel build + compare (lowest pressure)

- Both implement the same micro-step individually for 8–12 minutes.
- Compare answers, pick the clearer version, merge.

## Micro-step loop (repeat for every tiny change)

1. **Discuss (60–90s)**
   - What are we changing?
   - Where (which file)?
   - What do we expect to happen when we test?
2. **Try it first**
   - Make the smallest change that could work.
3. **Test**
   - Use Postman / browser / console.
   - Confirm status code and body match your prediction.
4. **Commit**
   - One idea per commit.
   - If it breaks the app, it’s too big.

## How to use the `<details>` solutions

- Timebox your first attempt (5–10 minutes).
- If you’re stuck, open the solution for the *current* micro-step only.
- After reading, close it and re-explain the change in your own words.

## Help ladder (use in order)

1. Re-read the micro-step goal.
2. Partner explains their plan out loud.
3. Add one `console.log` to learn what’s happening.
4. Expand the `<details>` solution for that micro-step.
5. Ask the teacher.

## Commit message tips (beginner-friendly)

Use a simple, consistent style.

Good examples:

- `feat(models): add userModel addOne()`
- `feat(routes): add GET / (users)`
- `refactor(app): mount routers under /api`
- `chore: add morgan logging`

Rules:

- Use present tense: "add", "fix", "refactor".
- Mention the layer when helpful: `models`, `controllers`, `routes`, `app`.
- Keep it short and specific.

## Merge conflict calm checklist

When a conflict happens:

- Slow down.
- Identify which file is conflicted.
- Read the markers: `<<<<<<<`, `=======`, `>>>>>>>`.
- Decide together what the final code should be.
- Remove the markers.
- Run the server and test one endpoint.

Commands you’ll usually use:

- `git status`
- `git pull`
- `git add .`
- `git commit -m "Resolve merge conflict"`
- `git push`
