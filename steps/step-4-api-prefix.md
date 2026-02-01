# Step 4 — Move Routes Under /api (Full Step Solution)

Use this after you finish Step 4.

Assessment note: commits are graded. Don’t copy/paste the whole step.

## Complete code snapshot (full files)

See the full end-of-step code here: [snapshots/step-4/](snapshots/step-4/)

## What “done” looks like

Your routers are mounted under `/api` in `app.js`:

```js
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);
```

After this:

- Old routes like `GET /tours` should fail (expected).
- New routes like `GET /api/tours` should work.
