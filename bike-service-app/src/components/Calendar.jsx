import { Alert, Calendar } from 'antd';
import moment from 'moment';
import React from 'react';
import {useState, useContext} from "react";
import DateContext from "./DateContext.jsx";



const getListData = (value) => {
    let listData;
if (value.month()) {
    listData = 4;

    const {isSubmit, date} = useContext(DateContext);
    const selectedDay = date.slice(8, 10);
    const selectedMonth = date.slice(-4, -3);

    if (isSubmit === true) {

        if (value.date() === selectedDay && value.month() === selectedMonth) {
            console.log(listData);
            // if (listData > 0) {
            //     listData--
            } else
                console.log(value.day())
        }
    }
    return listData;
}




const Cal = () => {

    const dateCellRender = (item) => {
        const listData = getListData(item);
        return (
            listData
        );
    };
    const disabledDate = (value) => {
        return !(value.day() === 5 || 6) ? true : false;
    }
    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);

    };
    const selectedDate = selectedValue?.format('YYYY-MM-DD');
    const { changeDate } = useContext(DateContext);
    changeDate(selectedDate);




    return (
        <>
            <Alert message={`Wybrana data: ${selectedValue?.format('YYYY-MM-DD')}`} />
            <Calendar disabledDate={disabledDate} dateCellRender={dateCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />;
        </>
    )
};


export default Cal;
