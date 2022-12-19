import React from "react";
import './styles/Pagination.css';

const Pagination = ({ usersPerPage, totalUsers, paginate,currentPageLocation}) => {
    const pageNumbers = [];

    // console.log(currentPageLocation);
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage) ; i++) {
        pageNumbers.push(i);
    }

    
    return (
        <div className="list-pagination">
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                            <a onClick={() =>paginate(currentPageLocation-1)} className="page-link">prev</a>        
                    </li>
                    {pageNumbers.map ( num => (
                        <li key={num} className={"page-item obj" + num} >
                            <a onClick={() =>paginate(num)} id={num} className="page-link">{num}</a>        
                        </li>
                    ))}
                    <li className="page-item">
                            <a onClick={() =>paginate(currentPageLocation+1)}className="page-link">next</a>        
                    </li>
                </ul>
            </nav>
        </div>
       
    )

}

export default Pagination;