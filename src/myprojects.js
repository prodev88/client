import axios from "axios";
//import e from "express";
import React, { useState, useEffect } from "react";
import AddTask from "./addtask.js";
import { useNavigate } from "react-router-dom";
import "./myproject.css";
import { Link } from "react-router-dom";

function Myproject() {
  const nav = useNavigate();
  const [sublist, setsublist] = useState([]);
  useEffect(() => {
    fetch(
      "https://damp-spire-14492.herokuapp.com/getsub/" +
        localStorage.getItem("emid")
    )
      .then((response) => response.json())
      .then((data) => {
        setsublist(data);
      });
  }, []);
  function onclickadd() {
    <Link to="/add/task"></Link>;
  }

  return (
    <div className="subtemp">
      <h1>CURRENT WORKING PROJECTS</h1>
      <hr></hr>
      {sublist.map((sub, index) => {
        if (sub.employeeemail === localStorage.getItem("emid")) {
          return (
            <div class="card mt-4">
              <div class="card-body">
                <h4 class="card-title">{sub.projectname}</h4>
                <form>
                  <Link to="/add/task" state={sub}>
                    <button
                      type="submit"
                      class="btn btn-danger"
                      onClick={onclickadd}
                    >
                      Add Task
                    </button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link to="/view/task" state={sub}>
                    <button type="submit" class="btn btn-danger">
                      View Task
                    </button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                </form>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Myproject;
