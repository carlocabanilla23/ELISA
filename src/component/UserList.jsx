import UserCard from "./UserCard";
import React from "react";
import './styles/List.css';

const UserList = ({users,updateList,ViewInformation,changeRole,changeStatus}) => {

    return (
        <ul className="list-group">
            { users.map( (user,index) => (
                <li key={index}>
                    <UserCard
                    user={user}
                    key={index}
                    updateList={updateList}
                    ViewInformation={ViewInformation}
                    // ViewHistory={ViewHistory}
                    changeRole={changeRole}
                    changeStatus={changeStatus} />
                </li>
            ))}
        </ul>
    )
}
export default UserList;