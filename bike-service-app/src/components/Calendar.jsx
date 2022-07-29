import {Alert, Calendar, Badge} from 'antd';
import moment from 'moment';
import React from 'react';
import {useState, useContext} from "react";
import DateContext from "./DateContext.jsx";
import PocketBase from "pocketbase";


const Cal = () => {
    const {dataFiltered, changeDataFiltered} = useContext(DateContext);

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
    // const disabledDate = (value) => {
    //     return !(value.day() === 5 || 6) ? true : false;
    // }
    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);

    };


    const selectedDate = selectedValue?.format('DD/MM/yyyy');
    const {changeDate, isSubmit} = useContext(DateContext);
    changeDate(selectedDate);
    dateGetList();




    return (
        <>
            <Alert message={`Wybrana data: ${selectedValue?.format('DD/MM/yyyy')}`}/>
            <Calendar dateCellRender={dateCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange}/>;
        </>
    )
};


export default Cal;
