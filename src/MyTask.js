import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
function MyTask() {
  const location = useLocation();
  const sub = location.state;
  //const pid=sub.projectid;
  const [mytask, setmytask] = useState([]);
  useEffect(() => {
    // console.log("ece " + sub.projectid + " " + localStorage.getItem("emid"));
    axios
      .get("https://damp-spire-14492.herokuapp.com/my/tasks", {
        params: {
          mail: localStorage.getItem("emid"),
          projectid: sub.projectid,
        },
      })
      .then((response) => {
        //.then((data) => {
        // console.log("abcd " + response);
        setmytask(response);
        // console.log(response.json);
      });
  }, []);
  function TaskList() {
    return mytask.map((currenttask) => {
      return (
        <tr>
          <td>{currenttask.createdAt}</td>
          <td>{currenttask.task_description}</td>
          <td>{currenttask.task_duration}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <h1 class="mb-4">{sub.projectname} </h1>
      <h1 class="mb-4">My tasks</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Created At</th>
            <th>Task</th>
            <th>Task Duration</th>
          </tr>
        </thead>
        <tbody>{TaskList()}</tbody>
      </table>
    </div>
  );
}
export default MyTask;
