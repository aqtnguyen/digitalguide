import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "../../../../components/Modal/Modal";
import axios from "axios";
import "./AddTourImg.css";
import AlertBar from "../../../../components/AlertBar/AlertBar";
import Logout from "../../../../components/Logout/Logout";

function AddTourImg() {
  let { id } = useParams();
  const alertBarRef = useRef(null);
  const [img, setImg] = useState({
    file: [],
    filepreview: null,
  });

  const [imgObject, setImgObject] = useState([]);
  const [currentId, setCurrentId] = useState([]);
  const [remove, setRemove] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/img/tour/${id}`)
      .then((response) => {
        setImgObject(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    setImg({
      ...img,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const saveImg = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("imgTitle", img.file);
    formdata.append("tourId", id);

    await axios
      .post("http://localhost:4000/img", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setImgObject([...imgObject, response.data]);
        alertBarRef.current.show();
        setImg({
          ...img,
          file: [],
          filepreview: null,
        });
      })
      .catch((error) => console.log(error));
  };

  const deleteImg = (item) => {
    setModalOpen(true);
    setCurrentId(item.id);
  };

  if (remove) {
    setImgObject(
      imgObject.filter((val) => {
        return val.id !== currentId;
      })
    );
    setCurrentId(0);
    setRemove(false);
  }

  const alertBarType = {
    success: "success",
    fail: "fail",
  };

  return (
    <div className="addTourImgContainer">
      <Logout />
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          deleteId={currentId}
          updatedList={setRemove}
          option="deleteTourImg"
        />
      )}
      <h1>Add additional Tour Images</h1>
      <AlertBar
        ref={alertBarRef}
        message="Task completed Successfully!"
        type={alertBarType.success}
      />
      <div className="addTourImgContentContainer">
        <div className="addTourImgLeftSide">
          <form onSubmit={saveImg} className="addTourImgForm">
            <div className="addTourImgFormInput">
              <label className="text-white">Select Image :</label>
              <input type="file" onChange={handleInputChange} />
            </div>
            <div className="addTourImgFormButton">
              <button type="submit"> Save </button>
            </div>
          </form>

          <div className="addTourImgFormImgPreview">
            {!img.filepreview && <p>Image Preview</p>}
            {img.filepreview !== null ? (
              <img src={img.filepreview} alt="UploadImage" />
            ) : null}
          </div>
        </div>
        <div className="addTourImgRightSide">
          {imgObject.map((item, index) => {
            return (
              <div className="addTourImgTitleContainer" key={index}>
                {item.imgTitle}
                <div className="addTourImgIcon">
                  <DeleteForeverIcon
                    className="icon"
                    onClick={() => {
                      deleteImg(item);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddTourImg;
