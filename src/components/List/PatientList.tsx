import { User } from "../../types/types";
import ListItem from "./ListItem";
import './list.css';
import useFetchUsers from "../../hooks/useFetchUsers";
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {CSSProperties} from "react";
import CreatePatient from "../Create/CreatePatient";
import PatientProfile from "../Profile/PatientProfile";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Full name', minWidth: 100 },
    { field: 'ailments', headerName: 'Ailments', minWidth: 130 },
    { field: 'prescriptions', headerName: 'Current medications', minWidth: 180 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
    const { data: users, loading } = useFetchUsers();

    const navigate = useNavigate();

    const handleRowClick = (params: any) => {
        if (!users) return;
        const selectedUser = users.find((user: User) => user.uuid === params.row.uuid);
        navigate(`/patient-profile/${params.row.uuid}`, { state: { user: selectedUser } });
    }
    return (
        <div className={"container"}>
            <header>
                <h1>Pharmacist admin portal</h1>
            </header>
            <Paper sx={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={users || []}
                    columns={columns}
                    initialState={{pagination: {paginationModel}}}
                    pageSizeOptions={[5, 10]}
                    getRowId={(row) => row.uuid}
                    onRowClick={handleRowClick}
                />
            </Paper>
            <CreatePatient />
        </div>

    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px',
        paddingInline: '5%',
        width: '100%',
    },

    button:{
        backgroundColor: '#668586',
        padding: '20px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        fontSize: '18px',
        marginTop: '20px',
    }
}

