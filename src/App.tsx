import './App.css';
import CreatePatient from './components/Create/CreatePatient';
import PatientList from './components/List/PatientList';
import PrescribeMedication from './components/Profile/PrescribeMedication';
import PatientProfile from "./components/Profile/PatientProfile";
import {Route, Router, Routes} from "react-router-dom";
import Navbar from "./components/SideBar/NavBar";
import {Switch} from "@mui/material";

import './fonts/Gambetta.ttf'
import './fonts/Domine-SemiBold.ttf'

function App() {
  return (
      <div className="App">
          <Navbar />
          <PatientList />
          {/*<Routes>*/}
          {/*    <Route path='/'  element={<App />} />*/}
          {/*    <Route path='/reports' element={<PatientList />} />*/}
          {/*    <Route path='/products' element={<CreatePatient />} />*/}
          {/*    <Route path='/products' element={<PatientProfile />} />*/}
          {/*</Routes>*/}
      </div>
  );
}

export default App;
