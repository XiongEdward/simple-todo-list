import { useEffect, useRef } from 'react';
import type { Todo } from '../types';

interface ConnectorLayerProps {
    todos: Todo[];
}

export const ConnectorLayer = ({ todos }: ConnectorLayerProps) => {
    const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const updatePaths = () => {
            const container = document.getElementById('layout-container');
            if (!container) return;

            const cRect = container.getBoundingClientRect();

            todos.forEach(todo => {
                const pathEl = pathRefs.current.get(todo.id);
                if (!pathEl) return;

                const todoEl = document.getElementById(`todo-${todo.id}`);
                const timeEl = document.getElementById(`time-block-${todo.id}`);

                if (todoEl && timeEl) {
                    const r1 = todoEl.getBoundingClientRect();
                    const r2 = timeEl.getBoundingClientRect();

                    const x1 = r1.right - cRect.left;
                    const y1 = r1.top + r1.height / 2 - cRect.top;
                    const x2 = r2.left - cRect.left;
                    const y2 = r2.top + 20 - cRect.top;

                    // Bezier curve control points
                    const cp1x = x1 + (x2 - x1) / 2;
                    const cp1y = y1;
                    const cp2x = x2 - (x2 - x1) / 2;
                    const cp2y = y2;

                    const d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;

                    // Direct DOM update for performance
                    pathEl.setAttribute('d', d);
                    pathEl.style.opacity = '0.5';
                } else {
                    // Hide if elements not found (e.g. filtered out or not rendered yet)
                    pathEl.style.opacity = '0';
                }
            });

            frameRef.current = requestAnimationFrame(updatePaths);
        };

        updatePaths();

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [todos]);

    return (
        <svg
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            {todos.map(todo => (
                <path
                    key={todo.id}
                    ref={(el) => {
                        if (el) pathRefs.current.set(todo.id, el);
                        else pathRefs.current.delete(todo.id);
                    }}
                    stroke={todo.color || 'var(--primary-color)'}
                    strokeWidth="2"
                    fill="none"
                    opacity="0.5"
                    style={{ transition: 'stroke 0.3s, opacity 0.2s' }}
                />
            ))}
        </svg>
    );
};
