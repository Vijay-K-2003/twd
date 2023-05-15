import './App.css';
import CompanySettings from './components/CompanySettings/CompanySettings';

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient} >
      <CompanySettings />
    </QueryClientProvider>
  )
}
// <QueryClientProvider client={queryClient}>
// <ReactQueryDevtools initialIsOpen={true} />

export default App
