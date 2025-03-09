import { User } from "../../types/types";
import ListItem from "./ListItem";
import './list.css';
import useFetchUsers from "../../hooks/useFetchUsers";
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React, {CSSProperties} from "react";
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
    };

    return (
        <div className={"container"}>
            <header>
                <h1>Pharmacist admin portal</h1>
            </header>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users || []}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    getRowId={(row) => row.uuid}
                    onRowClick={handleRowClick}
                />
            </Paper>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
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


// const PatientList = () => {
//     const {data: users, loading } = useFetchUsers();
//     console.log(users); // already a perf array
//
//
//
//     const colums = ['Name', 'Ailments', 'Prescriptions', 'Phone Number'];
//
//     if (loading) return <div>Loading</div>;
//     return (
//         <div className="list">
//             <table className="list-table">
//                 <thead>
//                     <tr>
//                     {colums.map((col) => (
//                         <th key={col}>{col}</th>
//                     ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users && users.map((user) => (
//                         <ListItem key={user.uuid} user={user} />
//                     ))}
//                 </tbody>
//             </table>
//             <div className="list-footer">
//                 <div className="list-footer-item">
//                     <img className="icon" src={`${process.env.PUBLIC_URL}/img/arrw.svg`} />
//                     <p> Previous </p>
//                 </div>
//                 <div className="list-footer-item">
//                     <p> Next </p>
//                     <img className="icon" src={`${process.env.PUBLIC_URL}/img/arrw.svg`} />
//                 </div>
//             </div>
//         </div>
//     );
// }

//export default PatientList();

