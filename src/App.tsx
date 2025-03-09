import './App.css';
import CreatePatient from './components/Create/CreatePatient';
import PatientList from './components/List/PatientList';
import PrescribeMedication from './components/Profile/PrescribeMedication';

function App() {
  return (
    <div className="App">
      <PrescribeMedication/>
    </div>
  );
}

export default App;
