import { Alert, Badge, Calendar } from 'antd';
import moment from 'moment';
import React from 'react';
import {useState} from "react";

const getListData = (value) => {
    let listData;

    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event.',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
            ];
            break;

        case 10:
            listData = [
                {
                    type: 'warning',
                    content: 'Zajęte',
                },
            ];
            break;

        case 15:
            listData = [
                {
                    type: 'warning',
                    content: 'Zajęte',
                },
                {
                    type: 'success',
                    content: 'Wolne',
                },
                {
                    type: 'error',
                    content: 'This is error event 1.',
                },
                {
                    type: 'error',
                    content: 'This is error event 2.',
                },
                {
                    type: 'error',
                    content: 'This is error event 3.',
                },
                {
                    type: 'error',
                    content: 'This is error event 4.',
                },
            ];
            break;

        default:
    }

    return listData || [];
};

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const Cal = () => {
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());
    // export let selectedDate = selectedValue;
    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Alert message={`Wybrana data: ${selectedValue?.format('YYYY-MM-DD')}`} />
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />;
        </>
    )
};


export default Cal;
