import { CAT_ENDPOINT_RANDOM_FACT } from "../assets/constants"

/**
     * Fetches a random cat fact when the component is mounted.
     * The fact is then stored in the 'fact' state.
     */
export function fetchCatFact () {
    return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then(res => res.json())
    .then(data => {
        const { fact } = data
        return fact
    })
}