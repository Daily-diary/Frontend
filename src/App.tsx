import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { pingServer } from './api/client';
import './styles/App.css';

function App() {
  useEffect(() => { pingServer(); }, []);

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
