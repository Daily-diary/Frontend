import { BrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
      
    </BrowserRouter>
  );
}

export default App;
