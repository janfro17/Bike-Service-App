import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
} from 'antd';

const { TextArea } = Input;

const FormData = () => {
const serviceDate = '2022-05-05';
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
                       tooltip='Cena serwisu zależy od aktualnego sezonu. Marzec lipiec - '
                       rules={[
                           {
                               required: true,
                               message: 'Proszę podaj numer telefonu!',
                           },
                       ]}
            >
                <Select>
                    <Select.Option value="SERWIS PODSTAWOWY">SERWIS PODSTAWOWY</Select.Option>
                    <Select.Option value="SERWIS KOMPLEKSOWY">SERWIS KOMPLEKSOWY</Select.Option>
                    <Select.Option value="SERWIS PREMIUM">SERWIS PREMIUM CENA</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Dodatkowe informacje">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="statement"
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
            <Form.Item
            >
                <Button type='submit'
                name='submit'
                >Zarezerwuj serwis</Button>
            </Form.Item>
        </Form>
    );
};

export default FormData;