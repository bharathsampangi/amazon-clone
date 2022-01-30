import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
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
