import Navibar from "../components/SideBar/NavBar"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div style={{
            flex: "1",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#fff",
        }}>
            <Navibar />
            <div style={{
                width: "80%",
            }}>
                <Outlet/>
            </div>
        </div>
    )
}

