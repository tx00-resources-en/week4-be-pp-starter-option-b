# Step 6 — Auth Middleware (Full Step Solution)

Use this after you finish Step 6.

Assessment note: commits are graded. Don’t copy/paste the whole step.

## Complete code snapshot (full files)

See the full end-of-step code here: [snapshots/step-6/](snapshots/step-6/)

## What “done” looks like

- You created `middleware/auth.js`.
- You left GET routes public.
- You protected POST/PUT/DELETE routes using `router.use(auth)`.

## middleware/auth.js

```js
module.exports = (req, res, next) => {
   const isAdmin = req.query.admin === 'true';

   if (!isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
   }

   next();
};
```

## Router protection pattern

```js
router.get('/', getAllTours);
router.get('/:tourId', getTourById);

router.use(auth);

router.post('/', createTour);
router.put('/:tourId', updateTour);
router.delete('/:tourId', deleteTour);
```

## Tests

- Should fail: `POST /api/tours`
- Should pass: `POST /api/tours?admin=true`
