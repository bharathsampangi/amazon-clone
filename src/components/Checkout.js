import React from "react"
import './Checkout.css'
import FlipMove from "react-flip-move"
import { useStateValue } from "../context/StateProvider"
import Subtotal from "./Subtotal"
import CheckoutProduct from "./CheckoutProduct"

function Checkout() {

    const [{basket, user}, dispatch] = useStateValue()

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    className="checkout__ad" 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
                    alt="" 
                />
                <div>
                    <h3>Hello, {user?._delegate.email}</h3>
                    <h2 className="checkout__title">Your shopping Basket</h2>
                    {/* <FlipMove> */}
                        {basket.map((item, index) => {
                            return (
                                <CheckoutProduct item={item} key={index} />
                            )
                        })}
                    {/* </FlipMove> */}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout