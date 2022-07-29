import {createContext, useState} from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState('');
    const [isSubmit, setIsSubmit] = useState();

    const changeDate = (date) => {
        setDate(date);
    }

    const changeIsSubmit = (value) => {
        setIsSubmit(value)
    }

    return (
        <DateContext.Provider value={{date, changeDate, isSubmit, changeIsSubmit}}>
            {children}
        </DateContext.Provider>
    );
}
export default DateContext;