import { useEffect } from 'react';

const useKeyboardShortcut = (shortcuts) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            shortcuts.forEach(shortcut => {
                if (event.altKey && event.key.toLowerCase() === shortcut.key) {
                    shortcut.action();
                }
            });
        };

        // Add event listener when component mounts
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [shortcuts]);
}

export default useKeyboardShortcut;
