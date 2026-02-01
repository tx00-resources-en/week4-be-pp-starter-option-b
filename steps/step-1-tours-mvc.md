# Step 1 — Tours MVC Refactor (Full Step Solution)

Use this after you finish Step 1.

Assessment note: commits are graded. Don’t copy/paste the whole step.

## Complete code snapshot (full files)

See the full end-of-step code here: [snapshots/step-1/](snapshots/step-1/)

## What “done” looks like

- You created `models/`, `controllers/`, `routes/`.
- Tours logic is split into MVC layers.
- Your tours endpoints still work (same behavior as before the refactor).

## Target structure

```text
controllers/
  tourControllers.js
models/
  tourModel.js
routes/
  tourRouter.js
app.js
package.json
```

## Minimal router example

`routes/tourRouter.js`:

```js
const express = require('express');
const router = express.Router();

const {
   getAllTours,
   getTourById,
   createTour,
   updateTour,
   deleteTour,
} = require('../controllers/tourControllers');

router.get('/', getAllTours);
router.post('/', createTour);
router.get('/:tourId', getTourById);
router.put('/:tourId', updateTour);
router.delete('/:tourId', deleteTour);

module.exports = router;
```

## app.js mounting

In `app.js`, mount the router (still Step 1 base path):

```js
const tourRouter = require('./routes/tourRouter');
app.use('/tours', tourRouter);
```

## Postman checks

- `GET http://localhost:4000/tours`
- `POST http://localhost:4000/tours`
- `GET http://localhost:4000/tours/1`
- `PUT http://localhost:4000/tours/1`
- `DELETE http://localhost:4000/tours/1`
