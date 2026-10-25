# React To-Do List

A simple to-do list built with React and Vite. Used as a practice project for learning Git and GitHub.

## Run it locally

You need [Node.js](https://nodejs.org) (version 18 or newer).

```bash
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## Features

- Add, complete and delete tasks
- Filter by All, Active or Done
- Count of tasks left, and "Clear completed"
- Tasks are saved in your browser, so they survive a page refresh

## Project structure

```
react-todo/
├── index.html        # The page that loads the app
├── package.json      # Project info and dependencies
├── vite.config.js    # Build tool settings
└── src/
    ├── main.jsx      # Starts the React app
    ├── App.jsx       # The to-do list logic
    └── App.css       # Styling
```

## Practice ideas for the team

Each of these makes a good first branch and pull request:

1. Change the accent colour (`--accent`) at the top of `src/App.css`
2. Change the heading or the placeholder text in `src/App.jsx`
3. Add your name to a "Contributors" section in this README
