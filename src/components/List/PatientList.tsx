import { User } from "../../types/types";
import ListItem from "./ListItem";
import './list.css';
import useFetchUsers from "../../hooks/useFetchUsers";

const PatientList = () => {
    const { data: users, loading } = useFetchUsers();
    const colums = ['Name', 'Ailments', 'Prescriptions', 'Phone Number'];

    if (loading) return <div>Loading</div>;
    return (
        <div className="list">
            <table className="list-table">
                <thead>
                    <tr>
                    {colums.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <ListItem key={user.uuid} user={user} />
                    ))}
                </tbody>
            </table>
            <div className="list-footer">
                <div className="list-footer-item">
                    <img className="icon" src={`${process.env.PUBLIC_URL}/img/arrw.svg`} />
                    <p> Previous </p>
                </div>
                <div className="list-footer-item">
                    <p> Next </p>
                    <img className="icon" src={`${process.env.PUBLIC_URL}/img/arrw.svg`} />
                </div>
            </div>
        </div>
    );
}

export default PatientList;