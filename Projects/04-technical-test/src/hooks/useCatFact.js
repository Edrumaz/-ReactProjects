import { useState, useEffect } from "react"
import { fetchCatFact } from "../services/facts"

/**
 * Custom hook that provides a random cat fact.
 * 
 * This hook fetches a random cat fact from an API and stores it in state. 
 * It also provides a function to fetch a new fact on demand.
 * 
 * @returns {Object} Contains the current cat fact and a function to fetch a new fact.
 */
export function useCatFact() {
    // State to store the cat fact fetched from the API
    const [fact, setFact] = useState()

    /**
     * Gets a random cat fact from the API and updates the state.
     */
    const getRandomFact = () => {
        fetchCatFact().then(setFact)
    }

    /**
     * useEffect hook that fetches a random cat fact when the component mounts.
     */
    useEffect(getRandomFact, [])

    // Return the current fact and the function to fetch a new one
    return { fact, getRandomFact }
}
