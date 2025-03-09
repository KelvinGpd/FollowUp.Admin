import './App.css';
import CreatePatient from './components/Create/CreatePatient';
import PatientList from './components/List/PatientList';
import PrescribeMedication from './components/Profile/PrescribeMedication';
import PatientProfile from "./components/Profile/PatientProfile";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/SideBar/NavBar";

import './fonts/Gambetta.ttf'
import './fonts/Domine-SemiBold.ttf'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/patients" />} />
          <Route path="/add-patient" element={<CreatePatient />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/prescribe-medication" element={<PrescribeMedication />} />
          <Route path="/patient-profile/:userId" element={<PatientProfile />} />
        </Routes>
      </div>
    </Router>
);
}

export default App;
