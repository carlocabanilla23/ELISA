import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';
import { createRoot } from 'react-dom/client';
import logo from '../icons/spu-logo.png';


export const Generate  = (e) => {
    console.log(e);
    const path = "https://dev.djno0p84ctg6u.amplifyapp.com/ViewItemInfo/"+ e;
    console.log(path);
    return(
        <QRCodeSVG
        value={path}
        size={350}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
            src: "https://spu.edu/style-guide/assets/branding/logo-spu-flame-legacy-maroon.png",
            x: undefined,
            y: undefined,
            height: 100,
            width: 100,
            excavate: true,
        }}
        />
    )
}
