import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data";
import { Dialog, generateID } from "../core";
import { useDispatch } from "react-redux";
import "../css/dialog.css";
import { useMediaQuery } from 'react-responsive'



function Home() {
   var condition =false;
  // const isPortrait = useMediaQuery({ orientation: 'landscape' })
  const iphone4 = useMediaQuery({ minWidth: 320, maxWidth:480,orientation: 'landscape'});
  const iphone5 = useMediaQuery({ minWidth: 375, maxWidth:667,orientation: 'landscape'});
  const iphone678 = useMediaQuery({ minWidth: 375, maxWidth:667,orientation: 'landscape'});
  const iphoneX = useMediaQuery({ minWidth: 375, maxWidth:812,orientation: 'landscape'});
  const ipad = useMediaQuery({ minWidth: 768, maxWidth:1024,orientation: 'landscape'});
  const iphonemax = useMediaQuery({ minWidth: 414, maxWidth:896,orientation: 'landscape'});
  const samsung_galaxy = useMediaQuery({ minWidth: 320, maxWidth:640,orientation: 'landscape'});
  // console.log(iphone4,iphone5,iphone679,iphoneX,ipad,iphonemax,samsung_galaxy )

  // const isMobile = useMediaQuery({ maxWidth: 768 });

  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState({ _id: 0 });
  
  // Here I get the product (id), to swap images for one product at a time, but in below src is same.
  const imageBChange = (id) => {
    setProductImage({ _id: id });
  };
  const imageFChange = () => {
    setProductImage({ _id: 0 });
  };
  
  if(iphone4==true){
    condition =true;
  }else if(iphone5==true){
    condition =true;
  }else if(iphone678==true){
    condition =true;
  }else if(iphoneX==true){
    condition =true;
  }else if(iphonemax==true){
    condition =true;
  }else if(ipad==true){
    condition =true;
  }else if(samsung_galaxy==true){
    condition =true;
  }
  // console.log(condition);
  // if(iphone4==true || iphone5==true || iphone678==true || iphoneX==true || ipad==true || iphonemax==true || samsung_galaxy==true){
  //   console.log("hi i am hi  am farhadkha")
  // }

  var count=0;
  return (
    <React.Fragment>
      <Header bread_crums="HANUKKA82" />
      {/* _addCart={_addCart} */}
      <div className={`home-p flex aic`}>
      {/* <div className={`home-p flex aic ${isPortrait == true && isMobile==true  ? 'borderNone' : ''}`}> */}
        {data.map((item) => {
          count=count+1;
          const frontImage = `../images/${item.front_image}`;
          const backImage = `../images/${item.back_image}`;
          return (
            <Link to={`/product/${item.slug}`} className={`lit ${condition==true  && count==data.length ? 'borderRight' : ''}`}>
              {productImage._id === item._id ? (
                <img
                  src={backImage}
                  onMouseLeave={() => imageFChange()}
                  className="img"
                />
              ) : (
                <img
                  src={frontImage}
                  onMouseEnter={() => imageBChange(item._id)}
                  className="img"
                />
              )}
            </Link>
          );
        })}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
