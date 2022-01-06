import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import mod from "./server";
function ViewTask() {
  const location = useLocation();
  const sub = location.state;
  const [tasks_arr, settasks_arr] = useState([]);
  useEffect(() => {
    // console.log("/tasks/" + sub.projectid);
    fetch("/tasks/" + sub.projectid)
      .then((response) => response.json())
      .then((data) => {
        settasks_arr(data);
        // console.log(tasks_arr);
        // console.log("avc");
      });
  }, []);
  // function doquery(emp_email) {
  //   return new Promise(function (resolve, reject) {
  //     fetch("/users/" + emp_email)
  //       //.then((response) => response.json())
  //       .then((data) => {
  //         //user_row = "efg";

  //         console.log("nekha" + JSON.stringify(data));
  //         resolve({ data });
  //       })
  //       .catch((err) => {
  //         return reject(err);
  //       });
  //   });
  // }

  function TaskList() {
    //const [user_row, setUser_row] = useState("");
    //let user_row = "";
    return tasks_arr.map((currenttask) => {
      // console.log(tasks_arr);

      fetch("/users/" + currenttask.emp_email)
        .then((response) => response.json())
        .then((data) => {
          //setUser_row(data);
          //user_row = data;
        });
      const aa = currenttask.createdAt;
      const bb = new Date(aa).toLocaleDateString();
      return (
        <tr>
          <td>{"user_row"}</td>
          <td>{bb}</td>
          <td>{currenttask.task_description}</td>
          <td>{currenttask.task_duration}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h1 class="mb-4">{sub.projectname} </h1>
      <h1 class="mb-4">All tasks</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Employee Name</th>
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
export default ViewTask;
