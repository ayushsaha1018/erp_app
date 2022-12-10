import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticationForm from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthenticationForm />} />
      </Routes>
    </div>
  );
}

export default App;
