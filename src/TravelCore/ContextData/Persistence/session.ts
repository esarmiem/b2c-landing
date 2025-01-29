const SESSION_KEYS: string[] = ['token', 'role', 'user_id'];

/* Use an IIFE to export the persisted state in a variable */
export const getPersistedSession: Record<string, string> = (() => {
    try {
        const state: Record<string, string> = {};
        SESSION_KEYS.forEach((key) => {
            state[key] = window.sessionStorage.getItem(key) || '';
        });
        return state;
    } catch (err) {
        return {};
    }
})();

/* Export a method to save state on each store update */
export const saveSession = (state: Record<string, string >): void => {
    try {
        if (Object.keys(state).length <= 0) {
            SESSION_KEYS.forEach((key) => {
                window.sessionStorage.removeItem(key);
            });
            return;
        }
        SESSION_KEYS.forEach((key) => {
            const value = state[key];
            if (value !== null) {
                window.sessionStorage.setItem(key, value);
            }
        });
    } catch (err) {
        // Ignore write errors.
    }
};
