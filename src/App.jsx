import { useEffect, useState } from 'react';

const STORAGE_KEY = 'react-todo-items';

const FILTERS = {
  all: () => true,
  active: (todo) => !todo.done,
  done: (todo) => todo.done,
};

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  // Save to the browser whenever the list changes, so tasks survive a refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Storage unavailable (e.g. private mode) — app still works, just won't persist
    }
  }, [todos]);

  function addTodo(event) {
    event.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTodos([...todos, { id: Date.now(), title, done: false }]);
    setText('');
  }

  function toggleTodo(id) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearDone() {
    setTodos(todos.filter((todo) => !todo.done));
  }

  const visibleTodos = todos.filter(FILTERS[filter]);
  const remaining = todos.filter((todo) => !todo.done).length;
  const hasDone = todos.some((todo) => todo.done);

  return (
    <main className="app">
      <section className="card">
        <h1>To-do list</h1>

        <form className="add-form" onSubmit={addTodo}>
          <label htmlFor="new-todo" className="sr-only">New task</label>
          <input
            id="new-todo"
            type="text"
            placeholder="What needs doing?"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit" disabled={!text.trim()}>Add</button>
        </form>

        <div className="filters" role="group" aria-label="Filter tasks">
          {Object.keys(FILTERS).map((name) => (
            <button
              key={name}
              className={filter === name ? 'filter filter--active' : 'filter'}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name[0].toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>

        {visibleTodos.length === 0 ? (
          <p className="empty">
            {todos.length === 0 ? 'No tasks yet. Add your first one above.' : 'Nothing here for this filter.'}
          </p>
        ) : (
          <ul className="list">
            {visibleTodos.map((todo) => (
              <li key={todo.id} className={todo.done ? 'item item--done' : 'item'}>
                <label className="item-label">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
                <button
                  className="delete"
                  aria-label={`Delete "${todo.title}"`}
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer className="footer">
          <span>{remaining} {remaining === 1 ? 'task' : 'tasks'} left</span>
          {hasDone && (
            <button className="link" onClick={clearDone}>Clear completed</button>
          )}
        </footer>
      </section>
    </main>
  );
}
