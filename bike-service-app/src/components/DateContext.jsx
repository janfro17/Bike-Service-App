import {createContext, useState} from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState('');
    const [isSubmit, setIsSubmit] = useState();
    const [dataFiltered, setDataFiltered] = useState([]);

    const changeDate = (date) => {
        setDate(date);
    }

    const changeIsSubmit = (value) => {
        setIsSubmit(value)
    }

    const changeDataFiltered = (value) => {
        setDataFiltered([...value])
    }

    return (
        <DateContext.Provider value={{date, changeDate, isSubmit, changeIsSubmit, dataFiltered, changeDataFiltered}}>
            {children}
        </DateContext.Provider>
    );
}
export default DateContext;