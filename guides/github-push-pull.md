# GitHub Push/Pull Workflow (Pair Activity)

This guide shows a beginner-friendly workflow for two partners sharing one GitHub repo.

Goal: both partners can **pull, run, test, and push** without panic.

## Setup once (Partner A)

1) Create a GitHub repo.
2) Add Partner B as a collaborator.
3) Get the starter code locally (clone starter, or use the provided folder).
4) Make your first commit and push:

```bash
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/<org-or-user>/<repo>.git
git push -u origin main
```

## Setup once (Partner B)

Clone the shared repo:

```bash
git clone https://github.com/<org-or-user>/<repo>.git
cd <repo>
npm install
npm run dev
```

## Day-to-day loop (every micro-step)

Do this sequence every time you start working:

1) Pull first:

```bash
git pull
```

2) Make a small change.
3) Test (Postman) to confirm it works.
4) Commit one idea:

```bash
git add .
git commit -m "feat(controllers): add getAllUsers"
```

5) Push:

```bash
git push
```

Tip: avoid both partners editing the same file at the same time.

## If you see a merge conflict

1) Stop and read the conflict markers together:

- `<<<<<<<` (your local version)
- `=======`
- `>>>>>>>` (the other version)

2) Decide what the final code should be, delete the markers, then:

```bash
git add .
git commit -m "chore: resolve merge conflict"
git push
```

If you’re stuck: ask the teacher *before* guessing.

## Commit message guidelines (quick)

- Use present tense: `add`, `fix`, `refactor`.
- Prefer small commits.
- Mention the layer when helpful: `models`, `controllers`, `routes`, `app`, `middleware`.

Examples:

- `refactor(app): mount routers under /api`
- `feat(models): add userModel findById()`
- `chore: install morgan`
