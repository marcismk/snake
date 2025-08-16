# Classic snake

Take on classic snake game, where it build using React.Js and standard HTML elements (no canvas).

## Quick start

1. Install depencencies

```
npm i
```

2. Run local dev server

```
npm run dev
```

3. Open browser - http://localhost:5173/

4. Click `Start Game` button to start game.

## Runing tests

Tests are built using vitest and @testing-library/react.

1. Run command:

```
npm run test
```

## Tech stack

- React.Js
- Zustand (as state management solution)
- Vite
- Vitest

## Game implementation details and assumptions

- Game is built using standard HTML elements (no canvas or external JS gaming labraries).
- Game movement is handled via `setInterval` where it renders updated state after particular time has passed (possible to switch from slow, normal, fast).
- Snake tail updates automaticly when snake head position changes and it simply updates each next tail peace position to previous peace position.
- Assumption that snake could not go backwards, and can't go forwards if already going in that direction.
- Assumption #2 - game board is CSS grid based on size provided in `src/config.ts` file.
- Assumption #3 - initial snake and food locations are fixed, but will change when game starts
