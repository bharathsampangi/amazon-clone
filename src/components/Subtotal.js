import React from "react"
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from "../context/StateProvider"
import { useNavigate } from "react-router-dom"

const Subtotal = () => {

    const [{basket}, dispatch] = useStateValue()

    const getBasketTotal = (basket) => basket?.reduce((total, item) => total + item.price, 0)
    const navigate = useNavigate()

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal