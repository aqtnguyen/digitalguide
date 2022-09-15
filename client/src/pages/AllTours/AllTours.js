import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "../../components/Modal/Modal";
import Logout from "../../components/Logout/Logout";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./AllTours.css";

function AllTours() {
  const [listOfTours, setListOfTours] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentId, setCurrentId] = useState([]);
  const [remove, setRemove] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(listOfTours.length / usersPerPage);
  const sortOptions = [
    "title ascending",
    "title descending",
    "city ascending",
    "city descending",
  ];

  useEffect(() => {
    loadTourData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:4000/tour/list/${authState.id}/${value}`)
      .then((response) => {
        setListOfTours(response.data);
        setValue("");
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
    } else if (value === "city ascending") {
      column = "city";
      order = "ASC";
    } else {
      column = "city";
      order = "DESC";
    }

    return await axios
      .get(`http://localhost:4000/tour/${authState.id}/${column}/${order}`)
      .then((response) => {
        setListOfTours(response.data);
      })
      .catch((error) => console.log(error));
  };

  const loadTourData = async () => {
    return await axios
      .get(`http://localhost:4000/tour/${authState.id}`)
      .then((response) => setListOfTours(response.data))
      .catch((error) => console.log(error));
  };

  const handleReset = () => {
    loadTourData();
  };

  const deletePoi = (item) => {
    setModalOpen(true);
    setCurrentId(item.id);
  };

  if (remove) {
    setListOfTours(
      listOfTours.filter((val) => {
        return val.id !== currentId;
      })
    );
    setCurrentId(0);
    setRemove(false);
  }

  return (
    <div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          deleteId={currentId}
          updatedList={setRemove}
          option="deleteTour"
        />
      )}
      <div className="allToursContainer">
        <Logout />
        <h1>All Tours</h1>
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
                <th>City</th>
                <th>Created at</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {listOfTours.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={4}>No data found</td>
                </tr>
              </tbody>
            ) : (
              listOfTours
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.city}</td>
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
                            navigate(`/edittour/${item.id}`);
                          }}
                        />
                      </td>
                      <td>
                        <DeleteForeverIcon
                          className="icon"
                          onClick={() => {
                            deletePoi(item);
                          }}
                        />
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

export default AllTours;
