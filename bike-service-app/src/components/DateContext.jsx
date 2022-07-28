import {createContext, useState} from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState('');
    const changeDate = (date) => {
        setDate(date);
    }
    return (
        <DateContext.Provider value={{date, changeDate}}>
            {children}
        </DateContext.Provider>
    );
}
export default DateContext;