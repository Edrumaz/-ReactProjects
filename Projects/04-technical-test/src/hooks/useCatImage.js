import { useEffect, useState} from "react"
import { CAT_PREFIX_URL, CAT_TEXT_STYLE } from "../assets/constants"

export function useCatImage ({fact}) {
    // State to store the generated cat image URL based on the first word of the fact
    const [image, setImage] = useState()

    /**
     * When the 'fact' state changes, this effect is triggered to generate a cat image.
     * The first word of the fact is used to generate an image URL using the Cataas API.
     */
    useEffect(() => {
        if (!fact) return

        const firstWord = fact.split(' ', 3).join(' ')

        fetch(`${CAT_PREFIX_URL}${firstWord}${CAT_TEXT_STYLE}`)
        .then(res => res.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob)
            setImage(imageUrl)
        })
    }, [fact])
    return { image }
}