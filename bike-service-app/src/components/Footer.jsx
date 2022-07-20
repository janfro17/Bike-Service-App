import React from 'react';
import imgFooter1 from '../assets/001-arroba.png';
import imgFooter2 from '../assets/002-old-typical-phone.png';
import imgFooter3 from '../assets/003-stopwatch.png';
import imgFooter4 from '../assets/003-smartphone-call.png';
import imgFooter5 from '../assets/004-location-pin.png';

function Footer() {
    return (
        <>
        <footer className='footer'>
            <div className="footer_box">
                <ul className="footer_box_list">
                    <li className="footer_box_list_item"><a href="#">Strona główna</a></li>
                    <li className="footer_box_list_item"><a href="#">Sprawdź status naprawy</a></li>
                    <li className="footer_box_list_item"><a href="#">Zaloguj się</a></li>
                </ul>
            </div>
            <div className="contact_box">
                <address className="contact_box_info">
                    <img src={imgFooter3} alt="godziny otwarcia"/>
                    <p>Godziny otwarcia: Poniedziałek - Piątek 10 - 18</p>
                    <img src={imgFooter5} alt="lokalizacja"/>
                    <p>ul.Kowalskiego 8, 00-123 Warszawa</p>
                    <img src={imgFooter2} alt="telefon"/>
                    <p>01 234-56-78</p>
                    <img src={imgFooter4} alt="smartphone"/>
                    <p>012-345-678</p>
                    <img src={imgFooter1} alt="mail"/>
                    <p><a href="mailto:contact@bikeservice.com">contact@bikeservice.com</a></p>
                </address>
            </div>
            <div className="copyrights"></div>
        </footer>
        </>
    );
}

export default Footer;

