import UserCard from "../card/UserCard";
import React from "react";
import '../../assets/styles/List.css';

const UserList = ({users,updateList,ViewInformation,changeRole,changeStatus,deleteConfirm}) => {

    return (
        <ul className="list-group">
            { users.map( (user,index) => (
                <li key={index}>
                    <UserCard
                    user={user}
                    key={index}
                    updateList={updateList}
                    ViewInformation={ViewInformation}
                    changeRole={changeRole}
                    changeStatus={changeStatus}
                    deleteConfirm={deleteConfirm} />
                </li>
            ))}
        </ul>
    )
}
export default UserList;