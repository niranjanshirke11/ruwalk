# Ruwalk - Project Status Report

**Date:** January 25, 2026

## 1. 🏗️ High-Level Architecture

**Ruwalk** is a "Fit-to-Play" territory capture game. It parses real-world GPS activities (runs/walks) to award players virtual territory ownership on a hexagonal grid.

- **Type:** Full-Stack Web Application (PWA-ready).
- **Core Loop:** Run IRL → Sync with Strava → Algorithm calculates Path → User captures "Hexagons" on the map.
- **Grid System:** Uber's H3 Spatial Index (Resolution 10).

---

## 2. 🧩 Feature Set (Current State)

### ✅ Core Gameplay

- **Strava Integration:** OAuth2 login flow allows users to connect their Strava accounts securely.
- **Activity Sync:** Fetches the latest run from Strava API.
- **Territory Capture Engine:**
  - Decodes activity GPS polylines.
  - Converts path coordinates into unique H3 Hexagon IDs.
  - **Logic:** Captures every tile the user passed through.
  - **Precision:** **Resolution 10** (approx. 66m edge length / street-level precision).
- **Closed Loop Detection:** (Experimental) Detects if a run started and ended at the same spot (<200m). _Note: Currently used for metadata, but capture logic applies to path._

### 📊 Competitive Features

- **Global Leaderboard:** Ranks users by:
  1.  **Tiles Owned** (Primary metric).
  2.  **Distance Covered** (Secondary tie-breaker).
- **Tile Stealing:** If User A runs over a tile owned by User B, ownership transfers to User A.
- **History Tracking:** The system records a log (`TileHistory`) of who took what tile from whom, enabling future "Battle Reports".

### 🗺️ Visualization

- **Interactive Map:** Built with **MapLibre GL JS**.
- **Renders:**
  - **Current Territory:** Highlights all tiles currently owned by the user.
  - **History:** Can visualize past captures.
  - **Routes:** Displays the actual run path (polyline) overlay.

---

## 3. 🛠️ Tech Stack & Infrastructure

### Backend (`/backend`)

- **Runtime:** Node.js (ES Modules).
- **Framework:** Express.js v5.
- **Database ORM:** Prisma v7 (PostgreSQL Adapter).
- **Database:** PostgreSQL (Relationally modeled).
- **Key Libraries:**
  - `h3-js`: Spatial indexing.
  - `@turf/turf`: Geospatial calculations (distance, point-in-polygon).
  - `@mapbox/polyline`: Google/Strava polyline decoding.
  - `axios`: HTTP requests.

### Frontend (`/frontend`)

- **Framework:** React v19.
- **Build Tool:** Vite.
- **Styling:** Tailwind CSS v4.
- **Map Engine:** MapLibre GL.
- **State Management:** React `useState`/`useEffect` (Local state).

---

## 4. 🗄️ Database Schema Snapshot

### `User`

- Stores Strava Profile (Name, Avatar, Strava ID).
- Linked to Activities and Tile Ownership.

### `Activity`

- Stores raw run data (Distance, Moving Time, Polyline).
- Tracks if the run was "Captured" (processed for tiles).

### `TileOwnership`

- **The Core Table.** Maps `tileId` (H3 String) -> `userId`.
- Unique constraint on `tileId` ensures one owner per tile.

### `TileHistory`

- Audit log. Stores `previousUser` -> `newUser` transitions.
- Allows replaying the "history of the war" for a specific street.

---

## 5. 🎯 Current Project Status: **Stable MVP**

The project successfully demonstrates the "Walking = Conquer" loop. The recent upgrade to **Resolution 10** provides a high-fidelity experience where runs feel meaningful and accurate. All critical bugs (BigInt crashes, ID mappings, DB constraints) have been resolved.

### Next Recommended Milestones:

1.  **Gamification:** Add "XP" or "Levels" based on tiles held.
2.  **Social:** Notify users when their tiles are stolen.
3.  **Optimization:** Implement clustering or vector tiles for rendering 10k+ hexes.
