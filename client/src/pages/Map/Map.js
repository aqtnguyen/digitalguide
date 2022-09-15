import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Map.css";
import Logout from "../../components/Logout/Logout";

function Map() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [mapObject, setMapObject] = useState([]);
  const [tourObject, setTourObject] = useState([]);
  const [initLat, setInitLat] = useState(0);
  const [initLong, setInitLong] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:4000/poi/list/${id}`).then((response) => {
      setMapObject(response.data);
      setInitLat(response.data[1].latitude);
      setInitLong(response.data[1].longitude);
    });
    axios
      .get(`http://localhost:4000/tour/createdtour/${id}`)
      .then((response) => {
        setTourObject(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // wait for map to load
  if (!isLoaded) return <div>Loading...</div>;

  const createdTour = () => {
    alert("Great, you successfully created a new tour!");
    navigate("/home");
  };

  return (
    <div className="mapContainer">
      <Logout />
      <h1>Overview Map</h1>
      <div className="mapContentContainer">
        <GoogleMap
          zoom={15}
          center={{ lat: initLat, lng: initLong }}
          mapContainerStyle={{ width: "100%", height: "55vh" }}
        >
          {mapObject.map((value, key) => {
            return (
              <Marker
                position={{ lat: value.latitude, lng: value.longitude }}
                key={key}
              />
            );
          })}
        </GoogleMap>
        {tourObject.map((value, index) => {
          return (
            <div key={index} className="mapInfoContainer">
              <div className="mapInfo">
                <p>Estimated distance:</p>
                <p>{value.distance} km</p>
              </div>
              <div className="mapInfo">
                <p>Estimated time:</p>
                <p>{value.duration} min</p>
              </div>
            </div>
          );
        })}

        <button onClick={createdTour}>Submit</button>
      </div>
    </div>
  );
}

export default Map;
