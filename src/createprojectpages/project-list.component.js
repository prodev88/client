import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./projectlist.css";

function subpost(pn, pid) {
  fetch("https://damp-spire-14492.herokuapp.com/addsub", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employeeemail: localStorage.getItem("emid"),
      projectname: pn,
      projectid: pid,
    }),
  })
    .then((res) => {
      // console.log(pn + pid);
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

const Project = (props) => {
  useEffect(() => {
    if (props.sublist.indexOf(props.project._id) === -1) {
      setbuttonvar("SUBSCRIBE");
    } else {
      setbuttonvar("UNSUBSCRIBE");
    }
  }, [props.sublist, props.project._id]);

  const [buttonvar, setbuttonvar] = useState("SUBSCRIBE");
  const toggleText = (pro) => {
    if (buttonvar === "SUBSCRIBE") {
      setbuttonvar("UNSUBSCRIBE");

      subpost(props.project.projectName, props.project._id);
    } else {
      fetch("https://damp-spire-14492.herokuapp.com/subdel/" + pro, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      setbuttonvar("SUBSCRIBE");
    }
  };
  return (
    <tr>
      <td>{props.project.projectName}</td>
      <td>{props.project.description}</td>
      <td>
        <Link to={"/edit/" + props.project._id}>EDIT</Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteProject(props.project._id);
          }}
        >
          DELETE
        </a>
        {" | "}
        <a
          href="#"
          onClick={() => {
            toggleText(props.project._id);
          }}
        >
          {buttonvar}
        </a>
      </td>
    </tr>
  );
};

export default class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this);

    this.state = { projects: [], subtablelist: [], temparr: [], onlyid: [] };
  }

  componentDidMount() {
    axios
      .get("https://damp-spire-14492.herokuapp.com/ongoing")
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(localStorage.getItem("emid") + " hii");
    fetch(
      "https://damp-spire-14492.herokuapp.com/getsub/" +
        localStorage.getItem("emid")
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log("natraj " + data);
        this.setState({ subtablelist: data });
        //console.log(this.state.subtablelist);
        for (let i = 0; i < this.state.subtablelist.length; i++) {
          this.state.temparr[i] = this.state.subtablelist[i].projectid;
        }

        // console.log(this.state.temparr);
        this.setState({ onlyid: this.state.temparr });
        // console.log(this.state.onlyid);
      });
  }

  deleteProject(id) {
    // console.log(this.state.subtablelist);
    axios
      .delete("https://damp-spire-14492.herokuapp.com/ongoing/" + id)
      .then((response) => {
        // console.log(response.data);

        fetch("https://damp-spire-14492.herokuapp.com/subdel/" + id, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        fetch("https://damp-spire-14492.herokuapp.com/task/" + id, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      });

    this.setState({
      projects: this.state.projects.filter((el) => el._id !== id),
    });
  }

  projectList() {
    return this.state.projects.map((currentproject) => {
      return (
        <Project
          project={currentproject}
          deleteProject={this.deleteProject}
          key={currentproject._id}
          sublist={this.state.onlyid}
        />
      );
    });
  }

  render() {
    return (
      <div className="prolist">
        <h3>COMPANY PROJECTS</h3>
        <hr></hr>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>PROJECTNAME</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>{this.projectList()}</tbody>
        </table>
      </div>
    );
  }
}
