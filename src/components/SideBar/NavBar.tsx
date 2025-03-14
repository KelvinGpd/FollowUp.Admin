"use client"

import "./NavBar.css"
import { AddPatientIcon, Settings, ViewPatient } from "../Icon/Icons"
import { Link } from "react-router-dom"

export default function Navibar() {
    return (
        <div className="navbar-container">
            <div className="logo-container">
                <img src={require("./../../img/logo.png")} width={150} height={150} />
            </div>

            <nav className="nav-menu">
                {/* First navigation item */}
                <div className="nav-item-wrapper">
                    <Link to="/patient" className="nav-menu-item">
                        <AddPatientIcon />
                        <span className="nav-text">Add New Patient</span>
                    </Link>
                    <div className="divider" />
                </div>

                {/* Second navigation item */}
                <div className="nav-item-wrapper">
                    <Link to="/consult" className="nav-menu-item">
                        <ViewPatient />
                        <span className="nav-text">View Patients</span>
                    </Link>
                    <div className="divider" />
                </div>

                {/* Third navigation item */}
                <div className="nav-item-wrapper">
                    <Link to="/settings" className="nav-menu-item">
                        <Settings />
                        <span className="nav-text">Settings</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

