import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../helpers/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import Modal from "../../../components/Modal/Modal";
import QRPreview from "../../../components/QRPreview/QRPreview";
import Logout from "../../../components/Logout/Logout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "qrcode";
import axios from "axios";
import "./TourContent.css";

function TourContent() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [tourObject, setTourObject] = useState([]);
  const [poiObject, setPoiObject] = useState([]);
  const [searchPoi, setSearchPoi] = useState([]);
  const [edit, setEdit] = useState(true);
  const [currentId, setCurrentId] = useState([]);
  const [remove, setRemove] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [qrCodeOpen, setQrCodeOpen] = useState(false);
  const { authState } = useContext(AuthContext);

  const [tourName, setTourName] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [img, setImg] = useState({
    file: [],
    filepreview: null,
  });
  const [currentImg, setCurrentImg] = useState("");
  const [qr, setQr] = useState("");
  const [qrTitle, setQrTitle] = useState("");

  let latitude = []; // new Array();
  let longitude = [];
  let distanceResult = [];
  let durationResult = [];
  let duration;
  let distance;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/tour/createdtour/${id}`)
      .then((response) => {
        setTourObject(response.data);
        setTourName(response.data[0].title);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:4000/poi/list/${id}`)
      .then((response) => {
        setPoiObject(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:4000/poi/${authState.id}`)
      .then((response) => {
        setSearchPoi(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleInputChange = (e) => {
    setImg({
      ...img,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const addPoiHandler = async (e) => {
    e.preventDefault();

    if (edit) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("poiText", details);
      formData.append("hashtag", tags);
      formData.append("latitude", lat);
      formData.append("longitude", long);
      formData.append("counter", 0);
      formData.append("poiImg", img.file);
      formData.append("tourTitle", tourName);
      formData.append("adminId", authState.id);
      formData.append("tourId", id);

      await axios
        .post("http://localhost:4000/poi", formData)
        .then((response) => {
          setPoiObject([...poiObject, response.data]);
          setTitle("");
          setDetails("");
          setTags("");
          setLat("");
          setLong("");
          setCurrentImg("");
          setImg({
            ...img,
            file: [],
            filepreview: null,
          });
        })
        .catch((error) => console.log(error));
    } else {
      const formData = new FormData();
      const data = {
        title: title,
        poiText: details,
        hashtag: tags,
        latitude: lat,
        longitude: long,
        tourTitle: tourName,
        tourId: id,
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

      await axios
        .put(`http://localhost:4000/poi/${currentId}`, data)
        .then((response) => {
          console.log(response);
          setEdit(!edit);
          setCurrentId(0);
          setPoiObject(
            poiObject.map((val) => {
              return val.id === currentId
                ? {
                    id: val.id,
                    poiText: val.poiText,
                    hashtag: val.hashtag,
                    latitude: val.latitude,
                    longitude: val.longitude,
                    poiImg: val.poiImg,
                    tourTitle: val.tourTitle,
                    title: title,
                  }
                : val;
            })
          );
          setTitle("");
          setDetails("");
          setTags("");
          setLat("");
          setLong("");
          setCurrentImg("");
          setImg({
            ...img,
            file: [],
            filepreview: null,
          });
        })
        .catch((error) => console.log(error));

      if (img.file.name !== undefined) {
        await axios
          .post("http://localhost:4000/img", formData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));

        await axios
          .put(`http://localhost:4000/poi/${currentId}`, imgUpdate)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const editPoi = (poi) => {
    setEdit(!edit);
    setCurrentId(poi.id);

    setTitle(poi.title);
    setDetails(poi.poiText);
    setTags(poi.hashtag);
    setLat(poi.latitude);
    setLong(poi.longitude);
    setCurrentImg(poi.poiImg);
  };

  const undoneEdit = () => {
    setEdit(!edit);
    setCurrentId(0);

    setTitle("");
    setDetails("");
    setTags("");
    setLat("");
    setLong("");
    setCurrentImg("");
    setImg({
      ...img,
      file: [],
      filepreview: null,
    });
  };

  const addSearchPoi = async (poi) => {
    const formData = new FormData();

    formData.append("title", poi.title);
    formData.append("poiText", poi.poiText);
    formData.append("hashtag", poi.hashtag);
    formData.append("latitude", poi.latitude);
    formData.append("longitude", poi.longitude);
    formData.append("counter", poi.counter);
    formData.append("poiImg", poi.poiImg);
    formData.append("tourTitle", tourName);
    formData.append("adminId", poi.adminId);
    formData.append("tourId", id);
    const searchImg = { poiImg: poi.poiImg };

    await axios
      .post("http://localhost:4000/poi", formData)
      .then(async (response) => {
        setPoiObject([...poiObject, response.data]);
        await axios
          .put(`http://localhost:4000/poi/${response.data.id}`, searchImg)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const deletePoi = (poi) => {
    setModalOpen(true);
    setCurrentId(poi.id);
  };

  // paste whole network key here
  const showqr = (poi) => {
    QRCode.toDataURL(
      `exp://192.168.0.2:19000/--/poi/${poi.id}`,
      {
        width: 400,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr(url);
      }
    );
    setQrTitle(poi.title);
    setQrCodeOpen(true);
  };

  const SearchBar = ({ placeholder, data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };

    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };

    return (
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length !== 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, index) => {
              return (
                <div
                  className="dataItem"
                  key={index}
                  onClick={() => addSearchPoi(value)}
                >
                  <p>{value.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  if (remove) {
    setPoiObject(
      poiObject.filter((val) => {
        return val.id !== currentId;
      })
    );
    setCurrentId(0);
    setRemove(false);
  }

  // dont rename val props
  poiObject.map((val) => {
    return latitude.push(val.latitude), longitude.push(val.longitude);
  });

  // convert string array into number array for google
  const newLatitude = latitude.map((str) => {
    return Number(str);
  });

  const newLongitude = longitude.map((str) => {
    return Number(str);
  });

  // dont remove eslist comment!
  const calculateRoute = async (e) => {
    e.preventDefault();
    for (let i = 0; i < newLatitude.length - 1; i++) {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: newLatitude[i], lng: newLongitude[i] },
        destination: { lat: newLatitude[i + 1], lng: newLongitude[i + 1] },
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.WALKING,
      });
      distanceResult.push(results.routes[0].legs[0].distance.value);
      durationResult.push(results.routes[0].legs[0].duration.value);
    }
    distance = distanceResult.reduce((a, v) => (a = a + v), 0);
    duration = durationResult.reduce((a, v) => (a = a + v), 0);
    distance = Math.round((distance / 1000) * 100) / 100;
    duration = Math.ceil(duration / 60);
    await axios
      .put(`http://localhost:4000/tour/completetour/${id}`, {
        distance: distance,
        duration: duration,
      })
      .then(() => {
        navigate(`/map/${id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          deleteId={currentId}
          updatedList={setRemove}
          option="deletePoi"
        />
      )}
      {qrCodeOpen && (
        <QRPreview setOpenQr={setQrCodeOpen} code={qr} qrName={qrTitle} />
      )}
      <div className="poiContainer">
        <Logout />
        {edit ? <h1>Create a new POI</h1> : <h1>Edit a POI</h1>}
        <div className="poiContentContainer">
          <div className="poiLeftSide">
            <form
              onSubmit={addPoiHandler}
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
              <div className="coordHelpSection">
                <p>Dou you need help?</p>
                <a target="_" href="https://www.latlong.net/">
                  click here!
                </a>
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
                {edit && (
                  <button className="proceedButton" onClick={calculateRoute}>
                    Proceed
                  </button>
                )}
                <button type="submit">
                  {edit ? <div>Add new POI</div> : <div>Edit POI</div>}
                </button>
              </div>
            </form>
          </div>

          <div className="poiRightSide">
            <div className="poiTourTitle">
              {tourObject.map((value, index) => {
                return <p key={index}>{value.title}</p>;
              })}
            </div>

            <div className="listOfPoi">
              {poiObject.map((poi, index) => {
                return (
                  <div key={index}>
                    {edit ? (
                      <div className="poiItem">
                        {poi.title}
                        <div className="poiIcon">
                          <EditIcon
                            className="icon"
                            onClick={() => {
                              editPoi(poi);
                            }}
                          />
                          <DeleteForeverIcon
                            className="icon"
                            onClick={() => {
                              deletePoi(poi);
                            }}
                          />
                        </div>
                        <p
                          onClick={() => {
                            showqr(poi);
                          }}
                        >
                          QR Code
                        </p>
                      </div>
                    ) : (
                      <div>
                        {currentId === poi.id && (
                          <div className="undonePoiContainer">
                            <button
                              onClick={() => {
                                undoneEdit();
                              }}
                            >
                              Leave edit: {poi.title}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <SearchBar placeholder="Enter a POI..." data={searchPoi} />
            <div className="poiImgPreviewContainer">
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
    </div>
  );
}

export default TourContent;
