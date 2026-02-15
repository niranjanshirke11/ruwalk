# 🐛 Ruwalk: Bug & Error Log
> **A history of technical challenges encountered and resolved during development.**

This document tracks the critical errors, bugs, and edge cases we encountered while building Ruwalk, from initial setup to the current Stable MVP.

---

## 🛠️ Phase 1: Database & Persistence Layers

### 1. The "BigInt" Serialization Crash
*   **Severity:** 🔴 Critical (App Crash)
*   **The Error:** `TypeError: Do not know how to serialize a BigInt`
*   **Context:**
    *   Strava Activity IDs and Athlete IDs are massive 64-bit integers (e.g., `123456789012`).
    *   We correctly used the `BigInt` type in our PostgreSQL schema (`via Prisma`).
    *   However, when sending this data to the Frontend via `res.json()`, Node.js's standard `JSON.stringify()` failed because it does not support BigInt values by default.
*   **The Solution:**
    *   We Monkey-patched the `BigInt` prototype in `backend/index.mjs` to automatically convert BigInts to strings during JSON serialization.
    ```javascript
    // backend/index.mjs
    BigInt.prototype.toJSON = function () {
      return this.toString(); // "123456789" instead of 123456789n
    };
    ```

### 2. Unique Constraint Violations (The "Double Sync" Bug)
*   **Severity:** 🟠 High (API Failure)
*   **The Error:** `PrismaClientKnownRequestError: Unique constraint failed on the fields: (`stravaId`)`
*   **Context:**
    *   When a user hit "Sync Latest Activity" multiple times, or if the webhook fired while the user was manually syncing, the server tried to insert the same Activity ID twice.
*   **The Solution:**
    *   Refactored our database calls from `.create()` to `.upsert()` (Update or Insert).
    *   Now, if the activity exists, we simply update its details (idempotent), preventing the crash.

### 3. Leaderboard 500 Error (Missing Field Selection)
*   **Severity:** 🟠 High (Feature Break)
*   **The Error:** `500 Internal Server Error` on `/leaderboard`
*   **Context:**
    *   We optimized the Leaderboard query to `select` only necessary fields.
    *   However, we forgot to select `stravaAthleteId`, which the logic depended on for mapping.
*   **The Solution:**
    *   Explicitly added the field to the Prisma selection set.
    *   *Reference:* Marked in code with `// 👈 CRITICAL: missing this was causing 500 error`.

---

## 🗺️ Phase 2: Geospatial & Game Logic

### 4. The "Null Island" Crash (Indoor Runs)
*   **Severity:** 🟡 Medium (Logic Error)
*   **The Error:** `Cannot read properties of null (reading '0')` when accessing lat/lng.
*   **Context:**
    *   Users syncing "Treadmill" or "Weight Training" activities from Strava.
    *   These activities have no GPS data, so `start_latlng` is `null`.
    *   Our distance calculator tried to read these nulls, causing the sync to fail.
*   **The Solution:**
    *   Added explicit guard clauses in `syncStravaActivity`.
    *   If `start_latlng` is missing, we immediately return early or flag the activity as "Not Capture Eligible" instead of crashing.

### 5. H3 Index Mismatch (Grid Resolution)
*   **Severity:** 🟢 Low (UX Issue)
*   **The Issue:**
    *   Initially, we used **Resolution 9**. Tiles were too large (~174m edge), making it too easy to capture huge areas without much effort.
    *   Later tested **Resolution 11**, which was too small (~25m), making the map look cluttered and "noisy".
*   **The Solution:**
    *   Standardized on **Resolution 10** (~66m edge). This was the "Goldilocks" zone—requiring actual physical movement to cross a tile, but large enough to cover a street meaningfuly.

---

## 🌐 Phase 3: Infrastructure & Connectivity

### 6. CORS Policy Blocks
*   **Severity:** 🟡 Medium (Connectivity)
*   **The Error:** `Access to fetch has been blocked by CORS policy`
*   **Context:**
    *   Runing Vite Frontend on port `5173` and Express Backend on port `4000`.
    *   Browsers block cross-port requests by default for security.
*   **The Solution:**
    *   Installed and configured the `cors` middleware in Express to allow requests from our frontend origin.

### 7. "ReferenceError: require is not defined" (ES Modules)
*   **Severity:** 🟡 Medium (Setup)
*   **Context:**
    *   We wanted to use modern `import` / `export` syntax in Node.js.
    *   However, Prisma and some older libraries default to CommonJS (`require`).
*   **The Solution:**
    *   Renamed backend files to `.mjs` (Modular JS).
    *   Added `"type": "module"` to `package.json`.
    *   Used `import pkg from '@prisma/client'` destructuring pattern to make Prisma work with ESM.
