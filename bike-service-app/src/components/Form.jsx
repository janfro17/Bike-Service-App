import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import {
    Form,
    Input,
    Select,
    Checkbox, Button,
} from 'antd';

const { TextArea } = Input;
const serviceDate = '2022-07-22';


const FormData = () => {
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        service: "full",
        additional: "",
        statement: false,
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const API = "http://localhost:8090";


        fetch(`${API}/api/collections/bike_service_app/records`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });


        // const client = new PocketBase("/");
        //
        // const data = {
        //     name: this.name,
        //     surname: this.surname,
        //
        //
        // };
        //
        // client.Records.create("bike_service_app", data)
        //     .then(function (record) {
        //         // success...
        //     }).catch(function (error) {
        //     // error...
        // });
    }

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            <h2>Data serwisu: {serviceDate}</h2>
            <Form.Item
                name="name"
                value={data.name}
                onChange={handleChange}
                label="Imię"
                tooltip="Podaj swoje imię"
                rules={[
                    {
                        required: true,
                        message: 'Podaj swoje imię!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="surname"
                value={data.surname}
                onChange={handleChange}
                label="Nazwisko"
                tooltip="Podaj swoje nazwisko"
                rules={[
                    {
                        required: true,
                        message: 'Podaj swoje nazwisko!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                value={data.email}
                onChange={handleChange}
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Podaj poprawny adres e-mail!',
                    },
                    {
                        required: true,
                        message: 'Proszę podaj adres e-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                value={data.phone}
                onChange={handleChange}
                label="Nr kontaktowy"
                rules={[
                    {
                        required: true,
                        message: 'Proszę podaj numer telefonu!',
                    },
                ]}
            >
                <Input
                    addonBefore='+48'
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item label="Wybierz rodzaj serwisu"
                       name='service'
                       value={data.service}
                       onChange={handleChange}
                       tooltip='Cena serwisu zależy od aktualnego sezonu. Marzec lipiec - '
                       rules={[
                           {
                               required: true,
                               message: 'Proszę podaj numer telefonu!',
                           },
                       ]}
            >
                <Select>
                    <Select.Option name='basic' value="SERWIS PODSTAWOWY">SERWIS PODSTAWOWY</Select.Option>
                    <Select.Option name='full' value="SERWIS KOMPLEKSOWY">SERWIS KOMPLEKSOWY</Select.Option>
                    <Select.Option name='premium' value="SERWIS PREMIUM">SERWIS PREMIUM CENA</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name='additional'
                       value={data.additional}
                       onChange={handleChange}
                       label="Dodatkowe informacje">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="statement"
                       value={data.statement}
                       onChange={handleChange}
                       label="Oświadczenie"
                       valuePropName="checked"
                       rules={[
                           {
                               required: true,
                           },
                           ]}
                >
                <Checkbox>Akceptuję regulamin i cennik serwisu</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type='submit'
                        name='submit'
                        onClick={handleSubmit}
                >Zarezerwuj serwis</Button>
            </Form.Item>
        </Form>
    );
};

export default FormData;