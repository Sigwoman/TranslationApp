import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';
import App from './components/App';

const client = new ApolloClient({
    uri: process.env.REACT_APP_DB_URL,
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <ApolloProvider client={ client }>
        <App />
    </ApolloProvider>
);
