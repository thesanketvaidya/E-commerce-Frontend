import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

function AccountInfo(props) {
  var [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  var [user,setUser]=useState({});
  useEffect(()=>{

    fetch(backendUrl + "/customer-management/users/email/"+localStorage.getItem("username"), {method:"GET",
  headers:{
    "Authorization": "Bearer " + localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
  }})
    .then((response) => {
     
      return response.json();
    })
    .then((data) => {
      document.getElementById("firstname").value=data.firstName
      document.getElementById("lastname").value=data.lastName
      document.getElementById("email").value=data.email
      document.getElementById("password").value=data.password
      document.getElementById("mobile").value=data.mobile
      document.getElementById("address").value=data.address
      document.getElementById("role").value=data.role
      document.getElementById("role").readOnly=true
      document.getElementById("email").readOnly=true
      console.log(data)
      setUser(data)
      setErrMsg("");
    })
    .catch((err) => {
      setErrMsg("Error Updating User!");
    });

  },[])

  function getData(event) {
    event.preventDefault();
    var data = {
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
      email: event.target.email.value,
      password: event.target.password.value,
      mobile: event.target.mobile.value,
      address: event.target.address.value,
      role: event.target.role.value,
    };
    console.log(data);

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   // body: JSON.stringify({ title: 'React POST Request Example' })
    //   body: JSON.stringify(data),
    // };

   
  }

  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  return (
    <div className="container" style={{ width: "40%", paddingTop: "5%" }}>
      <h2 style={{ color: "red" }}>{errMsg}</h2>
      <form onSubmit={getData} className="row row-cols-1 gy-4 justify-content-center">
        <div className="col">
          <input
            type="text"
            name="firstname"
            id="firstname"
            class="form-control"
            placeholder="First Name"
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="lastname"
            id="lastname"
            class="form-control"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="col">
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="col">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>

        <div className="col">
          <input
            type="text"
            name="mobile"
            id="mobile"
            class="form-control"
            placeholder="Mobile No."
            pattern="^[0-9]{10}$"
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="address"
            id="address"
            class="form-control"
            placeholder="Address"
            required
          />
        </div>

        <div className="col form-group">
          <input className="form-control" id="role" name="role" type="text"/>
        </div>

        <div  className="col ">
          <button className="btn btn-primary me-5">Update</button>
          <Link to="/" className="btn btn-dark me-5">Home</Link>
        </div>
      </form>
    </div>
  );
}

export default AccountInfo;
