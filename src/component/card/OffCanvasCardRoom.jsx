import { API } from 'aws-amplify';
import { useState } from 'react';

const OffCanvasCardRoom = ({qrcode}) => {
    
    return (
        <>
         <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel"></h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
          <div className="offcanvas-body">
            <div id="qrcode">
                {qrcode}
            </div>

           
        </div>
      </div>
            
        </>
    );
}

export default OffCanvasCardRoom;