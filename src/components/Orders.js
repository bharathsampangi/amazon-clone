import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import './Orders.css'
import {useStateValue} from "../context/StateProvider"

function Orders() {
    const [{user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(user) {
            db
            .collection('users')
            .doc(user?._delegate?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        } else {
            setOrders([])
        }
    }, [])

    return (
        <div className='orders'>
            <h1>Your orders</h1>

            <div className="orders__order">
                {orders?.map((order) => {

                })}
            </div>
        </div>
    )
}

export default Orders