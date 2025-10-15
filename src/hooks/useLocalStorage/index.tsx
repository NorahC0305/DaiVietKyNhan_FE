'use client'

import { useEffect, useState } from "react"

/**
 * Custom hook to get a value in local storage.
 * @param key - The key of the local storage item to get
 * @returns 
 */
export const useGetLocalStorage = (key: string) => {
    const [value, setValue] = useState<string | null>(null)
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        const storedValue = localStorage.getItem(key)
        setValue(storedValue)
        setIsReady(true)
    }, [key]) // Add key as dependency

    return { value, isReady }
}
//-----------------------------End-----------------------------//


/**
 * Custom hook to set a value in local storage.
 * @param key - The key of the local storage item to set
 * @param value - The value to store
 */
export const useSetLocalStorage = (key: string, value: string) => {
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])
}
//-----------------------------End-----------------------------//


/**
 *  Custom hook to remove a value in local storage.
 * @param key - The key of the local storage item to set
 */
export const useRemoveLocalStorage = (key: string) => {
    useEffect(() => {
        localStorage.removeItem(key)
    }, [key])
}
//-----------------------------End-----------------------------//