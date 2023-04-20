import { useNavigate } from "react-router-dom";


const ContentHeader  = ({title}) => {
    
    const navigate = useNavigate();
    return (
        <div className="CreateReservationHeader" id="CreateReservationHeader">
        <div className="create-reservation-content">
            <div>
                <button onClick={ e => {navigate(-1)}} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                <label>{title}</label> 
            </div>
        </div>
        </div>
    );
}

export default ContentHeader;