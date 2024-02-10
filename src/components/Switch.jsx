/**
 * Creates a switch
 * @param {boolean} isOn Whether or not the switch is off. To be controlled by a state in the parent
 * @param {<Dispatch<setState<boolean>>>} The setState dispatch to toggle the switch on or off.
 * @returns {JSX.Element} The switch element
 */
export default function Switch({ isOn, toggle }) {
    return (
        <>
            <input
                checked={isOn}
                onChange={toggle}
                className="h-0 w-0 hidden"
                id={`react-switch-new`}
                type="checkbox"
                aria-label="toggle dark mode and light mode theme"
            />
            <label
                className={`flex flex-row justify-center items-center cursor-pointer h-[24px] 
                rounded-full relative transition-all w-[40px]
                ${isOn ? "bg-yellow-500" : "bg-gray-400"}`}
                htmlFor={`react-switch-new`}
            >
                <span className={`absolute top-[2px] w-[20px] h-[20px] rounded-[45px] transition-all bg-white shadow-sm
                ${isOn ? "left-[calc(100%-2px)] -translate-x-full" : "left-[2px] translate-x-0"}`} />
            </label>
        </>
    );
}