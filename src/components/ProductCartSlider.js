import React, { useEffect, useState } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { focus, isValidEmail, generateID } from '../core';
import '../css/dialog.css';

const ProductCartSlider = ({ isCartPaneOpen, setIsCartPaneOpen }, props) => {
  //console.log(props.id)
  const [step, setStep] = useState('cart');
  //const [price,setprice] = useState('')

  const [fullname, setfullname] = useState('');
  const [streetaddress, setstreetaddress] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [postalcode, setpostalcode] = useState('');
  const [country, setcountry] = useState('');
  const [cellphone, setcellphone] = useState('');
  const [checkoutbtn, setcheckoutbtn] = useState('Ship to this address');
  const [Quantity, setquantity] = useState(1);
  const [disabled, setdisabled] = useState(false);
  const [code, setcode] = useState('');
  const [email, setemail] = useState('');
  const [items, setitems] = useState('');
  const [subtotal, setsubtotal] = useState(0);
  const dispatch = useDispatch();
  /*useEffect(() => {
       const items = JSON.parse(localStorage.getItem('shoshancartupdate'));
       setitems(items)
    },[])*/
  const { dialogID, cartItems } = useSelector((state) => state);
  //console.log(dialogID)
  useEffect(() => {
    const oldaddress = JSON.parse(
      localStorage.getItem('soshandeliverdaddress')
    );
    if (oldaddress) {
      setfullname(oldaddress.fullname);
      setstreetaddress(oldaddress.streetaddress);
      //setaddress(oldaddress.address)
      setcity(oldaddress.city);
      setstate(oldaddress.state);
      setcountry(oldaddress.country);
      setpostalcode(oldaddress.postalcode);
      setcellphone(oldaddress.cellphone);
      setemail(oldaddress.email);
    }
  }, []);

  useEffect(() => {
    // if (cartItems.length == 0) {
    //   window.__modals[dialogID].Hide();
    // }
    // console.log(cartItems);
    let calsubtotal = 0;
    cartItems.map((item) => {
      if (item.Tzcolor === 'Techelet (₪100)') {
        calsubtotal = calsubtotal + item.Quantity * (item.price + 100);
      } else {
        calsubtotal = calsubtotal + item.Quantity * item.price;
      }
      // console.log(calsubtotal);
      setsubtotal(calsubtotal.toFixed(2));
    });
  }, [cartItems]);

  const _cart = () => {
    return (
      <>
        <SlidingPane
          isOpen={isCartPaneOpen}
          from="right"
          className="slidePane"
          onRequestClose={() => setIsCartPaneOpen(!isCartPaneOpen)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <button
              style={{
                background: 'none',
                border: 'none',
                outline: 'none !important',
                fontSize: '1.6rem',
                padding: 0,
                marginLeft: 'auto',
                color: 'black',
              }}
              onClick={() => setIsCartPaneOpen(!isCartPaneOpen)}
            >
              &times;
            </button>
            {cartItems.length === 0 ? (
              <div
                className="total flex aic py-4 mt-3"
                style={{
                  borderTop: '1px solid #000',
                  borderBottom: '1px solid #000',
                }}
              >
                <div
                  className="tt subtotalZero black"
                  style={{
                    display: 'block',
                    margin: '0px auto',
                  }}
                >
                  <span>Subtotal :</span>
                  <span>
                    {' '}
                    <strong style={{ fontWeight: 400 }} className="sign-cart">
                      &#8362;
                    </strong>
                    0.00
                  </span>
                </div>
              </div>
            ) : (
              <div className={`cart flex flex-col anim mt-4`}>
                <div className="wrap flex flex-col">
                  {cartItems?.map((item, idx) => (
                    <div className="flex">
                      <div className="lit flex flex-col">
                        <img src={`../images/${item.image}`} className="img" />
                      </div>
                      <div className="rit flex flex-col">
                        <div className="items">
                          <div className="blk flex flex-col">
                            <div className="">{item.name}</div>
                            <div className="item flex aic">
                              <div className="">{item.Size}</div>
                            </div>
                            <div className="item flex aic">
                              <div className="">{item.Corner}</div>
                            </div>
                            <div className="item flex aic">
                              <div className="">{item.Tzstyle}</div>
                            </div>
                            <div className="item flex aic">
                              <div className="">{item.Tzcolor}</div>
                            </div>

                            <div className="item">
                              <div className="value flex ">
                                {item.Quantity}
                                <span className="">&nbsp;&times;&nbsp;</span>
                                <span className="money-sign">₪</span>
                                {`${
                                  item.Tzcolor === 'Techelet (₪100)'
                                    ? item.price + 100
                                    : item.price
                                }`}
                              </div>
                            </div>

                            <div className="item flex aic">
                              <div className="qty flex aic">
                                <button
                                  onClick={() => {
                                    if (item.Quantity > 1) {
                                      dispatch({
                                        type: 'CART_UPDATE',
                                        payload: {
                                          id: item.id,
                                          Quantity: item.Quantity - 1,
                                        },
                                      });
                                    }
                                  }}
                                  className="cleanbtn btn icon-minus  s15 c333 anim flex aic"
                                />
                                <input
                                  disabled
                                  value={`${item.Quantity}`}
                                  className="cleanbtn iput   c333"
                                />
                                <button
                                  onClick={() => {
                                    if (item.Quantity < 30) {
                                      dispatch({
                                        type: 'CART_UPDATE',
                                        payload: {
                                          id: item.id,
                                          Quantity: item.Quantity + 1,
                                        },
                                      });
                                    }
                                  }}
                                  className="cleanbtn btn icon-plus   c333 anim flex aic"
                                />
                              </div>
                              {/*  */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          dispatch({
                            type: 'CART_DELETE_ITEM',
                            payload: { id: item.id },
                          });
                        }}
                        className="cross cleanbtn  s24 flex aic mr-2"
                        style={{ outline: 'none !important' }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="total flex aic">
                  <div className="tt black">
                    <span>Subtotal :</span>
                    <span>
                      {' '}
                      <strong
                        className="money-sign-cart"
                        style={{ fontWeight: 400 }}
                      >
                        &#8362;
                      </strong>
                      {subtotal}
                    </span>
                  </div>
                </div>
                <div className="actions flex aic">
                  <button
                    className="btn button font checkoutBtn c000 anim"
                    onClick={() => setStep('checkout')}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </SlidingPane>
      </>
    );
  };

  const saveaddress = () => {
    let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullname) {
      //Toast.show({html: "Please enter your full name.", time: 5})
      focus('._fullname');
    } else if (!streetaddress) {
      //Toast.show({html: "Please enter your correct street address.", time: 5})
      focus('._street');
    } else if (!city) {
      //Toast.show({html: "Please enter your city name.", time: 5})
      focus('._city');
    } else if (!country) {
      //Toast.show({html: "Please enter your country.", time: 5})
      focus('._country');
    } else if (!cellphone) {
      //Toast.show({html: "Please enter your cellphone.", time: 5})
      focus('._phone');
    } else if (!email || !email.match(themail)) {
      //Toast.show({html: "Please enter valid email address."})
      focus('._email');
    } else {
      localStorage.setItem(
        'soshandeliverdaddress',
        JSON.stringify({
          fullname,
          streetaddress,
          address,
          city,
          state,
          postalcode,
          country,
          cellphone,
          email,
        })
      );
      checkout();
      // setStep('payment')
    }
  };

  const checkout = async () => {
    setcheckoutbtn('Loading...');
    setdisabled(true);
    try {
      const oldaddress = JSON.parse(
        localStorage.getItem('soshandeliverdaddress')
      );
      if (code) {
        const res = await axios.post(
          `${process.env.REACT_APP_MAIN_URL}api/user/checkcode`,
          { code }
        );

        console.log(res.data);
        if (res.data.compared) {
          //Toast.show({ html: `Your code was correct you got 20% discount`,type : "ok", time: 5 });
        } else if (!res.data.compared) {
          //Toast.show({ html: `Your code was incorrect, No discount`,type : "error", time: 5 });
        }
      }
      console.log('cart items...', {
        ...props.data,
        code: code,
        address: oldaddress,
      });
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}api/user/createorder`,
        { ...props.data, cart: cartItems, code: code, address: oldaddress }
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.log('checkout error...', error.message);
      setdisabled(true);
      if (error.response) {
        //Toast.show({ html: `${error.response.data.errors}`,type : "error", time: 5 });
        return false;
      }
    }
  };

  const _checkout = () => {
    return (
      <SlidingPane
        isOpen={isCartPaneOpen}
        from="right"
        className="slidePane"
        onRequestClose={() => setIsCartPaneOpen(!isCartPaneOpen)}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '1.6rem',
              padding: 0,
              marginLeft: 'auto',
              color: 'black',
            }}
            onClick={() => setIsCartPaneOpen(!isCartPaneOpen)}
          >
            &times;
          </button>
          <div className="checkout flex flex-col">
            <div className="item flex flex-col">
              <input
                text="text"
                onChange={(e) => setfullname(e.target.value)}
                value={fullname}
                placeholder="Name"
                className="iput _fullname cleanbtn   c333 anim"
              />
            </div>
            <div className="item flex flex-col">
              <input
                text="text"
                onChange={(e) => setstreetaddress(e.target.value)}
                value={streetaddress}
                placeholder="Street"
                className="iput _street cleanbtn   c333 anim"
              />
            </div>
            {/*
                <div className="item flex flex-col">
                    <input text="text" onChange={e => setaddress(e.target.value)} value={address} placeholder='Address (optional)' className="iput cleanbtn font  c333 anim" />
                </div>
                */}
            <div className="item flex flex-col">
              <input
                text="text"
                onChange={(e) => setcity(e.target.value)}
                value={city}
                placeholder="City"
                className="iput _city cleanbtn  c333 anim"
              />
            </div>
            <div className="item flex flex-col">
              <input
                text="text"
                onChange={(e) => setstate(e.target.value)}
                value={state}
                placeholder="State"
                className="iput _state cleanbtn  c333 anim"
              />
            </div>
            <div className="item flex flex-col">
              <input
                text="text"
                onChange={(e) => setpostalcode(e.target.value)}
                value={postalcode}
                placeholder="Post code"
                className="iput _postal cleanbtn  c333 anim"
              />
            </div>
            <div className="item flex flex-col">
              <input
                text="text"
                onChange={(e) => setcountry(e.target.value)}
                value={country}
                placeholder="Country"
                className="iput _country cleanbtn  c333 anim"
              />
            </div>
            <div className="item flex flex-col">
              <input
                type="number"
                onChange={(e) =>
                  setcellphone(e.target.value.replace(/[^0-9\.]/g, ''))
                }
                value={cellphone}
                placeholder="Phone"
                className="iput _phone cleanbtn  c333 anim"
              />
            </div>
            <div className="item flex flex-col">
              <input
                type="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                placeholder="Email"
                className="iput _email cleanbtn  c333 anim"
              />
            </div>
            <div className="item flex flex-col">
              <input
                onChange={(e) => setcode(e.target.value)}
                type="text"
                className="iput cleanbtn c333 anim"
                placeholder="Promo code"
                value={code}
              />
            </div>
            <div className="item flex flex-col">
              <button
                disabled={disabled}
                className="button shipButton btn  "
                onClick={() => saveaddress()}
              >
                {checkoutbtn}
              </button>
            </div>
          </div>
        </div>
      </SlidingPane>
    );
  };
  const _payment = () => {
    return (
      <SlidingPane
        isOpen={isCartPaneOpen}
        from="right"
        className="slidePane"
        onRequestClose={() => setIsCartPaneOpen(!isCartPaneOpen)}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '1.6rem',
              padding: 0,
              marginLeft: 'auto',
              color: 'black',
            }}
            onClick={() => setIsCartPaneOpen(!isCartPaneOpen)}
          >
            &times;
          </button>
          <div className="payment flex flex-col aic">
            <div className="item flex flex-col">
              <button className="button btn  s15 b" onClick={() => checkout()}>
                {checkoutbtn}
              </button>
            </div>
          </div>
        </div>
      </SlidingPane>
    );
  };

  switch (step) {
    case 'cart':
      return _cart();
    case 'checkout':
      return _checkout();
    case 'payment':
      return _payment();
    default:
      return _cart();
  }
};
export default ProductCartSlider;
