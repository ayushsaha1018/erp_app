import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AddAttendence from './components/Attendence/AddAttendence';
import { ViewAttendence } from './components/Attendence/ViewAttendence';
import Login from './pages/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Fees from './components/Fees/Fees';
import Home from './pages/Home';
import AddStudent from './components/Student/AddStudent';
import { ViewStudent } from './components/Student/ViewStudent';
import AddTeacher from './components/Teacher/AddTeacher';
import { ViewTeacher } from './components/Teacher/ViewTeacher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/attendence/view" element={<ViewAttendence />} />
          <Route path="/attendence/add" element={<AddAttendence />} />
          <Route path="/students/view" element={<ViewStudent />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/teachers/view" element={<ViewTeacher />} />
          <Route path="/teachers/add" element={<AddTeacher />} />
          <Route path="/fees" element={<Fees />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
