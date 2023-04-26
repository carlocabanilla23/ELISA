import Papa from 'papaparse';

export const csv = (items, fileName, itemAmount) => {
    // the data that you want to write to the CSV file
    const data = [];
    var field = [];
    var page = fileName.split(' ').at(0);
    if(page === "Inventory"){
        field = ['SERIALNO', 'NAME', 'STATUS', 'ROOM_NO', 'LOCATION'];
        items.forEach(item => {
            data.push([items.serialno, items.name, items.status,items.roomno, items.location ]);
        });
    }else if(page === "Users"){
        field = ['SCHOOLID','FIRSTNAME', 'LASTNAME', 'EMAIL', 'ROLE'];
        items.forEach(item => {
            data.push([items.schoolID,items.firstname, items.lastname, items.email, items.role]);
        });
    }else if(page === "Location"){
        field = ['ROOM NO', 'LOCATION', 'BUILDING', 'NUMBER OF ITEMS'];
        items.forEach(item => {
            let roomItemAmount = itemAmount.filter(item => item.split('--').at(0) === items.roomno);
            data.push([items.roomno, items.location, "Otto Miller", roomItemAmount[0].split('--').at(1)]);
        });
    }else if(page === "Room" || page === "Storage"){
        field = ['SERIALNO', 'NAME', 'STATUS', 'TYPE', 'MODEL'];
        items.forEach(item => {
            data.push([items.serialno, items.name, items.status,items.type, items.model ]);
        });
    }else if(page === "Assigned"){
        field = ['SERIALNO', 'NAME', 'ASSIGN_TO', 'ROOM_NO', 'LOCATION'];
        items.forEach(item => {
            data.push([items.serialno, items.name, items.assignedto,items.roomno, items.location ]);
        });
    }else if(page === "Unassigned"){
        field = ['SERIALNO', 'NAME', 'TYPE', 'MODEL', 'CONDITION'];
        items.forEach(item => {
            data.push([items.serialno, items.name, items.type,items.model, items.condition ]);
        });
    }else if(page === "Inventory_Report"){
        field = ['TYPE', 'MODEL', 'COST($)', 'QUANTITY', 'TOTAL($)'];
        items.forEach(item => {
            let values = item.split('-');
            data.push([values.at(0),values.at(1),values.at(2),values.at(3),values.at(4)]);
        })
    }else if(page === "User_Report"){
        field = ['ROLE', 'STATUS', 'QUANTITY',];
        items.forEach(item => {
            let values = item.split('-');
            data.push([values.at(0),values.at(1),values.at(2)]);
        });
    }else if(page === "Reservation_Report"){
        field = (['STATUS', 'QUANTITY']);
        items.forEach(item => {
            let values = item.split('-');
            data.push([values.at(0), values.at(1)]);
        })
    }else if(page === "Order"){
        fileName = localStorage.getItem('name') + ' Reservation History';
        field = (['DATE', 'RESERVATION NO', 'ORDER STATUS']);
        items.forEach(item => {
            data.push([item.requestdate, item.reservationno, item.status]);
        });
    }
    // generate the CSV file
    const csv = Papa.unparse({
        fields: field,
        data: data,
    });

    // the CSV file
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.target = '_blank';
    a.download = fileName + '.csv';
    document.body.appendChild(a);
    return a.click();
}