import React from 'react'
import "./QRPreview.css";

function QRPreview({ setOpenQr, code, qrName }) {

console.log(code)
  return (
    <div className="qrPreviewBackground">
      <div className="qrPreviewContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
                setOpenQr(false);
            }}
          >
            X
          </button>
        </div>
        <p>{qrName}</p>
        <div className="qrImgPreview">
            <img src={code} />
        </div>
        <div className="qrDownloadSection">
          <a href={code} download={qrName}>Download</a>
        </div>
      </div>
    </div>
  )
}

export default QRPreview