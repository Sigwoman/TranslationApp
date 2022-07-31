import axios from 'axios';

import './App.css';
import Example from './Example';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const App = () => {
    return (
        <div className='App'>
            <header className='App-header'>
                <Example />
            </header>
        </div>
    );
};

export default App;
