# Step 2 — Status Codes (Full Step Solution)

Use this after you finish Step 2.

Assessment note: commits are graded. Don’t copy/paste the whole step.

## Complete code snapshot (full files)

See the full end-of-step code here: [snapshots/step-2/](snapshots/step-2/)

## What “done” looks like

- `POST` success returns `201 Created`.
- `DELETE` success returns `204 No Content` (no JSON body).

## Controllers (success cases)

Create success:

```js
return res.status(201).json(newTour);
```

Delete success:

```js
return res.status(204).send();
```

## Why

- `201` tells the client “a new resource was created”.
- `204` tells the client “it worked, but there is no response body”.
