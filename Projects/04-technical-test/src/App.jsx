import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

/**
 * App component that fetches a random cat fact and an image based on the first word of the fact.
 * The cat image is generated dynamically using the Cataas API.
 *
 * @component
 * @returns {JSX.Element} A React component that displays a random cat fact and an image.
 */
export function App () {    
    
    //Consume Custom Hook to obtain the image Url
    const { fact, getRandomFact } = useCatFact()
    const { image } = useCatImage({ fact }) 
    
    const handleClick = async () => {
        getRandomFact()
    }    

    return (
        <main>
            <h1>App de gatos</h1>
            {fact && <p>{fact}</p>}
            {image && <img src={image} alt={`Picture extracted using the first word`} />}
            <button onClick={handleClick}>Get another cat fact</button>
        </main>
    )
}
