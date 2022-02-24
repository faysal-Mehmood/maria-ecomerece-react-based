import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../css/ProductRight.scss";
import "../css/_custom.css";
import ProductCartSlider from "./ProductCartSlider";
import { useMediaQuery } from 'react-responsive'


function Header(props) {
  const isPortrait = useMediaQuery({ query: '(orientation: landscape)' });
  const isMobile = useMediaQuery({ maxWidth: 768 });


  const { name, bread_crums, slug } = props;
    const [isCartPaneOpen, setIsCartPaneOpen] = useState(false);
  const { cartItems } = useSelector((state) => state);
  console.log(isPortrait,isMobile)
  return (
    <div className={`header sticky flex `}>
    {/* <div className={`header sticky flex ${isPortrait == true && isMobile==true ? 'borderNone' : ''}`}> */}
   
      <div className="lit flex">
        {bread_crums && (
          <Link to="/" className="item flex aic">
            <div className="header1 c000 upc">{bread_crums}</div>
            {name && <div className="ico icon-chevron-right c333" />}
          </Link>
        )}
        {name && (
          <div className="item flex aic">
            <Link to={slug} className="item flex aic">
              <div className="header2 c000 upc">{name}</div>
            </Link>
          </div>
        )}
      </div>
      <div className="rit flex aic">
        <Link to="/">
          <img src="/images/logo.png" className="img" />
        </Link>
        <button
          className="cleanbtn img bag flex aic"
          onClick={() => setIsCartPaneOpen(!isCartPaneOpen)}
          style={{ background: "url(/images/bag.png)", outline: "none" }}
        >
          {cartItems && (
            <div className=" cleanbtn qty pt12 c000">
              {cartItems.length > 0 && cartItems.length}
            </div>
          )}
        </button>
        <ProductCartSlider
          setIsCartPaneOpen={setIsCartPaneOpen}
          isCartPaneOpen={isCartPaneOpen}
        />
      </div>
    </div>
  );
}

export default Header;
