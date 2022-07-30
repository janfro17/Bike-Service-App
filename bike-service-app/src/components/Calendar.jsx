import {Alert, Calendar, Badge} from 'antd';
import moment from 'moment';
import React from 'react';
import {useState, useContext, useEffect} from "react";
import DateContext from "./DateContext.jsx";
import PocketBase from "pocketbase";


const Cal = () => {
    const {dataFiltered, changeDataFiltered} = useContext(DateContext);

    useEffect(() => {
        dateGetList();


    }, []);


    const dateGetList = () => {
        const client = new PocketBase("http://localhost:8090");

        client.Records.getList("service_days",)
            .then(function (list) {
                const filtered = list.items.map(item => {
                    return item.date;
                })
                changeDataFiltered(filtered);
            }).catch(function (error) {
            console.log(error);
        });
    }

    const addToData = (arr) => {
        return arr.map(item => {
            return {
                date: item
            }
        })
    };

    const data = addToData(dataFiltered);

    const dateCellRender = (value) => {
        const stringValue = value.format("DD/MM/yyyy");
        const listData = data.filter(({date}) => date === stringValue)
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={"error"} text={"Zajęte"}/>
                    </li>
                ))}
            </ul>
        );
    };
    const countDates = (arr) => {
       return (
           arr.reduce((accumulator, value) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
        }, {})
    )}

   let countDatesObj = countDates(dataFiltered);

    const countArr = Object.entries(countDatesObj);
    const filteredArr = countArr.filter(([key, value]) => {
      return value >= 4
    });
    const disabledDatesObj = Object.fromEntries(filteredArr);
    const disabledDates = Object.keys(disabledDatesObj);

    const disabledDate = (current) => {
        return (
           current && current < moment().endOf('day') ||
            moment(current).day() === 0 ||
               moment(current).day() === 6 ||
               disabledDates.find(date => date === moment(current).format("DD/MM/YYYY"))
            );
    }

    const [value, setValue] = useState();
    const [selectedValue, setSelectedValue] = useState();


    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);

    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };


    const selectedDate = () => {
        return selectedValue === undefined ? "" : selectedValue?.format('DD/MM/yyyy');
    }
    const {changeDate, isSubmit, isVisible} = useContext(DateContext);
    changeDate(selectedDate);





    return (
        <>
            {isVisible && <Alert className='container alert' message={`Wybrana data: ${selectedDate()}`}/>}
            {isVisible && <Calendar className='container calendar' disabledDate={disabledDate} dateCellRender={dateCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange}/>}
        </>
    )
};


export default Cal;
