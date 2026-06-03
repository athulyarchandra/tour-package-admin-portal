import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './index.css';
import App from './App.jsx';
import { FilterProvider } from './components/contexts/FilterContext.jsx';
createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </FilterProvider>
);