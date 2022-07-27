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
        service: "SERWIS KOMPLEKSOWY",
        additional: "",
    });

    const [checked, setChecked] = useState(false);
    const handleChecked = (e) => {
        setChecked(e.target.checked);
    };

    const form = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        service: data.service,
        additional: data.additional,
        statement: checked,
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        const client = new PocketBase('http://localhost:8090');


        client.Records.create("bike_service_app", form)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
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
                <Input name="name"
                    value={data.name}
                       onChange={handleChange}
                />
            </Form.Item>
            <Form.Item

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
                <Input value={data.surname}
                       onChange={handleChange}
                       name="surname"
                />
            </Form.Item>
            <Form.Item

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
                <Input
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                />
            </Form.Item>
            <Form.Item
                label="Nr kontaktowy"
                rules={[
                    {
                        required: true,
                        message: 'Proszę podaj numer telefonu!',
                    },
                ]}
            >
                <Input
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    addonBefore='+48'
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item label="Wybierz rodzaj serwisu"

                       initialValue='SERWIS KOMPLEKSOWY'
                       tooltip='Cena serwisu zależy od aktualnego sezonu. Pełny cennik na stronie # '
                       rules={[
                           {
                               required: true,
                               message: 'Proszę podaj numer telefonu!',
                           },
                       ]}
            >
                <Select name='service' value={data.service} onChange={handleChange}
                >
                    <Select.Option name='basic' value="SERWIS PODSTAWOWY">SERWIS PODSTAWOWY</Select.Option>
                    <Select.Option name='full' value="SERWIS KOMPLEKSOWY">SERWIS KOMPLEKSOWY</Select.Option>
                    <Select.Option name='premium' value="SERWIS PREMIUM">SERWIS PREMIUM</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                       label="Dodatkowe informacje">
                <TextArea
                    name='additional'
                    value={data.additional}
                    onChange={handleChange}
                    rows={4} />
            </Form.Item>
            <Form.Item
                       label="Oświadczenie"
                       valuePropName="checked"
                       rules={[
                           {
                               required: true,
                           },
                           ]}
                >
                <Checkbox
                    name="statement"
                   checked={checked}
                    onChange={handleChecked}
                >Akceptuję regulamin i cennik serwisu</Checkbox>
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