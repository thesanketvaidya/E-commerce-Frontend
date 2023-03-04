import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import CartItem from "./CartItem";
import ProductCard from "./ProductCard";

function Cart() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [products, setProducts] = useState([]);
  var [toggle, setToggle] = useState(false);
  var navigate=useNavigate();
 

  

  return (
    <div className="container-fluid my-5">
      <div className="row">
        {

String(JSON.parse(localStorage.getItem("cartProducts"))).split(",").filter(id=>id!='null').length?

        String(JSON.parse(localStorage.getItem("cartProducts"))).split(",").filter(id=>id!='null').map((id) => (
          <div className="col-3">
            <CartItem id={id} setToggle={setToggle} />
          </div>
        )):<h3 style={{margin:"auto",color:"red"}}>Cart Is Empty!</h3>}
      </div>
      <hr />
      <div className="mt-5 me-5" style={{float:"right"}}>
        <button onClick={(e)=>{
            localStorage.removeItem("cartProducts")
            setToggle(state=>!state);
            
            setTimeout(()=>{
                navigate("/");
            },2000)
        }} className="btn btn-outline-danger">Empty Cart</button>

    <Link to="/checkout" className="btn btn-success ms-5">CheckOut</Link>
      </div>
    </div>
  );
}
export default Cart;
