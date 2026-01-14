import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodos } from '../hooks/useTodos';
import { getCurrentTime } from '../utils/timeUtils';
import styles from './TodoList.module.css';

export const TodoList = ({ todos, addTodo, toggleTodo, deleteTodo }: ReturnType<typeof useTodos>) => {
    const [text, setText] = useState('');
    const [startTime, setStartTime] = useState(getCurrentTime());
    const [endTime, setEndTime] = useState(getCurrentTime());

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            try {
                addTodo(text, startTime, endTime);
                setText('');
                // Keep times as is or reset? Resetting implies next task likely follows
            } catch (err: any) {
                alert(err.message);
            }
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>My Day</h1>
                <p>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </header>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a new task..."
                        className={styles.textInput}
                        required
                    />
                </div>
                <div className={styles.timeGroup}>
                    <div className={styles.timeInputWrapper}>
                        <label>Start</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.timeInputWrapper}>
                        <label>End</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className={styles.addButton}>
                    Add Task
                </button>
            </form>

            <div className={styles.list}>
                <AnimatePresence mode='popLayout'>
                    {[...todos].sort((a, b) => a.startTime.localeCompare(b.startTime)).map((todo) => (
                        <motion.div
                            key={todo.id}
                            id={`todo-${todo.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
                        >
                            <div className={styles.todoContent}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className={styles.checkbox}
                                />
                                <div className={styles.todoText}>
                                    <span className={styles.title}>{todo.text}</span>
                                    <span className={styles.time}>
                                        {todo.startTime} - {todo.endTime}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className={styles.deleteButton}
                                aria-label="Delete task"
                            >
                                ×
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
