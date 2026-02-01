# Step 3 — Users MVC (Full Step Solution)

Use this after you finish Step 3.

Assessment note: commits are graded. Don’t copy/paste the whole step.

## Complete code snapshot (full files)

See the full end-of-step code here: [snapshots/step-3/](snapshots/step-3/)

## What “done” looks like

- You built `models/userModel.js` from scratch (in-memory array + CRUD functions).
- You created `controllers/userControllers.js`.
- You created `routes/userRouter.js`.
- You mounted the users router in `app.js`.
- Users endpoints work under the Step 3 base path (before Step 4): `/users`.

## Key idea

Build and verify in this order:

1) Model functions (one at a time)
2) `GET /users` first
3) Then `POST`, then `GET by id`, then `PUT`, then `DELETE`

Reminder: This lab stores plaintext passwords only because it’s a beginner exercise. In real apps you would hash passwords.
