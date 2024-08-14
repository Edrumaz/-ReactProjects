import { useEffect, useState } from "react"

/**
 * MouseFollower component adds a small circle that follows the mouse movement.
 * Feature can be turned off and on with a button click,
 * @returns {JSX.Element} A JSX element rendering the mouse follower and a toggle button.
 */
export const MouseFollower = () => {
    //State to track if the mouse follower has been enabled
    const [enabled, setEnabled] = useState(false)

    //State to track the position of the mouse on the screen
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        //Function to update the position state with the current mouse position
        const handleMove = (event) => {
            const { clientX, clientY } = event
            setPosition({ x: clientX, y: clientY})
        }

        // If enabled, add an event listener to track mosue movements.
        if(enabled) {
            window.addEventListener('pointermove', handleMove)
        }

        // Clean up the event listener when the components unmounts or 'enabled' changes.
        return () => {
            window.removeEventListener('pointermove', handleMove)
        }

    }, [enabled])

    return (
    <>
        <div style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #fff',
            borderRadius: '50%',
            opacity: 0.8,
            pointerEvents: 'none',
            left: -25,
            top: -25,
            width: 50,
            height: 50,
            transform: `translate(${position.x}px, ${position.y}px)`
        }}
        />
        <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} mouse follower
        </button>
    </>
    )
}