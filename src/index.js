import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Signup from "./signUP";
import Newpage from "./homepage";
import Signin from "./signIN(homepage)";
import Mainupcom from "./upcomingprojectspage/mainupcoming";
import CreateProject from "./createprojectpages/create-project.component";
import ProjectList from "./createprojectpages/project-list.component";
import Myproject from "./myprojects";
import EditProject from "./createprojectpages/edit-project.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import AddTask from "./addtask";
import ViewTask from "./viewtask";
import MyTask from "./MyTask";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/new" element={<Newpage></Newpage>}></Route>
        <Route path="/upcoming" element={<Mainupcom />}></Route>
        <Route path="/myprojects" element={<Myproject />}></Route>
        {/* <Route path="/ongoingproject" element={<ProjectList />}></Route> */}
        <Route path="/createproject" element={<CreateProject />}></Route>
        <Route path="/edit/:id" element={<EditProject />}></Route>
        <Route path="/add/task" element={<AddTask />}></Route>
        <Route path="/view/task" element={<ViewTask />}></Route>
        <Route path="/my/tasks" element={<MyTask />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
