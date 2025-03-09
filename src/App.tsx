import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./fonts/Gambetta.ttf"
import "./fonts/Domine-SemiBold.ttf"
import ConsultPatient from "./pages/ConsultPatient"
import Layout from "./pages/layout"
import Profile from "./pages/profile"
import AddPatient from "./pages/AddPatient"
import NoPage from "./pages/NoPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ConsultPatient />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="patient" element={<AddPatient />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

