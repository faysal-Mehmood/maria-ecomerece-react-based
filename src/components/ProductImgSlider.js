import React, { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ProductImgSlideShow from "./ProductImgSlideShow";

const ProductImgSlider = ({
  isPaneOpenRight,
  setIsPaneOpenRight,
  imageSrc,
  frontImage,
  backImage,
}) => {
  const [zoomerWidth,setzoomerWidth]=useState(false);
  function closefun(){
    setIsPaneOpenRight(!isPaneOpenRight);
    setzoomerWidth(false)
  }
  return (
    <SlidingPane
      isOpen={isPaneOpenRight}
      from="left"
      className={zoomerWidth ? "zoomerPane":"imgPane"}
      onRequestClose={() => setIsPaneOpenRight(!isPaneOpenRight)}
    
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            outline: "none",
            fontSize: "1.6rem",
            padding: 0,
            marginRight: "auto",
            marginBottom: ".3rem",
            color: "black"
          }}
          onClick={closefun}
        >
          &times;
        </button>
        <ProductImgSlideShow frontImage={frontImage} backImage={backImage} setzoomerWidth={setzoomerWidth}/>
      </div>
    </SlidingPane>
  );
};
export default ProductImgSlider;
