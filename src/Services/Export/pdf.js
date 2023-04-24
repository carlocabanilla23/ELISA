import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GetDateToday } from '../etc/GetDateToday';
import logo from '../../assets/icons/elisa_logo.png';

export const pdf = (items, fileName, itemAmount) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageSize = doc.internal.pageSize;
    const field = [];
    const data = [];
    var page = fileName.split(' ').at(0);
    if(page === "Inventory"){
        field.push(['SERIALNO', 'NAME', 'STATUS', 'ROOM_NO', 'LOCATION']);
        items.forEach(items => {
            data.push([items.serialno, items.name, items.status,items.roomno, items.location ]);
        });
    }else if(page === "Users"){
        field.push(['SCHOOLID','FIRSTNAME', 'LASTNAME', 'EMAIL', 'ROLE']);
        items.forEach(items => {
            data.push([items.schoolID,items.firstname, items.lastname, items.email, items.role]);
        });
    }else if(page === "Location"){
        field.push(['ROOM NO', 'LOCATION', 'BUILDING', 'NUMBER OF ITEMS']);
        items.forEach(items => {
            let roomItemAmount = itemAmount.filter(item => item.split('--').at(0) === items.roomno);
            data.push([items.roomno, items.location, "Otto Miller", roomItemAmount[0].split('--').at(1)]);
        });
    }else if(page === "Room" || page === "Storage"){
        field.push(['SERIALNO', 'NAME', 'STATUS', 'TYPE', 'MODEL']);
        items.forEach(items => {
            data.push([items.serialno, items.name, items.status,items.type, items.model ]);
        });
    }else if(page === "Assigned"){
        field.push(['SERIALNO', 'NAME', 'ASSIGN_TO', 'ROOM_NO', 'LOCATION']);
        items.forEach(items => {
            data.push([items.serialno, items.name, items.assignedto,items.roomno, items.location ]);
        });
    }else if(page === "Unassigned"){
        field.push(['SERIALNO', 'NAME', 'TYPE', 'MODEL', 'CONDITION']);
        items.forEach(items => {
            data.push([items.serialno, items.name, items.type,items.model, items.condition ]);
        });
    }
    const headerX = ((pageSize.width ? pageSize.width : pageSize.getWidth()) / 2) - ((doc.getTextWidth(fileName)) / 2);
    //Header (title + logo + printed date and by)
    doc.setFontSize(20);
    doc.text(headerX,15,fileName, {baseline: 'top'});
    doc.setFontSize(12);
    //doc.text(x,y,text)
    doc.text(175,5,localStorage.getItem('name'));
    doc.text(175,12, GetDateToday());
    //doc.addImage(src,type,x,y,width,height)
    doc.addImage(logo,'png',2,2,10,10);

    //Item table
    doc.autoTable({
        theme: 'grid',
        head: field,
        headStyles:{
            fontSize: 14,
            fillColor: '#CC5D79',
        },
        body: data,
        margin: {top: 25}
    });

    //Print page number
    var pageCount = doc.internal.getNumberOfPages();
    for(let i = 0; i < pageCount; i++){
        doc.setPage(i);
        let CurPage = doc.internal.getCurrentPageInfo().pageNumber;
        doc.setFontSize(12);
        const pageX = ((pageSize.width ? pageSize.width : pageSize.getWidth()) / 2) - ((doc.getTextWidth('' + CurPage)) / 2);
        const pageY = ((pageSize.height ? pageSize.height : pageSize.getHeight()) - 10);
        doc.text(pageX,pageY,''+ CurPage, {baseline: 'bottom'});
    }
    
    const pdf = doc.output();
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,' + btoa(pdf);
    link.download = fileName + '.pdf';
    document.body.appendChild(link);
    return link.click();
}