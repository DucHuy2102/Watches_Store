import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </React.StrictMode>
);
