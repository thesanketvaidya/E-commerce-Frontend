import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";

function CartItem(props) {
  var { id } = useParams();
  var navigate = useNavigate();
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  var data = "";
  const [imgUrl, setImgUrl] = useState();
  var [count, setCount] = useState(1);
  var [product,setProduct]=useState({})
  

  const getImg = async () => {
    const response = await fetch(`data:image/jpeg;base64,${data}`);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImgUrl(base64data);
    };
  };

  useEffect(() => {
    console.log(props.id)
    fetch(
                    backendUrl + "/product-service/products/"+props.id ,
                    { method: "GET" }
                  )
                    .then((res) => {
                    //   console.log(res);
                      return res.json();
                    })
                    .then((res) => {
                      console.log(res);
                     data=res.image;
                     getImg();
                     setProduct(res);
                     var temp={
                        id:props.id,
                        title:res.title,
                        quantity:count,
                        price:res.price,
                        subTotal:parseFloat(count)*parseFloat(res.price)

                    }
                    AppCtx.checkout[props.id]=temp;
                    })
                    .catch((err) => {
                      console.log(err);
                    });



    
  }, []);

  //console.log(props)
  return (
    <div className="card">
      <Link to={"/product/" + product.id}>
        <div className="d-flex flex-row">
          <img
            style={{ height: "130px", width: "80%", margin: "auto" }}
            className="img-thumbnail  object-cover mb-3 overflow-hidden"
            src={imgUrl}
            alt=""
          />
        </div>
      </Link>
      <div className="card-body">
        <p className="card-text d-flex justify-content-between">
          <span>
            <b>{product.title}</b>
          </span>
          <span>&#8377;{product.price}</span>
        </p>
      </div>
      <div className="card-footer">
        <div style={{margin:"auto",width:"fit-content"}}>
          <button class="btn"
          onClick={(e)=>{
            setCount(count=>{
                if(count>=1)
                {
                   

                    console.log(AppCtx.checkout);
                    count=count-1;
                    var temp={
                        id:props.id,
                        title:product.title,
                        quantity:count,
                        price:product.price,
                        subTotal:parseFloat(count)*parseFloat(product.price)

                    }
                    AppCtx.checkout[props.id]=temp;
                    
                    return count;
                }
                
                    
                else
                {
                    delete AppCtx.checkout[props.id]
                    return 0    
                }
                    
            })
          }}
          >
            <i class="fa fa-minus"></i>
          </button>{" "}
          {count}
          <button class="btn"
          onClick={(e)=>{
            
            setCount(count=>{
                
                console.log(AppCtx.checkout);
                count=count+1
                var temp={
                    id:props.id,
                    title:product.title,
                    quantity:count,
                    price:product.price,
                    subTotal:parseFloat(count)*parseFloat(product.price)
    
                }
                AppCtx.checkout[props.id]=temp;
                return count;
            })
          }}>
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
