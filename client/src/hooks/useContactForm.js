import { useState } from "react";
import toast from 'react-hot-toast';
import { submitContactEnquiry } from "../services/contactService";

const initialState = {
    name: '',
    email: '',
    subject: '',
    purpose: '',
    message: '',
}

export function useContactForm() {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const sanitizeValue = (value = '') => {
        return value
            .replace(/\r\n/g, '\n')     // normalize line endings
            .replace(/\n{3,}/g, '\n\n') // max 2 consecutive new lines
            .trim();                    // remove leading & trailing spaces
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const { name, email, subject, purpose, message } = formData;

        if(!name || !email || !subject || !purpose || !message){
            toast.error('Please fill in all required fields');
            return;
        }
        const finalData = {
            name: sanitizeValue(formData.name),
            email: sanitizeValue(formData.email),
            subject: sanitizeValue(formData.subject),
            purpose: sanitizeValue(formData.purpose),
            message: sanitizeValue(formData.message),
        }
        try {
            setLoading(true);
            await submitContactEnquiry(finalData);

            toast.success('Your enquiry has been sent successfully!');
            setFormData(initialState);
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
        finally{
            setLoading(false);
        }
    }

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
    }
}