import './App.css'
import { Calendar } from 'antd';
import 'antd/dist/antd.css';

const App = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return <Calendar onPanelChange={onPanelChange} />;
};

export default App
