import { useState } from "react";
import Switch from "./Switch";
import { FaSun, FaMoon, FaDice } from "react-icons/fa";

/**
 * Creates the button which randomizes the user (for user ID) by generating a random seed, and setting seed state to it
 * @param {boolean} isLight True if light-mode is one, and false if light-mode is off
 * @param {<Dispatch<setState<string>>>} setSeed the setState dispatch for the seed
 * @returns {JSX.Element} Randomize button
 */
function RandomizeUserBtn({ isLight, setSeed }) {
    function generateRandomSeed() {
        const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const index1 = Math.floor(Math.random() * alphabets.length); //generate 3 random indices
        const index2 = Math.floor(Math.random() * alphabets.length);
        const index3 = Math.floor(Math.random() * alphabets.length);
        return alphabets[index1] + alphabets[index2] + alphabets[index3]; //join characters at random indices to form a 3 letter random seed
    }

    function updateSeed() {
        setSeed(generateRandomSeed());
    }

    return <button title={"Randomize user"} aria-label="Randomize user"
        className={`${isLight ? "bg-zinc-800 text-zinc-300 hover:text-zinc-400" : "bg-zinc-300 text-zinc-800 hover:bg-zinc-400"} 
        rounded-full p-3 text-lg transition-all`} onClick={updateSeed}>
        <FaDice />
    </button>
}

/**
 * Creates the main container with the top nav (with theme and randomize user options)
 * @param {JSX.Element} children The main content (children of main container)
 * @param {<Dispatch<setState<string>>>} setSeed the setState dispatch for the seed, needed for the randomize user button
 * @returns {JSX.Element} Main container with the top nav, in which the user ID can be displayed
 */
export default function MainContainerWithNav({ children, setSeed }) {
    const [isLight, setIsLight] = useState(false);

    return <main className={`${isLight ? "bg-zinc-300" : "bg-zinc-800"} h-screen w-screen flex 
    justify-center items-center relative`}>
        <nav className="absolute top-0 left-0 right-0 w-full px-5 py-5 flex justify-between">
            <span className="flex flex-row items-center">
                <FaMoon className="mx-2 text-white" />
                <Switch isOn={isLight} toggle={() => setIsLight(prev => !prev)} />
                <FaSun className="mx-2 text-yellow-500" />
            </span>

            <span>
                <RandomizeUserBtn isLight={isLight} setSeed={setSeed} />
            </span>
        </nav>

        {children}
    </main>
}