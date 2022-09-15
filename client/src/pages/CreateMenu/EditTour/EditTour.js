import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertBar from "../../../components/AlertBar/AlertBar";
import Logout from "../../../components/Logout/Logout";
import axios from "axios";
import "./EditTour.css";

function EditTour() {
  let { id } = useParams();
  const navigate = useNavigate();
  const alertBarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [tags, setTags] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [img, setImg] = useState({
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/tour/createdtour/${id}`)
      .then((response) => {
        setTitle(response.data[0].title);
        setDetails(response.data[0].tourText);
        setCity(response.data[0].city);
        setTags(response.data[0].hashtag);
        setCurrentImg(response.data[0].tourImg);
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

  const editTourHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = { title: title, tourText: details, city: city, hashtag: tags };
    formData.append("imgTitle", img.file);
    let date = new Date();
    const imgUpdate = {
      tourImg:
        `${date.getDate()}` +
        `${date.getMonth() + 1}` +
        `${date.getFullYear()}` +
        "-" +
        img.file.name,
    };
    const newPoiTourTitle = { tourTitle: title };

    if (img.file.name !== undefined) {
      await axios
        .post("http://localhost:4000/img", formData)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      await axios
        .put(`http://localhost:4000/tour/${id}`, imgUpdate)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }

    await axios
      .put(`http://localhost:4000/poi/edittour/${id}`, newPoiTourTitle)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    await axios
      .put(`http://localhost:4000/tour/${id}`, data)
      .then((response) => {
        alertBarRef.current.show();
        setTimeout(() => {
          navigate("/home");
        }, 3000);
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
      <h1>Edit Tour</h1>
      <AlertBar
        ref={alertBarRef}
        message="Task completed Successfully!"
        type={alertBarType.success}
      />
      <div className="tourContentContainer">
        <div className="tourContainerLeftSide">
          <form
            onSubmit={editTourHandler}
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
              />
            </div>

            <div className="tourButtonContainer">
              <button className="tourButton2" type="submit">
                Confirm
              </button>
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

export default EditTour;
