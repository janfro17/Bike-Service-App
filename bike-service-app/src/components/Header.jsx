import React, {useContext} from 'react';
import imgURL from '../assets/logo-bike.svg';
import {useState} from "react";
import PocketBase from 'pocketbase';
import DateContext from "./DateContext.jsx";


function Header() {
    const [caseNumber, setCaseNumber] = useState("");
    const [caseData, setCaseData] = useState({});
    const [isShownCase, setIsShownCase] = useState(false);
    const [isShownError, setIsShownError] = useState(false);
    const {changeVisibility} = useContext(DateContext);

    const checkNumber = (e) => {
        e.preventDefault();
        setIsShownError(false);
        changeVisibility();
        const client = new PocketBase('http://localhost:8090');

        client.Records.getOne("bike_service_app", caseNumber)
            .then(data => {
                setCaseData(data);
                console.log(data);
                setIsShownCase(true);
            })
            .catch(error => {
                console.log(error);
                setIsShownCase(false);
                setIsShownError(true);
            });
    }


    const clearData = () => {
        setCaseNumber("");
        setIsShownCase(false);
        setIsShownError(false);
    }


    const caseDataDiv = <div className='case_data'>
        <h2>Szczegóły sprawy serwisowej:</h2>
        <p><strong>Nr sprawy:</strong> {JSON.stringify(caseData.id)}</p>
        <p><strong>Data zgłoszenia:</strong> {JSON.stringify(caseData.created)}</p>
        <p><strong>Data serwisu:</strong> {JSON.stringify(caseData.date)}</p>
        <p><strong>Status sprawy serwisowej: </strong><span>ZGŁOSZENIE PRZYJĘTE</span></p>
        <h2>Dane klienta: </h2>
        <p><strong>Imię:</strong> {JSON.stringify(caseData.name)}</p>
        <p><strong>Nazwisko:</strong> {JSON.stringify(caseData.surname)}</p>
        <p><strong>E-mail:</strong> {JSON.stringify(caseData.email)}</p>
        <p><strong>Nr kontaktowy:</strong> {JSON.stringify(caseData.phone)}</p>
        <p><strong>Typ serwisu:</strong> {JSON.stringify(caseData.service)}</p>
        <p><strong>Dodatkowe informacje:</strong> {JSON.stringify(caseData.additional)}</p>
    </div>;

    const caseNotFound = <h2>Nie znaleziono sprawy serwisowej o takim numerze</h2>


    return (
        <header>
            <div className="logo">
                <img src={imgURL} alt="logo"/>
                <h2 className="logo_title">Bike Service</h2>
            </div>
            <div className="login_box">
                <div className="checkout_box"><label htmlFor='case_number'>Wpisz nr naprawy </label>
                    <input name='case_number' onChange={e => setCaseNumber(e.target.value)} value={caseNumber}
                           type="text"/>
                    <button onClick={checkNumber} className="checkout_case">
                        Sprawdź status naprawy
                    </button>
                    <button onClick={clearData} className='checkout_case'>
                        Wyczyść
                    </button>
                </div>
            </div>
            {isShownCase && (caseDataDiv)}
            {isShownError && (caseNotFound)}
            <div className="service_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut
                autem corporis delectus deserunt dicta doloremque earum est explicabo fuga hic illo incidunt ipsam iure
                laborum laudantium maxime natus necessitatibus nisi non odit possimus, praesentium quia quibusdam quidem
                quod temporibus totam unde velit voluptatibus. Architecto dicta dolores incidunt ipsa itaque recusandae
                vel. A accusamus ad aliquid blanditiis dolorem earum enim fuga fugit hic illo inventore ipsum laborum,
                magni minus nobis nulla omnis optio quasi quidem quos rerum tempora tempore temporibus unde veniam
                voluptas voluptatibus. Dolor enim officia officiis veniam! Debitis esse itaque iusto, mollitia
                necessitatibus praesentium qui quia. Animi commodi consectetur cumque dolores, esse et exercitationem
                expedita incidunt inventore iusto labore libero maiores molestiae nulla praesentium, quisquam quo quos
                ratione, vel voluptatem? Cumque facere, nisi. Architecto asperiores aut commodi facilis ipsum nemo nisi
                praesentium quam sequi soluta! Accusantium commodi ducimus, ea eligendi illo praesentium vitae?
                Architecto hic nihil officiis totam.
            </div>
        </header>
    );
}

export default Header;