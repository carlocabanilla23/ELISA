import React from "react";
import '../assets/styles/Pagination.css';

const Pagination = ({ PerPage, total, paginate,currentPageLocation}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / PerPage) ; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="list-pagination">
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                            <button onClick={() =>paginate(currentPageLocation-1)} className="page-link">prev</button>        
                    </li>
                    {pageNumbers.map ( num => (
                        <li key={num} className={"page-item obj" + num} >
                            <button onClick={() =>paginate(num)} id={num} className="page-link">{num}</button>        
                        </li>
                    ))}
                    <li className="page-item">
                            <button onClick={() =>paginate(currentPageLocation+1)}className="page-link">next</button>        
                    </li>
                </ul>
            </nav>
        </div>
       
    )

}

export default Pagination;