

const CreateReservationSummary = (user,reservationCart) => {
    return (<>
    
    <div className="container CreateReservationSummary">
                    <div className="row">
                        <div className="col">
                            <h1>Summary</h1>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={user.firstName} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={user.lastName} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">School  ID</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={user.schoolID} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Role</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={user.role} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Student Email</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={user.email} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Request Date</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={user.currentDate} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Return Date</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={user.returnDate} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Items Requested</label>
                        <div className="col-sm-10">
                            <ul className="list-group">
                                <li className="list-group" id="default" >N/A</li>
                                {reservationCart.map ( (res,index)=> 
                                <li className="list-group" key={index}>{res.type} - {res.model} - {res.quantity }</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    {/* <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Note</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={note} />
                        </div>
                    </div> */}
                </div>

    </>)
}

export default CreateReservationSummary;