import axios from "axios";
import { useEffect, useState } from "react";

/**
 * 
 * @param {string} pfpUrl The url of profile picture
 * @param {string} userName The name of the user 
 * @returns {JSX.Element} Profile picture element for user ID card or a loading skeleton in-case it hasn't loaded yet
 */
function ProfileImage({ pfpUrl, userName }) {
    if (pfpUrl === null) { //return a skeleton if param is null
        return <div className="mx-auto aspect-square h-[8rem] rounded-md shadow-sm shadow-zinc-200 animate-pulse bg-gray-400"></div>
    }
    return <img src={pfpUrl} alt={userName} title={userName}
        className="mx-auto aspect-square h-[8rem] rounded-md shadow-sm shadow-zinc-200" />;
}

/**
 * @param {string} userName User's full name (first name and last name)
 * @param {string} gender User's gender (male or female)
 * @param {string} phone User's phone number
 */
function UserInfo({ userName, gender, phone }) {
    if (userName === null) { //return a skeleton if param is null
        return <div className="grid grid-rows-3 gap-[2px] [&>*]:flex [&>*]:flex-row [&>*]:items-center">
            <p className="h-3/4 w-full sm:w-1/2 bg-gray-300 animate-pulse rounded-md inline-block"></p>
            <p className="h-3/4 w-full sm:w-1/3 bg-gray-400 animate-pulse rounded-md inline-block"></p>
            <p className="h-3/4 w-full sm:w-2/3 bg-gray-500 animate-pulse rounded-md inline-block"></p>
        </div>
    }

    return <div className="grid grid-rows-3 gap-[2px] [&>*]:flex [&>*]:flex-row [&>*]:items-center">
        <p><span className="font-lato mr-1">Name:</span><span className="font-playfair">{userName}</span></p>
        <p><span className="font-lato mr-1">Gender:</span><span className="font-playfair">{gender}</span></p>
        <p><span className="font-lato mr-1">Phone:</span><span className="font-playfair">{phone}</span></p>
    </div>
}


/**
 * @param {number} page randomuser API page number
 * @param {number} result randomuser API result number
 * @param {string} seed randomuser API user seed
 */
export default function IDCard({ page, result, seed }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pfpUrl, setPfpUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); //always set loading to true before fetching data, so that the skeletons work
        axios.get(`https://randomuser.me/api/?page=${page}&results=${result}&seed=${seed}`).then(({ data }) => {
            const userData = data.results[0];
            setFirstName(userData.name.first);
            setLastName(userData.name.last);
            setGender(userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1));
            setPhoneNumber(userData.phone);
            setPfpUrl(userData.picture.large);
            setLoading(false);
        });
    }, [seed, page, result]);

    //while loading, we will set all arguments to null, so that skeletons can be loaded instead
    return <div className={`bg-gradient-to-br from-slate-200 via-white to-slate-200 rounded-lg pb-7 px-7 pt-4 w-[15rem] sm:w-auto`}>
        <h1 className="font-playfair text-2xl text-center pb-4">ID Card</h1>
        <div className={`grid sm:grid-cols-[2fr_3fr] grid-cols-[1r] sm:grid-rows-1 grid-rows-2 gap-[1.5rem]`}>
            {loading ? <ProfileImage userName={null} pfpUrl={null} /> : <ProfileImage userName={`${firstName} ${lastName}`} pfpUrl={pfpUrl} />}
            {loading ? <UserInfo userName={null} gender={null} phone={null} /> : <UserInfo userName={`${firstName} ${lastName}`} gender={gender} phone={phoneNumber} />}
        </div>
    </div>;

}