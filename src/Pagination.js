import React from "react";
import './component/styles/Pagination.css';

const Pagination = ({ usersPerPage, totalUsers, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage) ; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="list-pagination">
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map ( num => (
                        <li key={num} className="page-item">
                            <a onClick={() =>paginate(num)}  className="page-link">{num}</a>        
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
       
    )

}

export default Pagination;