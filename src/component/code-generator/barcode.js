const Barcode = require('react-barcode');


export const GenerateBarcode  = (e) => {
    return(
        <Barcode value={e} />
    )
}