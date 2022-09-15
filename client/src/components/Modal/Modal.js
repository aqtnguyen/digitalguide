import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import "./Modal.css";

function Modal({ setOpenModal, deleteId, updatedList, option }) {
  const { authState } = useContext(AuthContext);

  const deleteOption = (deleteId) => {
    if (option === "deleteTour") {
      axios
        .delete(`http://localhost:4000/tour/${authState.id}/${deleteId}`)
        .then(() => {
          updatedList(true);
          setOpenModal(false);
        })
        .catch((error) => console.log(error));
      axios
        .put(`http://localhost:4000/poi/removepoi/${deleteId}`, {
          tourId: null,
          tourTitle: null,
        })
        .then((response) => {
          console.log(response);
          updatedList(true);
          setOpenModal(false);
        })
        .catch((error) => console.log(error));
      axios
        .delete(`http://localhost:4000/img/tourimg/${deleteId}`)
        .then(() => {
          updatedList(true);
          setOpenModal(false);
        })
        .catch((error) => console.log(error));
    } else if (option === "deletePoi") {
      axios
        .delete(`http://localhost:4000/poi/${authState.id}/${deleteId}`)
        .then(() => {
          updatedList(true);
          setOpenModal(false);
        })
        .catch((error) => console.log(error));
      axios
        .delete(`http://localhost:4000/img/poiimg/${deleteId}`)
        .then(() => {
          updatedList(true);
          setOpenModal(false);
        })
        .catch((error) => console.log(error));
    } else if (option === "deleteTourImg") {
      axios
        .delete(`http://localhost:4000/img/tourimg/${deleteId}`)
        .then(() => {
          updatedList(true);
          setOpenModal(false);
        })
        .catch((error) => console.log(error));
    } else if (option === "deletePoiImg") {
      axios
        .delete(`http://localhost:4000/img/poiimg/${deleteId}`)
        .then(() => {
          updatedList(true);
          setOpenModal(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div
      className="modalBackground"
      onClick={() => {
        setOpenModal(false);
      }}
    >
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="body">
          <p>Are you sure you want to delete this?</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteOption(deleteId);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
