import React, {CSSProperties} from "react";
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import useFetchUsers from "../../hooks/useFetchUsers";
import useFetchMedicationForUser from "../../hooks/useFetchMedication";

const PatientProfile = () => {
    const { data: users, loading } = useFetchUsers() || [];
    const userName = 'Jane Doe';

    const { data: medications, loading: loadingMeds } = useFetchMedicationForUser(userName) || [];
    console.log(medications)

    const userInfo = users?.filter(user => user.name === userName);
    const allMeds = medications?.map(med => med.medicationName);

    return (
        <div>
            <h1>Patient Profile</h1>

            <div>

            </div>



        </div>

    );
}

const styles: { [key: string]: CSSProperties } = {

}


export default PatientProfile;