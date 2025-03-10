import { CSSProperties } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useFetchUsers from "../../hooks/useFetchUsers";
import useFetchMedicationForUser from "../../hooks/useFetchMedication";
import PrescribeMedication from './PrescribeMedication';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { User } from '../../types/types';


const columns: GridColDef[] = [
    { field: 'patientName', headerName: 'Full name', minWidth: 150 },
    { field: 'consumptionDetails', headerName: 'Details', minWidth: 350 },
    { field: 'prescriptionDate', headerName: 'Start', minWidth: 130 },
    { field: 'expDate', headerName: 'End', minWidth: 130 },

];

const paginationModel = { page: 0, pageSize: 5 };



const PatientProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state as { user: User };

    const { data: medications, loading: loadingMeds } = useFetchMedicationForUser(user.name) || [];

    return (
        <div >
            <div style={styles.headerContainer}>
                <button style={styles.backButton} onClick={() => navigate('/patients')}>Back to patient list</button>
                <h1 style={{ textAlign: 'center' }}>Patient Profile</h1>
                <p></p>
            </div>

            <div style={styles.container}>

                <div>
                    <div style={styles.patientCardContainer}>
                        <p style={styles.patientCardItem}><span style={{fontWeight:'bold'}}>Name:</span> {user?.name} <br></br></p>
                        <p style={styles.patientCardItem}><span style={{fontWeight:'bold'}}>Ailments:</span> {user?.ailments}<br></br></p>
                        <p style={styles.patientCardItem}> <span style={{fontWeight:'bold'}}>Phone number:</span>{user?.phoneNumber}<br></br>
                        </p>
                        <p style={styles.patientCardItem}><span
                            style={{fontWeight: 'bold'}}>Branch name:</span> {user?.branchName}<br></br></p>
                        <p style={styles.patientCardItem}><span style={{fontWeight:'bold'}}>Branch address:</span> {user?.branchAddress}<br></br></p>

                    </div>
                </div>

                <div style={{marginLeft: 70}}>
                    <Paper sx={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={medications || []}
                            columns={columns}
                            initialState={{pagination: {paginationModel}}}
                            pageSizeOptions={[5, 10]}
                            getRowId={(row) => row.uuid}
                        />
                    </Paper>
                </div>
            </div>

            <PrescribeMedication />

        </div>

    );
}

const styles: { [key: string]: CSSProperties } = {
    headerContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin : 20,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px',
    },

    patientCardContainer : {
        height: '400px',
        width: '150%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px',
        backgroundColor: '#C0D6D8',
        marginRight: 20,
        textAlign: 'center',
    },

    patientCardItem:{
        marginBottom:10,
    },

    backButton:{
        backgroundColor: '#668586',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        fontSize: '12px',
        alignSelf: 'flex-start',
    },

    button:{
        backgroundColor: '#668586',
        padding: '20px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        fontSize: '18px',
    }
}

export default PatientProfile;