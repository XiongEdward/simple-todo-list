

const themes = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Sky', color: '#0ea5e9' },
];

export interface ThemeSwitcherProps {
    currentTheme: string;
    onThemeChange: (color: string) => void;
}

export const ThemeSwitcher = ({ currentTheme, onThemeChange }: ThemeSwitcherProps) => {
    return (
        <div style={{ display: 'flex', gap: '8px', padding: '1rem' }}>
            {themes.map((theme) => (
                <button
                    key={theme.name}
                    onClick={() => onThemeChange(theme.color)}
                    title={theme.name}
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: theme.color,
                        border: `2px solid ${currentTheme === theme.color ? 'var(--text-color)' : 'var(--bg-color)'}`,
                        boxShadow: '0 0 0 1px var(--border-color)',
                        cursor: 'pointer',
                        transform: currentTheme === theme.color ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s ease'
                    }}
                />
            ))}
        </div>
    );
};
