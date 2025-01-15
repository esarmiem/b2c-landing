/* Define a type for the persisted state */
type AnyState = Record<string, any> | null;

/* Use an IIFE to export the persisted state in a variable */
export const getPersisted = (StorageKey: string): AnyState => {
    try {
        const rawState = window.localStorage.getItem(StorageKey);
        if (rawState === null || (rawState && rawState.toString() === "{}")) return null;
        const state: AnyState = JSON.parse(rawState);
        return state;
    } catch (err) {
        return null;
    }
}

/* Export a method to save state on each store update */
export const savePersistense = (state: AnyState, StorageKey: string): void => {
    try {
        if (state === null) {
            window.localStorage.removeItem(StorageKey); // Clear storage if state is null
        } else {
            const stateFilter = JSON.parse(JSON.stringify(state)); // Deep clone
            const rawState = JSON.stringify(stateFilter);
            window.localStorage.setItem(StorageKey, rawState);
        }
    } catch (err) {
        // Ignore write errors.
    }
}