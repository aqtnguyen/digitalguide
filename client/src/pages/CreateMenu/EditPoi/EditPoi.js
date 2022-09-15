import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertBar from "../../../components/AlertBar/AlertBar";
import Logout from "../../../components/Logout/Logout";
import axios from "axios";
import "./EditPoi.css";

function EditPoi() {
  let { id } = useParams();
  const navigate = useNavigate();
  const alertBarRef = useRef(null);
  const [tourTitle, setTourTitle] = useState("");
  const [tourId, setTourId] = useState(0);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [img, setImg] = useState({
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/poi/poiDetail/${id}`)
      .then((response) => {
        setTourTitle(response.data[0].tourTitle);
        setTourId(response.data[0].tourId);
        setTitle(response.data[0].title);
        setDetails(response.data[0].poiText);
        setTags(response.data[0].hashtag);
        setLat(response.data[0].latitude);
        setLong(response.data[0].longitude);
        setCurrentImg(response.data[0].poiImg);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    setImg({
      ...img,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const alertBarType = {
    success: "success",
    fail: "fail",
  };

  const editPoiHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = {
      title: title,
      poiText: details,
      hashtag: tags,
      latitude: lat,
      longitude: long,
      tourTitle: tourTitle,
      tourId: tourId,
    };
    formData.append("imgTitle", img.file);
    let date = new Date();
    const imgUpdate = {
      poiImg:
        `${date.getDate()}` +
        `${date.getMonth() + 1}` +
        `${date.getFullYear()}` +
        "-" +
        img.file.name,
    };

    if (img.file.name !== undefined) {
      await axios
        .post("http://localhost:4000/img", formData)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      await axios
        .put(`http://localhost:4000/poi/${id}`, imgUpdate)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }

    await axios
      .put(`http://localhost:4000/poi/${id}`, data)
      .then((response) => {
        console.log(response);
        setTitle("");
        setDetails("");
        setTags("");
        setLat("");
        setLong("");
        alertBarRef.current.show();
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="poiContainer">
      <Logout />
      <AlertBar
        ref={alertBarRef}
        message="Task completed successfully!"
        type={alertBarType.success}
      />
      <h1>Edit a POI</h1>
      <div className="poiContentContainer">
        <div className="poiLeftSide">
          <form
            onSubmit={editPoiHandler}
            encType="multipart/form-data"
            className="poiFormContainer"
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
              />
            </div>

            <div className="poiButtonContainer">
              <button type="submit">submit</button>
            </div>
          </form>
        </div>

        <div className="tourContainerRightSide">
          <div className="tourImgPreviewContainer">
            {img.filepreview !== null ? (
              <img src={img.filepreview} alt="UploadImage" />
            ) : (
              <img
                src={
                  currentImg
                    ? `http://localhost:4000/Images/${currentImg}`
                    : null
                }
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPoi;
