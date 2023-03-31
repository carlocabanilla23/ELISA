import { API } from 'aws-amplify';

{/* <div className="col"> {reservation.reservationno} </div>
<div className="col"> {reservation.summary} </div>
<div className="col"> {reservation.status} </div>
<div className="col"> {reservation.requestby} </div>
<div className="col"> {reservation.approvedby} </div>
<div className="col"> {reservation.requestdate} </div>
<div className="col"> {reservation.returndate} </div> */}

function CreateTestReservation (e) {

    const items = [
        ["tester",2],
        ["multimeter",5],
        ["voltmeter", 12]
    ]

    for ( let i = 0 ; i < e; i++) {
        API.post("reservationapi","/reservations/", {
            body : {
            reservationno : "clone"+i,
            summary : "proto"+i,
            status : "Professor",
            requestby : "00000000"+i,
            approvedby : "clone"+i+"@spu.edu",
            requestdate : "00000000",
            returndate : "password"+1,
            itemrequested : items
            }
        });
    }
}

export default CreateTestReservation;