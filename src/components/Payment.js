import React, { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import './Payment.css';
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../store/reducer";
import axios from "../utils/axios";
import { db } from "../firebase"

function Payment() {
    const [{basket, user}, dispatch] = useStateValue()
    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [succeeded, setSucceeded] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (!error) {
            const { id } = paymentMethod;
            //paymentIntent = payment confirmation
            console.log(id)

            await axios({
                method: 'post',
                //Stripe expects the total in a currencies submits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}&id=${id}`,
            })
            .then(({data}) => {
                console.log(data)
                db
                .collection('users')
                .doc(user?._delegate?.uid)
                .collection('orders')
                .doc(data?.id)
                .set({
                    basket: basket,
                    amount: data?.amount,
                    created: data?.created
                })
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate("/orders")
        }
    }

    const handleChange = (event) => {
        //Listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(event.empty)
        setError(event?.error ? event.error?.message : "")
    }

    return (
        <div className="payment">
            <div className="payment__container">

                <h1>
                    Checkout <Link to="/checkout">{basket.length} items</Link>
                </h1>

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
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item) => (
                            <CheckoutProduct item={item} />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <h3>Order value: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>    
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment