import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function AddTask() {
  const location = useLocation();
  const sub = location.state;
  //console.log(JSON.stringify(sub));
  const [task_description, setTask_des] = useState("");
  const [task_duration, setTask_dur] = useState("");
  const nav = useNavigate();
  function onsubmit(e) {
    // console.log("submit option");
    e.preventDefault();

    fetch("https://damp-spire-14492.herokuapp.com/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: sub.projectid,
        task_description: task_description,
        //createdAt: "createdat",
        task_duration: task_duration,
        emp_email: sub.employeeemail,
      }),
    }).then((res) => {
      // console.log(res);
    });
    nav("/new");
  }

  function onchangeTaskDes(e) {
    setTask_des(e.target.value);
  }
  function onchangeTaskDur(e) {
    setTask_dur(e.target.value);
  }

  return (
    <div className="maindivv">
      <div className="box">
        <h1>ADD TASK</h1>
        <form onSubmit={onsubmit}>
          <div className="grp">
            <label htmlFor="task_description">Your Task:</label>
            <input
              type="String"
              placeholder="Enter your task"
              required
              value={task_description}
              onChange={onchangeTaskDes}
            />
          </div>

          <div className="grp">
            <label htmlFor="task_duration">Task Duration:</label>
            <input
              type="String"
              placeholder="Enter the task duration"
              required
              value={task_duration}
              onChange={onchangeTaskDur}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary"
              onSubmit={onsubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddTask;
