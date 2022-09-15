import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import ReactPaginate from "react-paginate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "../../components/Modal/Modal";
import QRPreview from "../../components/QRPreview/QRPreview";
import axios from "axios";
import "./AllPois.css";
import Logout from "../../components/Logout/Logout";

function AllPois() {
  const [listOfPois, setListOfPois] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentId, setCurrentId] = useState([]);
  const [remove, setRemove] = useState(false);
  const [qr, setQr] = useState("");
  const [qrTitle, setQrTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [qrCodeOpen, setQrCodeOpen] = useState(false);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(listOfPois.length / usersPerPage);
  const sortOptions = [
    "title ascending",
    "title descending",
    "latest",
    "oldest",
  ];

  useEffect(() => {
    loadPoiData();
  }, []);

  const loadPoiData = async () => {
    return await axios
      .get(`http://localhost:4000/poi/${authState.id}`)
      .then((response) => setListOfPois(response.data))
      .catch((error) => console.log(error));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:4000/poi/list/${authState.id}/${value}`)
      .then((response) => {
        setListOfPois(response.data);
        setValue("");
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    let column = "";
    let order = "";
    setSortValue(value);

    if (value === "title ascending") {
      column = "title";
      order = "ASC";
    } else if (value === "title descending") {
      column = "title";
      order = "DESC";
    } else if (value === "oldest") {
      column = "createdAt";
      order = "ASC";
    } else {
      column = "createdAT";
      order = "DESC";
    }

    return await axios
      .get(`http://localhost:4000/poi/${authState.id}/${column}/${order}`)
      .then((response) => {
        setListOfPois(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleReset = () => {
    loadPoiData();
  };

  const deleteTour = (item) => {
    setModalOpen(true);
    setCurrentId(item.id);
  };

  if (remove) {
    setListOfPois(
      listOfPois.filter((val) => {
        return val.id !== currentId;
      })
    );
    setCurrentId(0);
    setRemove(false);
  }

  const showqr = (item) => {
    QRCode.toDataURL(
      `exp://192.168.0.2:19000/--/poi/${item.id}`,
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
    setQrTitle(item.title);
    setQrCodeOpen(true);
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
      <div className="allToursContainer">
        <Logout />
        <h1>All POIs</h1>
        <form className="allTourSearchContainer" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a query"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="allSearchButton">
            <button className="allSearchButton1" type="submit">
              Search
            </button>
            <button className="allSearchButton2" onClick={() => handleReset()}>
              Reset
            </button>
          </div>
        </form>

        <div className="sortContainer">
          <select
            className="selectMenu"
            value={sortValue}
            onChange={handleSort}
          >
            {sortOptions.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Tour Name</th>
                <th>Created at</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>QR Code</th>
              </tr>
            </thead>
            {listOfPois.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={4}>No data found</td>
                </tr>
              </tbody>
            ) : (
              listOfPois
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.tourTitle}</td>
                      <td>
                        {item.createdAt.substring(
                          0,
                          item.createdAt.length - 14
                        )}
                      </td>
                      <td>
                        <EditIcon
                          className="icon"
                          onClick={() => {
                            navigate(`/editpoi/${item.id}`);
                          }}
                        />
                      </td>
                      <td>
                        <DeleteForeverIcon
                          className="icon"
                          onClick={() => {
                            deleteTour(item);
                          }}
                        />
                      </td>
                      <td>
                        {item.tourTitle && (
                          <p
                            className="allPoiQrCode"
                            onClick={() => {
                              showqr(item);
                            }}
                          >
                            show QR code
                          </p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllPois;
