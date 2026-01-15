import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { TodoList } from './components/TodoList';
import { Timeline } from './components/Timeline';
import { ConnectorLayer } from './components/ConnectorLayer';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('theme') || '#6366f1';
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', themeColor);
    localStorage.setItem('theme', themeColor);
  }, [themeColor]);

  return (
    <>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 100 }}>
        <ThemeSwitcher currentTheme={themeColor} onThemeChange={setThemeColor} />
      </div>
      <Layout
        left={
          <TodoList
            todos={todos}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            themeColor={themeColor}
          />
        }
        right={
          <Timeline todos={todos} />
        }
        overlay={
          <ConnectorLayer todos={todos} />
        }
      />
    </>
  );
}

export default App;
