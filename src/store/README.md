# Game store

Game store or `store.ts` is main part of the application. This contains all game state that is handled by Zustand state management.

It contains position of the snake ( head and tail segments), position of the food, score and current game status (if game is running or it's paused).

## Why Zustand?

Zustand provides easy way of fetching and updating state without complex code structure. You can make one or more stores as needed where you handle any and all state that should be access in more than one place in the app. It also provides advantage over using React Context that it does not have habit of re-rendering all components that use part of the context.
