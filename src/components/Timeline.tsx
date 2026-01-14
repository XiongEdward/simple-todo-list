import type { Todo } from '../types';
import { timeToMinutes } from '../utils/timeUtils';
import styles from './Timeline.module.css';

interface TimelineProps {
    todos: Todo[];
}

export const Timeline = ({ todos }: TimelineProps) => {
    // Generate hour markers
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className={styles.container}>
            <div className={styles.timeline}>
                {hours.map(hour => (
                    <div key={hour} className={styles.hourMarker} style={{ top: `${(hour / 24) * 100}%` }}>
                        <span className={styles.hourLabel}>{hour.toString().padStart(2, '0')}:00</span>
                        <div className={styles.hourLine}></div>
                    </div>
                ))}

                {todos.map(todo => {
                    const startMins = timeToMinutes(todo.startTime);
                    const endMins = timeToMinutes(todo.endTime);
                    const totalMins = 24 * 60;

                    const top = (startMins / totalMins) * 100;
                    const height = ((endMins - startMins) / totalMins) * 100;

                    return (
                        <div
                            key={todo.id}
                            id={`time-block-${todo.id}`}
                            className={styles.timeBlock}
                            style={{
                                top: `${top}%`,
                                height: `${height}%`,
                                backgroundColor: todo.color || 'var(--primary-color)',
                                opacity: todo.completed ? 0.5 : 0.9
                            }}
                            title={`${todo.text} (${todo.startTime} - ${todo.endTime})`}
                        >
                            <span className={styles.blockTitle}>{todo.text}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
