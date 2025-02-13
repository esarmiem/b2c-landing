import {ApiResponse, StorageData} from "@/TravelCore/Utils/interfaces/context.ts";
import {ResponseData, dataOrder} from "@/TravelCore/Utils/interfaces/Order.ts";

const STORAGE_CONFIG = {
    VERSION: '1.0.0',
    MAX_SIZE: 5 * 1024 * 1024, // 5MB límite
} as const

/* Use an IIFE to export the persisted state in a variable */
export const getPersisted = (StorageKey: string): ApiResponse | ResponseData | dataOrder | null => {
    try {
        const rawState = window.localStorage.getItem(StorageKey)
        if (rawState === null || (rawState && rawState.toString() === "{}")) return null
        // Parsear y validar estructura
        const parsed = JSON.parse(rawState) as StorageData<ApiResponse>
        // Validar versión y estructura
        if (StorageKey === 'tk-order' && !parsed.data) {
            window.localStorage.removeItem(StorageKey)
            return null
        }
        return parsed.data
    } catch (err) {
        console.error(`Error reading from storage (${StorageKey}):`, err)
        window.localStorage.removeItem(StorageKey)
        return null
    }
}

export const savePersistense = (state: ApiResponse | ResponseData | dataOrder, StorageKey: string): void => {
    let rawState: string

    try {
        if (state === null) {
            window.localStorage.removeItem(StorageKey)
            return
        }

        const storageData: StorageData<ApiResponse | ResponseData | dataOrder> = {
            data: structuredClone(state),
            timestamp: Date.now(),
            version: STORAGE_CONFIG.VERSION
        }

        rawState = JSON.stringify(storageData)
        window.localStorage.setItem(StorageKey, rawState)
    } catch (err) {
        console.error(`Error saving to storage (${StorageKey}):`, err)
        if (err instanceof Error && err.name === 'QuotaExceededError') {
            window.localStorage.removeItem(StorageKey)
            try {
                window.localStorage.setItem(StorageKey, rawState!)
            } catch (retryErr) {
                console.error('Failed to save even after cleanup:', retryErr)
            }
        }
    }
}