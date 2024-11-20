import React, { useEffect, useState } from "react";
import { FaSearch, FaGithub, FaLinkedin } from "react-icons/fa";
import defaultavatar from "../assets/uploads/defaultavatar.jpg";
import alumniData from "./storage/alumini.json";

const AlumniList = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    setAlumniList(alumniData);
    setFilteredAlumni(alumniData);
  }, []);

  const departments = [...new Set(alumniList.map((alumni) => alumni.dept))];

  const continents = [...new Set(alumniList.map((alumni) => alumni.continent))];

  const countries = selectedContinent && [
    ...new Set(
      alumniList
        .filter((alumni) => alumni.continent === selectedContinent)
        .map((alumni) => alumni.country)
    ),
  ];

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let filtered = alumniList;

    if (selectedDept) {
      filtered = filtered.filter((alumni) => alumni.dept === selectedDept);
    }

    if (selectedContinent) {
      filtered = filtered.filter(
        (alumni) => alumni.continent === selectedContinent
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(
        (alumni) => alumni.country === selectedCountry
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alumni.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alumni.batch.toString().includes(searchQuery)
      );
    }

    setFilteredAlumni(filtered);
  }, [
    searchQuery,
    selectedDept,
    selectedContinent,
    selectedCountry,
    alumniList,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDept("");
    setSelectedContinent("");
    setSelectedCountry("");
  };

  return (
    <>
      <header className="masthead">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end mb-4 page-title">
              <h3 className="text-white">Alumni List</h3>
              <hr className="divider my-4" />
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-4">
        <div className="card p-3">
          <div className="row">
            <div className="col-md-4">
              <h5>Departments</h5>
              <div className="btn-group-vertical w-100">
                {departments.map((dept, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      selectedDept === dept
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectedDept(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <h5>Continents</h5>
              <div className="btn-group-vertical w-100">
                {continents.map((continent, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      selectedContinent === continent
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => setSelectedContinent(continent)}
                  >
                    {continent}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <h5>Country</h5>
              <select
                className="form-control"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                disabled={!selectedContinent}
              >
                <option value="">Select a Country</option>
                {countries &&
                  countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-right">
            <button className="btn btn-danger" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumni, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <img
                    src={alumni.avatar || defaultavatar}
                    alt="avatar"
                    className="card-img-top img-fluid"
                    style={{ height: "150px", objectFit: "contain" }} // Adjusted height
                  />
                  <div className="card-body">
                    <h5 className="card-title">{alumni.name}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {alumni.email}
                    </p>
                    <p className="card-text">
                      <strong>Course:</strong> {alumni.course}
                    </p>
                    <p className="card-text">
                      <strong>Batch:</strong> {alumni.batch}
                    </p>
                    <div className="text-center">
                      {alumni.github_url && (
                        <a
                          href={alumni.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-dark mr-2"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {alumni.linkedin_url && (
                        <a
                          href={alumni.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h4 className="text-muted">
                No alumni found for the selected filters.
              </h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlumniList;
