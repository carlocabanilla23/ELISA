import React from "react";

const ListUsers = (props) => {
   const { firstname, lastname, email, studentID, phone, role } = props.user; 
    
    return (
            <h1>{firstname}</h1>
    );

}

export default ListUsers;