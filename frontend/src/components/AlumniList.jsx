import React, { useEffect, useState } from "react";
import { FaSearch, FaGithub, FaLinkedin } from "react-icons/fa";
import defaultavatar from "../assets/uploads/defaultavatar.jpg";
import alumniData from "./storage/alumini.json"; // Importing the local JSON file

const AlumniList = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Use the local JSON data instead of fetching from an API
  useEffect(() => {
    setAlumniList(alumniData);
    setFilteredAlumni(alumniData); // Initialize with all alumni
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter alumni based on the search query
  useEffect(() => {
    const filteredList = alumniList.filter(
      (alumni) =>
        alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.batch.toString().includes(searchQuery)
    );
    setFilteredAlumni(filteredList);
  }, [searchQuery, alumniList]);

  return (
    <>
      <header className="masthead">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end mb-4 page-title">
              <h3 className="text-white">Alumnus/Alumnae List</h3>
              <hr className="divider my-4" />
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-4">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="filter-field">
                      <FaSearch />
                    </span>
                  </div>
                  <input
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    type="text"
                    className="form-control"
                    placeholder="Filter name, course, batch"
                    aria-label="Filter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3 pt-2">
        {filteredAlumni.length > 0 ? (
          <div className="row">
            {filteredAlumni.map((alumni, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <center>
                    {alumni.avatar ? (
                      <img
                        src={alumni.avatar}
                        alt="avatar"
                        className="card-img-top img-fluid alimg mt-3"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={defaultavatar}
                        alt="avatar"
                        className="card-img-top img-fluid alimg mt-3"
                      />
                    )}
                  </center>
                  <div className="card-body">
                    <h5 className="card-title text-center h3">
                      {alumni.name}{" "}
                      {alumni.status === 1 && (
                        <small>
                          <i className="badge badge-primary">Verified</i>
                        </small>
                      )}
                    </h5>
                    <p className="card-text h5">
                      <strong>Email:</strong> {alumni.email}
                    </p>
                    <p className="card-text h5">
                      <strong>Course:</strong> {alumni.course}
                    </p>
                    {alumni.batch && alumni.batch !== "0000" && (
                      <p className="card-text h5">
                        <strong>Batch:</strong> {alumni.batch}
                      </p>
                    )}
                    {alumni.connected_to && (
                      <p className="card-text h5">
                        <strong>Currently working in/as:</strong>{" "}
                        {alumni.connected_to}
                      </p>
                    )}
                    <div className="text-center">
                      {alumni.github && (
                        <a
                          href={alumni.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginRight: "15px" }}
                        >
                          <FaGithub />
                        </a>
                      )}
                      {alumni.linkedin && (
                        <a
                          href={alumni.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p>{searchQuery}</p>
            <h4 className="text-info-emphasis">No Data Available</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default AlumniList;
