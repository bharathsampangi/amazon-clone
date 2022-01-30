import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from "./components/Login"
import {auth} from "./firebase"
import { useStateValue } from "./context/StateProvider"

function App() {
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser)

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
