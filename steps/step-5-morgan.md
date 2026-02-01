# Step 5 — Morgan Logging (Full Step Solution)

Use this after you finish Step 5.

Assessment note: commits are graded. Don’t copy/paste the whole step.

## Complete code snapshot (full files)

See the full end-of-step code here: [snapshots/step-5/](snapshots/step-5/)

## What “done” looks like

- `morgan` is installed.
- `app.js` logs requests when you hit endpoints.

## app.js snippet

```js
const morgan = require('morgan');
app.use(morgan('tiny'));
```

## If you see no logs

- Restart the server after installing.
- Make sure you’re hitting routes under `/api/...` (after Step 4).
