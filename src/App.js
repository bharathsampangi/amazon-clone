import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from "./components/Login"
import Payment from "./components/Payment"
import Orders from "./components/Orders"
import {auth} from "./firebase"
import { useStateValue } from "./context/StateProvider"
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe("pk_test_v0sz0fFcDNZcF7RNsflz1Uzk00Nj18kIo7")

function App() {
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })

  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/checkout" exact 
            element={
              <>
                <Header />
                <Checkout/>
              </>
            }
          />
          <Route path="/login" 
            element={
              <Login />
            }
          />
          <Route path="/orders" 
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route path="/payment" 
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route path="/" 
            element={
              <>
                <Header />
                <Home />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
