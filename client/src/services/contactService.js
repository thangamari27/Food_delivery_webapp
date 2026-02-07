import axios from 'axios';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export const submitContactEnquiry = async (data) => {
    try {
        const params = new URLSearchParams(data);
        await axios.post(GOOGLE_SCRIPT_URL, params)
    } catch (error) {
        throw new Error({error: error.messgae});
    }
}