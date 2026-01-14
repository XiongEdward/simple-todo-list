import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../types';
import { validateTimeRange } from '../utils/timeUtils';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const saved = localStorage.getItem('todos');
            const savedDate = localStorage.getItem('todoDate');
            const today = new Date().toDateString();

            if (saved && savedDate === today) {
                return JSON.parse(saved);
            }
            // If date is different or no data, clear storage for new day
            localStorage.setItem('todoDate', today);
            return [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('todoDate', new Date().toDateString());
    }, [todos]);

    const addTodo = useCallback((text: string, startTime: string, endTime: string, color?: string) => {
        if (!validateTimeRange(startTime, endTime)) {
            throw new Error('End time must be after start time');
        }

        const newTodo: Todo = {
            id: uuidv4(),
            text,
            startTime,
            endTime,
            completed: false,
            color: color || '#646cff' // Default primary color
        };

        setTodos(prev => [...prev, newTodo]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
    };
};
