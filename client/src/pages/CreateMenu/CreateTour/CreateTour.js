import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import Logout from "../../../components/Logout/Logout";
import "./CreateTour.css";
import AlertBar from "../../../components/AlertBar/AlertBar";

function CreateTour() {
  const alertBarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState({
    file: [],
    filepreview: null,
  });
  const [listOfTours, setListOfTours] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setImg({
      ...img,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const addTourHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("tourText", details);
    formData.append("city", city);
    formData.append("hashtag", tags);
    formData.append("counter", 0);
    formData.append("tourImg", img.file);
    formData.append("adminId", authState.id);

    await axios
      .post("http://localhost:4000/tour", formData)
      .then((response) => {
        navigate(`/tourcontent/${response.data.id}`);
      })
      .catch((error) => console.log(error));
  };

  const createTourButton = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("tourText", details);
    formData.append("city", city);
    formData.append("hashtag", tags);
    formData.append("counter", 0);
    formData.append("tourImg", img.file);
    formData.append("adminId", authState.id);

    await axios
      .post("http://localhost:4000/tour", formData)
      .then((response) => {
        setListOfTours([...listOfTours, response.data]);
        alertBarRef.current.show();
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      })
      .catch((error) => console.log(error));
  };

  const alertBarType = {
    success: "success",
    fail: "fail",
  };

  return (
    <div className="tourContainer">
      <Logout />
      <AlertBar
        ref={alertBarRef}
        message="You successfully created a new Tour!"
        type={alertBarType.success}
      />
      <h1>Create a new Tour</h1>
      <div className="tourContentContainer">
        <div className="tourContainerLeftSide">
          <form
            onSubmit={addTourHandler}
            encType="multipart/form-data"
            className="tourFormContainer"
          >
            <p>Name of the Tour</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <p>Describe your tour!</p>
            <textarea
              rows={9}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />

            <p>City</p>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <p>Hashtag</p>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />

            <div className="tourInputContainer">
              <input
                label="Choose image"
                type="file"
                multiple={false}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="tourButtonContainer">
              <button className="tourButton1" onClick={createTourButton}>
                Finish
              </button>
              <button className="tourButton2" type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
        <div className="tourContainerRightSide">
          <div className="tourImgPreviewContainer">
            {!img.filepreview && <p>Image Preview</p>}
            {img.filepreview !== null ? (
              <img src={img.filepreview} alt="UploadImage" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTour;
