import React, {useState, useContext} from 'react';
import PocketBase from 'pocketbase';
import {
    Form,
    Input,
    Select,
    Checkbox, Button,
} from 'antd';
import DateContext from "./DateContext.jsx";


const {TextArea} = Input;
const {Option} = Select;

const FormData = () => {
    const [isClicked, setIsClicked] = useState(false);
    const {isVisible, date, changeIsSubmit, changeVisibility} = useContext(DateContext);
    const serviceDate = date;
    const [caseNumber, setCaseNumber] = useState('');

    const changeCaseNumber = (number) => {
        setCaseNumber(number)
    };

    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        bike: "",
        additional: "",
    });
    const [service, setService] = useState("SERWIS KOMPLEKSOWY");
    const handleService = (value) => {
        setService(value);
    }

    const [checked, setChecked] = useState(false);
    const handleChecked = (e) => {
        setChecked(e.target.checked);
    };

    const form = {
        date: serviceDate,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        bike: data.bike,
        service: service,
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

    const dates = {
        date: serviceDate,
    }
    const addService = () => {
        const client = new PocketBase('http://localhost:8090');

        client.Records.create("service_days", dates)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsClicked(true);

        const client = new PocketBase('http://localhost:8090');

        client.Records.create("bike_service_app", form)
            .then(data => {
                changeCaseNumber(data.id);
                setIsClicked(false);
                setData({
                    name: "",
                    surname: "",
                    email: "",
                    phone: "",
                    bike: "",
                    service: "SERWIS KOMPLEKSOWY",
                    additional: "",
                });
                changeVisibility();
                addService();
            })
            .catch(error => {
                console.log(error);

            });


    }


    return (
        <>
            {isVisible && <Form
                className='container form'
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item
                    className='form_item'
                    label="Wybrana data serwisu"
                    tooltip="Wybierz datę na kalendarzu"
                    rules={[
                        {
                            required: true,
                            message: 'Wybierz datę na kalendarzu!',
                        },
                    ]}
                >
                    <Input name="date"
                           value={serviceDate}
                    />
                </Form.Item>
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
                <Form.Item

                    label="Marka i model roweru"
                    tooltip="Podaj markę i/lub model swojego roweru"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj markę roweru!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input value={data.bike}
                           onChange={handleChange}
                           name="bike"
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
                    <Select value={service} name='service' onChange={handleService}
                    >
                        <Option value="SERWIS PODSTAWOWY">SERWIS PODSTAWOWY</Option>
                        <Option value="SERWIS KOMPLEKSOWY">SERWIS KOMPLEKSOWY</Option>
                        <Option value="SERWIS PREMIUM">SERWIS PREMIUM</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Dodatkowe informacje">
                    <TextArea
                        name='additional'
                        value={data.additional}
                        onChange={handleChange}
                        rows={4}/>
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
                <Form.Item >
                    <Button className='button'
                        type='submit'
                            name='submit'
                            onClick={handleSubmit}

                    >Zarezerwuj serwis</Button>
                </Form.Item>
            </Form>}
            {!isVisible && <div className='case_accepted'><h2>Zgłoszenie zostało przyjęte. Nr naprawy: <strong>{caseNumber}</strong></h2>
                <p>Zapisz numer naprawy w celu sprawdzenia jej statusu.</p></div>}
        </>
    );
};

export default FormData;