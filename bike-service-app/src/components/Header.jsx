import React from 'react';
import imgURL from '../assets/logo-bike.svg';


function Header() {
    return (
            <header>
                <div className="logo">
                    <img src={imgURL} alt="logo"/>
                    <h2 className="logo_title">Bike Service</h2>
                </div>
                <div className="login_box">
                    <div className="checkout_box"><label htmlFor={'case_number'}>Wpisz nr naprawy</label>
                        <input name={'case_number'} type="number"/>
                        <button className="checkout_case">
                            <a href="#">Sprawdź status naprawy</a>
                        </button>
                    </div>
                    <button className="login">
                        <a href="#">Login</a>
                    </button>
                </div>
            </header>
    );
}

export default Header;