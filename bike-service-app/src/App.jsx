import './scss/App.scss'
import Cal from "./components/Calendar.jsx";
import 'antd/dist/antd.css';
import Header from "./components/Header.jsx";
import FormDisabledDemo from "./components/Form.jsx";
import Footer from "./components/Footer.jsx";


const App = () => {

    return (
        <>
            <Header/>
            <Cal/>;
            <FormDisabledDemo />
            <Footer />
        </>
    )

};

export default App
