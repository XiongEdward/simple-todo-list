import { useEffect } from 'react';

const themes = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Sky', color: '#0ea5e9' },
];

export const ThemeSwitcher = () => {
    const setTheme = (color: string) => {
        document.documentElement.style.setProperty('--primary-color', color);
        localStorage.setItem('theme', color);
    };

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            setTheme(saved);
        }
    }, []);

    return (
        <div style={{ display: 'flex', gap: '8px', padding: '1rem' }}>
            {themes.map((theme) => (
                <button
                    key={theme.name}
                    onClick={() => setTheme(theme.color)}
                    title={theme.name}
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: theme.color,
                        border: '2px solid var(--bg-color)',
                        boxShadow: '0 0 0 1px var(--border-color)',
                        cursor: 'pointer'
                    }}
                />
            ))}
        </div>
    );
};
