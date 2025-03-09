import './App.css';
import CreatePatient from './components/Create/CreatePatient';
import PatientList from './components/List/PatientList';
import PrescribeMedication from './components/Profile/PrescribeMedication';
import PatientProfile from "./components/Profile/PatientProfile";

function App() {
  return (
    <div className="App">
      {/*<PrescribeMedication/>*/}
        <PatientProfile/>
      {/*  <PatientList/>*/}
    </div>
  );
}

export default App;
