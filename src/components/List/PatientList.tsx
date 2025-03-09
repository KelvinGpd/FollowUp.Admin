import { User } from "../../types/types";
import ListItem from "./ListItem";
import './list.css';
import useFetchUsers from "../../hooks/useFetchUsers";
//import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from "@mui/x-data-grid";

// function createData(
//     name: string,
//     ailments: string,
//     prescriptions: string,
//     phone_number: number,
// ) {
//     return { name, ailments, prescriptions, phone_number};
// }
//
// const paginationModel = { page: 0, pageSize: 5 };
//
// // Construire les rows à partir de fetchUsers
//
// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     },
// ];

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Full name', minWidth: 100 },
    { field: 'ailments', headerName: 'Ailments', minWidth: 130 },
    { field: 'prescriptions', headerName: 'Current medications', minWidth: 180 }, // Medication names
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
    const { data: users, loading } = useFetchUsers();
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
                    //sx={{ border: 0 }}
                />
            </Paper>
            <p>

            </p>
        </div>

    );
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

