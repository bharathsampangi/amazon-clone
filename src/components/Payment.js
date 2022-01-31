import React from "react";
import { useStateValue } from "../context/StateProvider";
import './Payment.css'

function Payment() {

    const [{basket, user}, dispatch] = useStateValue()

    return (
        <div className="payment">
            <div className="payment__container">
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?._delegate?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className="payment__section">

                </div>
                <div className="payment__section">

                </div>
            </div>
        </div>
    )
}

export default Payment