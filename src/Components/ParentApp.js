import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AppContext from "../Context/Context";
import Login from "./Login";
import Register from "./Register";
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import ProductList from './ProductList';
import AccountInfo from "./AccountInfo";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payment from "./Payment";
import MyOrders from "./MyOrders";

function ParentApp(props)
{
  function test()
  {
    console.log("Yosh");
  } 
    var [isLoggedIn,setIsLoggedIn]=useState(false);
    var [category,setCategory]=useState("All Products");
    return (
        <AppContext.Provider value={{
            backendUrl: "http://localhost:8072", isLoggedIn: isLoggedIn,
            setIsLoggedIn: setIsLoggedIn
            ,
            category:category,
            setCategory:setCategory,
            test:test,
            checkout:{
              id:{
                id:"props.id",
                title:"product.title",
                quantity:"count",
                price:"product.price",
                subTotal:"parseFloat(count)*parseFloat(product.price)"
              }
            },
            totalAmount:0
           
          }}>
            
            <BrowserRouter>
            <App test={test}/>
              <Routes>
              {/* AccountInfo */}
                <Route path="/signin" element={<Login />}></Route>
                
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/signup" element={<Register />}></Route>
                <Route path="/accountInfo" element={<AccountInfo />}></Route>
               
                <Route path="/" element={<ProductList/>} />
                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route path="/product/update/:id" element={<UpdateProduct/>}/>
                <Route path="/product/add" element={<AddProduct/>}/>
                <Route path="/product/delete/:id" element={<DeleteProduct/>}/>
                <Route path="/checkout" element={<Checkout />}></Route>
                <Route path="/payment" element={<Payment />}></Route>
                <Route path="/myorders" element={<MyOrders />}></Route>
              </Routes>
            
            </BrowserRouter>
          </AppContext.Provider>
    );

}

export default ParentApp;