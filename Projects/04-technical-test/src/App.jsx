import { useState, useEffect } from "react"
import { CAT_PREFIX_URL, CAT_ENDPOINT_RANDOM_FACT, CAT_TEXT_STYLE } from "./assets/constants"
import './App.css'

/**
 * App component that fetches a random cat fact and an image based on the first word of the fact.
 * The cat image is generated dynamically using the Cataas API.
 *
 * @component
 * @returns {JSX.Element} A React component that displays a random cat fact and an image.
 */
export function App () {
    // State to store the cat fact fetched from the API
    const [fact, setFact] = useState()

    // State to store the generated cat image URL based on the first word of the fact
    const [image, setImage] = useState()

    /**
     * Fetches a random cat fact when the component is mounted.
     * The fact is then stored in the 'fact' state.
     */
    const fetchCatFact = () => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const { fact } = data
            setFact(fact)
        })
    }

    useEffect(() => {
        fetchCatFact()
    }, [])

    /**
     * When the 'fact' state changes, this effect is triggered to generate a cat image.
     * The first word of the fact is used to generate an image URL using the Cataas API.
     */
    useEffect(() => {
        if (!fact) return
        const firstWord = fact.split(' ')[0]

        fetch(`${CAT_PREFIX_URL}${firstWord}${CAT_TEXT_STYLE}`)
        .then(res => res.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob)
            setImage(imageUrl)
        })
    }, [fact])

    return (
        <main>
            <h1>App de gatos</h1>
            {fact && <p>{fact}</p>}
            {image && <img src={image} alt={`Picture extracted using the first word`} />}
            <button onClick={fetchCatFact}>Get another cat fact</button>
        </main>
    )
}
