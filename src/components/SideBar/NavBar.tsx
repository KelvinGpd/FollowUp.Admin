"use client"

import "./NavBar.css"
import React from "react";
import {AddPatientIcon, Settings, ViewPatient} from "../Icon/Icons";

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="logo-container">
                <img src={require('./../../img/logo.png')} width={150} height={150}/>
            </div>

            <nav className="nav-menu">
                {/* First navigation item */}
                <div className="nav-item-wrapper">
                    <a href="/add-patient" className="nav-menu-item">
                        <AddPatientIcon />
                        <span className="nav-text">Add New Patient</span>
                    </a>
                    <div className="divider" />
                </div>

                {/* Second navigation item */}
                <div className="nav-item-wrapper">
                    <a href="/patients" className="nav-menu-item">
                        <ViewPatient />
                        <span className="nav-text">View Patients</span>
                    </a>
                    <div className="divider" />
                </div>

                {/* Third navigation item */}
                <div className="nav-item-wrapper">
                    <a href="/settings" className="nav-menu-item">
                        <Settings />
                        <span className="nav-text">Settings</span>
                    </a>
                </div>
            </nav>
        </div>
    )
}

