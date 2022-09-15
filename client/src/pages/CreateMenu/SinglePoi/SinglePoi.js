import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import Logout from "../../../components/Logout/Logout";
import AlertBar from "../../../components/AlertBar/AlertBar";
import axios from "axios";
import "./SinglePoi.css";

function SinglePoi() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const alertBarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [img, setImg] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (e) => {
    setImg({
      ...img,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const addPoiHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("poiText", details);
    formData.append("hashtag", tags);
    formData.append("latitude", lat);
    formData.append("longitude", long);
    formData.append("counter", 0);
    formData.append("poiImg", img.file);
    formData.append("adminId", authState.id);

    await axios.post("http://localhost:4000/poi", formData).then((response) => {
      setTitle("");
      setDetails("");
      setTags("");
      setLat("");
      setLong("");
      setImg({
        ...img,
        file: [],
        filepreview: null,
      });
      alertBarRef.current.show();
      setTimeout(() => {
        navigate("/home");
      }, 2500);
    });
  };

  const alertBarType = {
    success: "success",
    fail: "fail",
  };

  return (
    <div className="singlePoiContainer">
      <Logout />
      <AlertBar
        ref={alertBarRef}
        message="You successfully created a new POI!"
        type={alertBarType.success}
      />
      <h1>Create a single POI</h1>
      <div className="singlePoiContentContainer">
        <form
          onSubmit={addPoiHandler}
          encType="multipart/form-data"
          className="singlePoiContainerLeftSide"
        >
          <p>Name of the POI</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <p>Describe your POI!</p>
          <textarea
            rows={6}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
          <p>Hashtag</p>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          <div className="poiCoordSection">
            <p>Latitude</p>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
            />
            <p>Longitude</p>
            <input
              type="text"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              required
            />
          </div>
          <div className="poiImgInputContainer">
            <input
              label="Choose image"
              type="file"
              multiple={false}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="poiButtonContainer">
            <button type="submit">Add new POI</button>
          </div>
        </form>
        <div className="singlePoiContainerRightSide">
          <div className="singlePoiImgPreviewContainer">
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

export default SinglePoi;
