import {createContext, useState} from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState('');
    const [isSubmit, setIsSubmit] = useState();
    const [dataFiltered, setDataFiltered] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    const changeDate = (date) => {
        setDate(date);
    }

    const changeIsSubmit = (value) => {
        setIsSubmit(value)
    }

    const changeDataFiltered = (value) => {
        setDataFiltered([...value])
    }

    const changeVisibility = () => {
        setIsVisible(prevState => !prevState);
    }

    return (
        <DateContext.Provider value={{date, changeDate, isSubmit, changeIsSubmit, dataFiltered, changeDataFiltered, isVisible, changeVisibility}}>
            {children}
        </DateContext.Provider>
    );
}
export default DateContext;