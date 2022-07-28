import './scss/App.scss'
import Cal from "./components/Calendar.jsx";
import 'antd/dist/antd.css';
import Header from "./components/Header.jsx";
import FormData from "./components/Form.jsx";
import Footer from "./components/Footer.jsx";
import {DateProvider} from "./components/DateContext.jsx";


const App = () => {


    return (
        <>
            <DateProvider>
            <Header />
            <Cal/>;
            <FormData />
            <Footer />
            </DateProvider>
        </>
    )

};

export default App
