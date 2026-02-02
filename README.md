# Backend Pair Activity (Beginner-Friendly)

## Overview

In this paired activity, you will collaboratively implement an API server using the MVC pattern, starting from the pre-existing tours API. The API will include two routers: one for users and one for tours.


---

## How you will work (paired, not strict pair programming)

Read these first (you will reuse them in many labs):

- [guides/PAIR-ACTIVITY-GUIDE.md](guides/PAIR-ACTIVITY-GUIDE.md)
- [guides/POSTMAN-CHECKLIST.md](guides/POSTMAN-CHECKLIST.md)

Some students feel nervous about “strict” pair programming. That's totally ok. For this activity, you will work as **two problem-solvers**:

- You can both talk, think, and type.
- Your goal is to **try together first**, then reveal help only if you need it.
- Each iteration below has a hidden solution you can expand/collapse.

Example format you will see:

```html
<details>
<summary>Solution</summary>

...hidden help here...

</details>
```

### Help ladder (use in order)

When you get stuck:

1. Re-read the instruction and the code you’re changing.
2. Ask your partner to explain their approach.
3. Try a tiny experiment (change one thing, retest).
4. Open the solution for that iteration.
5. Ask the teacher.

### Recommended rhythm

- After each iteration, the app should still run.
- Commit after each iteration with a clear message.

### This is a 3-hour lab (suggested pacing)

- Step 0 (setup + first API test)
- Step 1 (MVC refactor for tours)
- Step 2 (status codes)
- Step 3 (users: build model from scratch + controllers + router)
- Step 4 (move to `/api/...`)
- Step 5 (Morgan logging)
- Step 6 + Step 7 (auth + sync)

If you're behind: keep going in order, but do the **minimum working version** for each micro-step before moving on.

### Required discussion checkpoints (helps nervous students)

After every micro-step below, pause for 60–90 seconds:

- Partner A explains: “What did we change and why?”
- Partner B points to the exact file and line area.
- Both predict what Postman should return **before** testing.

If you can’t explain it, don’t move on yet.

### Commit messages (best-practice, beginner-friendly)

Use small commits that describe *what* changed.

Recommended format (Conventional Commits style):

- `feat(models): add tour model getAll()`
  - *feat* Short for feature. Used when you add a new feature or new functionality to the codebase.
- `feat(controllers): add getAllTours handler`
- `feat(routes): add tour router`
- `refactor(controllers): return 201 for createTour`
  - *refactor* used when you change existing code without altering behavior. This improves structure, readability, or organization.
- `chore: add morgan logging`
  - *chore* used for maintenance tasks that don’t change application behavior. Examples: updating dependencies, adding logging, renaming files, config changes.

Rule of thumb:

- One commit = one “idea” that you could explain quickly.
- If a commit breaks the app, it’s too big.

### Note about the sample solutions

The solutions in this lab are written to be **readable and beginner-friendly**.

- They are not always the most “perfect” architecture.
- If you want to improve them later (great idea!), you can refactor toward stronger validation, cleaner structure, and more reusable middleware patterns.

Whole-step solutions (use only after you finish a step) live in: [steps/README.md](steps/README.md)

Important: this lab counts your **commit history**. If someone copy/pastes a whole-step solution, it won’t match the expected iteration commits.

---

## Instructions

### Step 0: Setup

**Goal:** Get a working local server + GitHub repo so you can iterate safely.

**Setup checklist (do these once):**

1) Decide how you’ll collaborate (shared keyboard or parallel build). Switch roles after each **major step**.

2) clone the starter repo, then remove its git history so you can start a fresh repo:

Git Bash / macOS / Linux:

```bash
git clone https://github.com/tx00-resources-en/week4-be-pp-starter-option-b week4-be-pp-option-b
cd week4-be-pp-option-b
rm -rf .git
```

Windows PowerShell:

```powershell
git clone https://github.com/tx00-resources-en/week4-be-pp-starter-option-b week4-be-pp-option-b
Set-Location week4-be-pp-option-b
Remove-Item -Recurse -Force .git
```


3) Install + run:

```bash
npm install
npm run dev
```

4) Do the Postman test below.

5) Create your new GitHub repo (example name: `week4-be-pp-option-b`) and add your partner as collaborator.

6) Initialize Git and push using: [guides/github-push-pull.md](guides/github-push-pull.md)


**Try it first:**

Before you refactor anything (Step 1), confirm you can run the project *as-is*.

- Start the server
- Make one request in Postman
- Only then start refactoring

**Postman test (do this now):**

- `GET http://localhost:4000/tours`
- Expect: `200` and `[]` (or a JSON array)

<details>
<summary>Full step solution (Step 0) — check after finishing</summary>

See: [steps/step-0-setup.md](steps/step-0-setup.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>

-----

### Step 1: Refactoring to MVC Pattern

**Goal:** Move the tours API into MVC folders (routes/controllers/models) without breaking endpoints.

**Try it first:**

1) Create folders: `routes`, `controllers`, `models`.
2) Move the existing logic:

- “data logic” → model (`tourModel.js`)
- “req/res logic” → controller (`tourControllers.js`)
- “endpoint mapping” → router (`tourRouter.js`)

3) Update `app.js` to use the router.
4) Run the server and retest all tours endpoints.

#### Guided micro-steps (do one at a time)

Do not try to “MVC refactor everything” in one go. Do this in tiny moves.

**Step 1A — Create folders + move files**

- Create: `models/`, `controllers/`, `routes/`
- Move/rename:
   - `tourLib.js` → `models/tourModel.js`
   - `tourHandlers.js` → `controllers/tourControllers.js`

**Discuss:** What is a “model” vs “controller” in your own words?

**Commit:** `refactor: move tours code into MVC folders`

<details>
<summary>Solution (Step 1A)</summary>

After moving files, your imports will break until you update the `require(...)` paths.

- In `controllers/tourControllers.js`, require the model like:

```js
const Tour = require('../models/tourModel');
```

</details>

**Step 1B — Model check: implement/verify `getAll()`**

- In `models/tourModel.js`, make sure `getAll()` returns the array.

**Discuss:** Why does `getAll()` live in the model?

**Quick test option:** temporarily run `node models/tourModel.js` if you added a small self-test.

**Commit:** `feat(models): add tourModel getAll()`

<details>
<summary>Solution (Step 1B)</summary>

Readable `getAll()`:

```js
const getAll = () => {
   return tourArray;
};
```

</details>

**Step 1C — Controller check: implement/verify `getAllTours(req,res)`**

- In `controllers/tourControllers.js`, implement `getAllTours` using `Tour.getAll()`.

**Discuss:** What is the controller’s job in one sentence?

**Commit:** `feat(controllers): add getAllTours`

<details>
<summary>Solution (Step 1C)</summary>

Readable controller:

```js
const getAllTours = (req, res) => {
   res.json(Tour.getAll());
};
```

</details>

**Step 1D — Router: wire `GET /tours` only**

- Create `routes/tourRouter.js`.
- Add only one route first: `GET /` → `getAllTours`.

**Discuss:** Why does the router use `router.get('/')` (not `/tours`)?

**Commit:** `feat(routes): add tourRouter GET /`

<details>
<summary>Solution (Step 1D)</summary>

Minimal readable router:

```js
const express = require('express');
const router = express.Router();

const { getAllTours } = require('../controllers/tourControllers');

router.get('/', getAllTours);

module.exports = router;
```

</details>

**Step 1E — app.js: mount the router and retest in Postman**

- In `app.js`, mount the router on `/tours`.

**Postman test:** `GET http://localhost:4000/tours`

**Discuss:** What does `app.use('/tours', tourRouter)` do?

**Commit:** `refactor(app): mount tourRouter on /tours`

<details>
<summary>Solution (Step 1E)</summary>

`app.js` should include something like:

```js
const tourRouter = require('./routes/tourRouter');
app.use('/tours', tourRouter);
```

</details>

**Step 1F — Add the remaining tours routes one by one**

For each endpoint below:

1) implement the controller function
2) add the router line
3) test in Postman
4) commit

Endpoints to add:

- `POST /tours`
- `GET /tours/:tourId`
- `PUT /tours/:tourId`
- `DELETE /tours/:tourId`

> For Step 1 tests, your base is `/tours`. After Step 4, the base becomes `/api/tours`.

**Step 1F.1 — `POST /tours` (createTour)**

**Try it first:**

- Controller: read `name, info, image, price` from `req.body`
- Call model `addOne(...)`
- Success → return created object
- Failure → return an error JSON

**Postman test:**

- `POST http://localhost:4000/tours`
- Body (raw JSON):

```json
{
   "name": "Paris in 7 Days Tour",
   "info": "Paris is synonymous...",
   "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
   "price": "1995"
}
```

**Commit:** `feat(controllers): add createTour`

<details>
<summary>Solution (Step 1F.1)</summary>

Controller (`controllers/tourControllers.js`):

```js
const createTour = (req, res) => {
   const { name, info, image, price } = req.body;

   const newTour = Tour.addOne(name, info, image, price);
   if (!newTour) {
      return res.status(500).json({ message: 'Fail to create tour' });
   }

   res.json(newTour);
};
```

Router (`routes/tourRouter.js`):

```js
router.post('/', createTour);
```

</details>

**Step 1F.2 — `GET /tours/:tourId` (getTourById)**

**Try it first:**

- Read `tourId` from `req.params`
- Call model `findById(tourId)`
- If not found → `404`

**Postman test:**

- Create a tour first (Step 1F.1)
- `GET http://localhost:4000/tours/1`

**Commit:** `feat(controllers): add getTourById`

<details>
<summary>Solution (Step 1F.2)</summary>

Controller:

```js
const getTourById = (req, res) => {
   const { tourId } = req.params;
   const tour = Tour.findById(tourId);

   if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
   }

   res.json(tour);
};
```

Router:

```js
router.get('/:tourId', getTourById);
```

</details>

**Step 1F.3 — `PUT /tours/:tourId` (updateTour)**

**Try it first:**

- Read `tourId`
- Use `req.body` as `updatedData`
- Call `updateOneById`
- Not found → `404`

**Postman test:**

- `PUT http://localhost:4000/tours/1`
- Body: `{ "price": "1499" }`

**Commit:** `feat(controllers): add updateTour`

<details>
<summary>Solution (Step 1F.3)</summary>

Controller:

```js
const updateTour = (req, res) => {
   const { tourId } = req.params;
   const updatedTour = Tour.updateOneById(tourId, req.body);

   if (!updatedTour) {
      return res.status(404).json({ message: 'Tour not found' });
   }

   res.json(updatedTour);
};
```

Router:

```js
router.put('/:tourId', updateTour);
```

</details>

**Step 1F.4 — `DELETE /tours/:tourId` (deleteTour)**

**Try it first:**

- Read `tourId`
- Call `deleteOneById`
- Not found → `404`

**Postman test:**

- `DELETE http://localhost:4000/tours/1`
- Then `GET http://localhost:4000/tours/1` should return `404`

**Commit:** `feat(controllers): add deleteTour`

<details>
<summary>Solution (Step 1F.4)</summary>

Controller:

```js
const deleteTour = (req, res) => {
   const { tourId } = req.params;
   const isDeleted = Tour.deleteOneById(tourId);

   if (!isDeleted) {
      return res.status(404).json({ message: 'Tour not found' });
   }

   res.json({ message: 'Deleted successfully' });
};
```

Router:

```js
router.delete('/:tourId', deleteTour);
```

</details>

Suggested commit messages:

- `feat(controllers): add createTour`
- `feat(routes): add POST / (tours)`
- `feat(controllers): add getTourById`
- `feat(routes): add GET /:tourId (tours)`

<details>
<summary>Solution (Step 1F)</summary>

Tip for beginners: don’t invent new logic. Copy the *pattern* of `getAllTours`:

- controller calls model
- controller handles not-found
- router maps method + path → controller

</details>

<details>
<summary>Full step solution (Step 1) — check after finishing</summary>

See: [steps/step-1-tours-mvc.md](steps/step-1-tours-mvc.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>

-----

### Step 2: Update Status Codes

**Goal:** Make your API more REST-like using better status codes.

**Try it first:**

1) Find `createTour()` and `deleteTour()` in `controllers/tourControllers.js`.
2) Change:

- Create success → `201`
- Delete success → `204` (and no body)

3) Retest `POST` and `DELETE` with Postman.

#### Guided micro-steps (do one response at a time)

**Step 2A — Create: return 201**

- Edit only the success response in `createTour()`.

**Postman test:** `POST /tours` (or `/api/tours` if you already did Step 4)

**Commit:** `refactor(controllers): return 201 for createTour`

<details>
<summary>Solution (Step 2A)</summary>

```js
return res.status(201).json(newTour);
```

</details>

**Step 2B — Delete: return 204**

- Edit only the success response in `deleteTour()`.

**Postman test:** `DELETE /tours/1`

**Commit:** `refactor(controllers): return 204 for deleteTour`

<details>
<summary>Solution (Step 2B)</summary>

```js
return res.status(204).send();
```

</details>

<details>
<summary>Full step solution (Step 2) — check after finishing</summary>

See: [steps/step-2-status-codes.md](steps/step-2-status-codes.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>

-----

### Step 3: Implement User Model, Controller, and Router

**Goal:** Add a second resource (`users`) using the same MVC pattern.

**Try it first (important):** Build the user model **from scratch**, one function at a time.

You may look at the tours files for the *pattern*, but do not copy-paste the whole file and rename.

#### Guided micro-steps (build users the beginner way)

**Step 3A — Create the user model file + data storage**

- Create `models/userModel.js`
- Add:
   - `let userArray = [];`
   - `let nextId = 1;`
- Export an empty object for now (or export `getAll` once it exists).

**Discuss:** What data should the model store, and why is it “in memory”?

**Commit:** `feat(models): create userModel scaffold`

<details>
<summary>Solution (Step 3A)</summary>

Start simple:

```js
let userArray = [];
let nextId = 1;

module.exports = {};
```

</details>

**Step 3B — Implement `getAll()` for users**

- Add `getAll()` that returns the array.

**Discuss:** Why should `getAll()` not know anything about Express?

**Commit:** `feat(models): add userModel getAll()`

<details>
<summary>Solution (Step 3B)</summary>

```js
const getAll = () => {
   return userArray;
};
```

</details>

**Step 3C — Implement `addOne(...)` for users (with required fields)**

- Implement `addOne(name, email, password, phone_number, gender, date_of_birth, membership_status)`
- Return `false` if a required field is missing.

**Discuss:** What should happen if the client forgets to send `email`?

**Commit:** `feat(models): add userModel addOne()`

<details>
<summary>Solution (Step 3C)</summary>

Readability-first validation (simple on purpose):

```js
const addOne = (
   name,
   email,
   password,
   phone_number,
   gender,
   date_of_birth,
   membership_status
) => {
   if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status) {
      return false;
   }

   const newUser = {
      id: nextId++,
      name,
      email,
      password,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
   };

   userArray.push(newUser);
   return newUser;
};
```

</details>

**Step 3D — Implement `findById(id)`**

- Convert `id` to a number.
- Return the user or `false`.

**Commit:** `feat(models): add userModel findById()`

<details>
<summary>Solution (Step 3D)</summary>

```js
const findById = (id) => {
   const user = userArray.find((u) => u.id === Number(id));
   return user || false;
};
```

</details>

**Step 3E — Implement `updateOneById(id, updatedData)`**

- If not found, return `false`.
- Only update fields that exist in `updatedData`.

**Commit:** `feat(models): add userModel updateOneById()`

<details>
<summary>Solution (Step 3E)</summary>

```js
const updateOneById = (id, updatedData) => {
   const user = findById(id);
   if (!user) return false;

   if (updatedData.name) user.name = updatedData.name;
   if (updatedData.email) user.email = updatedData.email;
   if (updatedData.password) user.password = updatedData.password;
   if (updatedData.phone_number) user.phone_number = updatedData.phone_number;
   if (updatedData.gender) user.gender = updatedData.gender;
   if (updatedData.date_of_birth) user.date_of_birth = updatedData.date_of_birth;
   if (updatedData.membership_status) user.membership_status = updatedData.membership_status;

   return user;
};
```

</details>

**Step 3F — Implement `deleteOneById(id)`**

- Return `true/false` depending on whether delete happened.

**Commit:** `feat(models): add userModel deleteOneById()`

<details>
<summary>Solution (Step 3F)</summary>

```js
const deleteOneById = (id) => {
   const existing = findById(id);
   if (!existing) return false;

   const initialLength = userArray.length;
   userArray = userArray.filter((u) => u.id !== Number(id));
   return userArray.length < initialLength;
};
```

</details>

**Step 3G — Export user model functions**

- Export: `getAll, addOne, findById, updateOneById, deleteOneById`.

**Commit:** `chore(models): export userModel functions`

<details>
<summary>Solution (Step 3G)</summary>

```js
module.exports = {
   getAll,
   addOne,
   findById,
   updateOneById,
   deleteOneById,
};
```

</details>

**Step 3H — Controllers: add `getAllUsers` first**

- Create `controllers/userControllers.js`.
- Implement `getAllUsers(req,res)` only.

**Commit:** `feat(controllers): add getAllUsers`

<details>
<summary>Solution (Step 3H)</summary>

```js
const User = require('../models/userModel');

const getAllUsers = (req, res) => {
   res.json(User.getAll());
};

module.exports = { getAllUsers };
```

</details>

**Step 3I — Router + app wiring: make `GET /users` work**

- Create `routes/userRouter.js`.
- Add `router.get('/', getAllUsers)`.
- In `app.js`, mount it on `/users`.

**Postman test:** `GET http://localhost:4000/users` → expect `200` and `[]`.

**Commit:** `feat(routes): add userRouter GET / and mount in app`

<details>
<summary>Solution (Step 3I)</summary>

Router (minimal):

```js
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userControllers');

router.get('/', getAllUsers);

module.exports = router;
```

</details>

**Step 3J — Add remaining user endpoints one by one (same loop as tours)**

Add in this order, and after each one:

1) implement controller function
2) add router line
3) test in Postman
4) commit

Order:

1. `POST /users`
2. `GET /users/:userId`
3. `PUT /users/:userId`
4. `DELETE /users/:userId`

**Postman body example (create user):**

```json
{
   "name": "Matti Seppänen",
   "email": "matti@example.com",
   "password": "M@45mtg$",
   "phone_number": "+358401234567",
   "gender": "Male",
   "date_of_birth": "2000-01-15",
   "membership_status": "Active"
}
```

**Hint (Step 3J plan): one endpoint at a time, always test**

**Step 3J.1 — `POST /users` (createUser)**

- Postman: `POST http://localhost:4000/users`
- Use the JSON body from above.

Suggested commit: `feat(controllers): add createUser`

<details>
<summary>Solution (Step 3J.1)</summary>

Controller idea:

```js
const createUser = (req, res) => {
   const {
      name,
      email,
      password,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
   } = req.body;

   const newUser = User.addOne(
      name,
      email,
      password,
      phone_number,
      gender,
      date_of_birth,
      membership_status
   );

   if (!newUser) {
      return res.status(500).json({ message: 'Fail to create user' });
   }

   res.json(newUser);
};
```

Router line:

```js
router.post('/', createUser);
```

</details>

**Step 3J.2 — `GET /users/:userId` (getUserById)**

- Postman: `GET http://localhost:4000/users/1`

Suggested commit: `feat(controllers): add getUserById`

<details>
<summary>Solution (Step 3J.2)</summary>

```js
const getUserById = (req, res) => {
   const { userId } = req.params;
   const user = User.findById(userId);

   if (!user) {
      return res.status(404).json({ message: 'User not found' });
   }

   res.json(user);
};
```

Router line:

```js
router.get('/:userId', getUserById);
```

</details>

**Step 3J.3 — `PUT /users/:userId` (updateUser)**

- Postman: `PUT http://localhost:4000/users/1`
- Body: `{ "membership_status": "Inactive" }`

Suggested commit: `feat(controllers): add updateUser`

<details>
<summary>Solution (Step 3J.3)</summary>

```js
const updateUser = (req, res) => {
   const { userId } = req.params;
   const updatedUser = User.updateOneById(userId, req.body);

   if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
   }

   res.json(updatedUser);
};
```

Router line:

```js
router.put('/:userId', updateUser);
```

</details>

**Step 3J.4 — `DELETE /users/:userId` (deleteUser)**

- Postman: `DELETE http://localhost:4000/users/1`
- Then: `GET http://localhost:4000/users/1` → `404`

Suggested commit: `feat(controllers): add deleteUser`

<details>
<summary>Solution (Step 3J.4)</summary>

```js
const deleteUser = (req, res) => {
   const { userId } = req.params;
   const isDeleted = User.deleteOneById(userId);

   if (!isDeleted) {
      return res.status(404).json({ message: 'User not found' });
   }

   res.json({ message: 'Deleted successfully' });
};
```

Router line:

```js
router.delete('/:userId', deleteUser);
```

</details>

Tip: keep user controller responses consistent with tour controllers (same 404 style).

<details>
<summary>Full step solution (Step 3) — check after finishing</summary>

See: [steps/step-3-users-mvc.md](steps/step-3-users-mvc.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>

-----

### Step 4: Modify Routes

**Goal:** Put both routers behind an `/api` prefix.

**Try it first:**

1) Change only `app.js`.
2) Move from:

- `/tours` → `/api/tours`
- `/users` → `/api/users`

3) Retest all endpoints with the new base paths.

#### Guided micro-steps

**Step 4A — Update tours base path only**

- In `app.js`, change tours mounting from `/tours` → `/api/tours`.

**Discuss:** Why is `/api` a useful prefix?

**Postman tests:**

- `GET http://localhost:4000/api/tours` → should work
- `GET http://localhost:4000/tours` → should fail (expected)

**Commit:** `refactor(app): mount tourRouter under /api/tours`

<details>
<summary>Solution (Step 4A)</summary>

```js
app.use('/api/tours', tourRouter);
```

</details>

**Step 4B — Update users base path**

- In `app.js`, change users mounting from `/users` → `/api/users`.

**Postman tests:**

- `GET http://localhost:4000/api/users` → should work
- `GET http://localhost:4000/users` → should fail (expected)

**Commit:** `refactor(app): mount userRouter under /api/users`

<details>
<summary>Solution (Step 4B)</summary>

```js
app.use('/api/users', userRouter);
```

</details>

**Step 4C — Update your Postman collection/environment**

- Update saved requests so every URL uses `/api/...`.

**Commit:** `chore: update Postman requests to /api base`

<details>
<summary>Full step solution (Step 4) — check after finishing</summary>

See: [steps/step-4-api-prefix.md](steps/step-4-api-prefix.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>

-----

### Step 5: Implement Third-Party Middleware

**Goal:** Add request logging using Morgan.

**Try it first:**

1) Install Morgan.
2) Require it in `app.js`.
3) Add `app.use(morgan('tiny'))` near the top (after `express.json()` is fine).
4) Make any request and observe logs in the terminal.

#### Guided micro-steps

**Step 5A — Install Morgan**

- Run: `npm install morgan`

**Discuss:** What is middleware, in one sentence?

**Commit:** `chore: install morgan`

<details>
<summary>Solution (Step 5A)</summary>

If install fails, run `npm install` again and check your internet connection.

</details>

**Step 5B — Add Morgan to app.js**

- Require Morgan.
- Add `app.use(morgan('tiny'))`.

**Postman test:** `GET http://localhost:4000/api/tours` and watch the terminal.

**Commit:** `chore(app): add request logging with morgan`

<details>
<summary>Solution (Step 5B)</summary>

Place this near the top of `app.js` (after you create the app):

```js
const morgan = require('morgan');
app.use(morgan('tiny'));
```

</details>

<details>
<summary>Full step solution (Step 5) — check after finishing</summary>

See: [steps/step-5-morgan.md](steps/step-5-morgan.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>

-----

### Step 6: Implement Custom Middleware for Authentication

**Goal:** Create your own middleware and protect routes.

**Try it first:**

1) Create folder `middleware` and file `middleware/auth.js`.
2) Implement a simple admin check using a query string like `?admin=true`.
3) In both routers, allow public GET routes, then protect the rest.

#### Guided micro-steps (protect one router first)

**Step 6A — Create the middleware file**

- Create: `middleware/auth.js`

**Discuss:** What are `req`, `res`, and `next`?

**Commit:** `feat(middleware): add auth middleware scaffold`

<details>
<summary>Solution (Step 6A)</summary>

Start with a simple structure:

```js
module.exports = (req, res, next) => {
   next();
};
```

</details>

**Step 6B — Implement the “admin=true” check**

- If `?admin=true` allow
- Otherwise return `403`

**Postman tests:**

- `GET /api/tours` should still be public
- Later: `POST /api/tours` should be blocked unless `?admin=true`

**Commit:** `feat(middleware): block non-admin requests`

<details>
<summary>Solution (Step 6B)</summary>

```js
module.exports = (req, res, next) => {
   const isAdmin = req.query.admin === 'true';

   if (!isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
   }

   next();
};
```

</details>

**Step 6C — Protect tours router (keep GET routes public)**

- In `routes/tourRouter.js`, keep `GET` routes first.
- Then add `router.use(auth)`.
- Then put `POST/PUT/DELETE` after it.

**Postman tests:**

- Works: `GET http://localhost:4000/api/tours`
- Fails: `POST http://localhost:4000/api/tours`
- Works: `POST http://localhost:4000/api/tours?admin=true`

**Commit:** `feat(routes): protect tours routes with auth middleware`

<details>
<summary>Solution (Step 6C)</summary>

```js
const auth = require('../middleware/auth');

router.get('/', getAllTours);
router.get('/:tourId', getTourById);

router.use(auth);

router.post('/', createTour);
router.put('/:tourId', updateTour);
router.delete('/:tourId', deleteTour);
```

</details>

**Step 6D — Protect users router (same pattern)**

- Keep `GET /api/users` public (and optionally `GET /api/users/:id` if you built it).
- Protect create/update/delete.

**Commit:** `feat(routes): protect users routes with auth middleware`

<details>
<summary>Solution (Step 6D)</summary>

Use the exact same router structure as tours: public GET routes first, then `router.use(auth)`, then protected routes.

</details>

<details>
<summary>Full step solution (Step 6) — check after finishing</summary>

See: [steps/step-6-auth-middleware.md](steps/step-6-auth-middleware.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>

-----

### Step 7: Sync with GitHub

**Goal:** Make sure both partners can pull and run the same code.

**Try it first:**

1) Both partners `git pull`.
2) If there is a conflict, stop and solve it together.
3) Both partners run `npm install` + `npm run dev` and test one endpoint.

#### Guided micro-steps (reduce merge-conflict fear)

**Step 7A — One person pushes, the other pulls**

- Partner A: `git push`
- Partner B: `git pull`

**Discuss:** What does “remote” mean? What does “pull” do?

**Step 7B — If you hit a conflict, slow down**

- Don’t guess.
- Read the conflict markers together.
- Decide *one file at a time*.

**Step 7C — Verify together**

- Both run the server.
- Both test:
   - `GET http://localhost:4000/api/tours`
   - `GET http://localhost:4000/api/users`

- Ensure that both members have synchronized their code with GitHub.

<details>
<summary>Full step solution (Step 7) — check after finishing</summary>

See: [steps/step-7-github-sync.md](steps/step-7-github-sync.md)

Reminder: commits are graded. If you copy/paste a full step, it won’t count as iteration work.

</details>


---

## Links

- [Pair Activity Guide](guides/PAIR-ACTIVITY-GUIDE.md)
- [Postman Checklist](guides/POSTMAN-CHECKLIST.md)
- [GitHub Push/Pull Workflow](guides/github-push-pull.md)
- [Full Step Solutions (after you finish)](steps/README.md)
- [How To Use And Write Express Middleware](https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/)
- [Every Important HTTP Status Code Explained](https://blog.webdevsimplified.com/2022-12/http-status-codes/)
- [Original Lab Handout](temp/ORIGINAL-LAB-HANDOUT.md)