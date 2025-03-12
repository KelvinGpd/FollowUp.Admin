import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./fonts/Gambetta.ttf"
import "./fonts/Domine-SemiBold.ttf"
import ConsultPatient from "./pages/ConsultPatient"
import Layout from "./pages/layout"
import Profile from "./pages/profile"
import AddPatient from "./pages/AddPatient"
import NoPage from "./pages/NoPage"
import PrescribeMed from "./pages/PrescribeMed"
import PatientProfile from "./components/Profile/PatientProfile"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/consult" />} />
                    <Route path="consult" element={<ConsultPatient />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="prescribe" element={<PrescribeMed />} />
                    <Route path="create" element={<AddPatient />} />
                    <Route path="profile/:userId" element={<PatientProfile />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

