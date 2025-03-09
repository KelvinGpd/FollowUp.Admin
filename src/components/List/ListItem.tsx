import { User } from '../../types/types';

interface ListItemProps {
    user: User
}

const ListItem:React.FC<ListItemProps> = ({ user }) => {
    return (
        <tr className="list-item">
            <td>{user.name}</td>
            <td>{user.ailments}</td>
            <td>{user.branchName}</td>
            <td>{user.phoneNumber}</td>
        </tr>
    );
}

export default ListItem;