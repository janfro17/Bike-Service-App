import React from 'react';
import imgURL from '../assets/logo-bike.svg';
import {useState} from "react";
import PocketBase from 'pocketbase';


function Header() {
    const [caseNumber, setCaseNumber] = useState('');
    const handleChangeNumber = (e) => {
        e.preventDefault();


        const client = new PocketBase('http://localhost:8090');


        client.Records.getOne("bike_service_app", caseNumber)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });


    }
    return (
            <header>
                <div className="logo">
                    <img src={imgURL} alt="logo"/>
                    <h2 className="logo_title">Bike Service</h2>
                </div>
                <div className="login_box">
                    <div className="checkout_box"><label htmlFor='case_number'>Wpisz nr naprawy</label>
                        <input name='case_number' onChange={e => setCaseNumber(e.target.value)} value={caseNumber} type="text"/>
                        <button onClick={handleChangeNumber} className="checkout_case">
                            <a href="#">Sprawdź status naprawy</a>
                        </button>
                    </div>
                </div>
            </header>
    );
}

export default Header;