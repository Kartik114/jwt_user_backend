// Wrap the App component with the Provider component and pass the Redux store
import { store } from './store';
import { Provider } from 'react-redux';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


import App from './App';

const AppWithStore = () => {
  
  const client = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:true,
        refetchOnReconnect: true,
      }
    }
  });
  
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  );
}

export default AppWithStore