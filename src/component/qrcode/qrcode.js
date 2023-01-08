import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';
import { createRoot } from 'react-dom/client';
import logo from '../icons/spu-logo.png';


export const Generate  = (e) => {
    const path = "http://localhost:3000/ViewItemInfo/"+ e;
    return(
        <QRCodeSVG
        value={path}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
            src: "https://spu.edu/style-guide/assets/branding/logo-spu-flame-legacy-maroon.png",
            x: undefined,
            y: undefined,
            height: 48,
            width: 48,
            excavate: true,
        }}
        />
    )
}
