import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import WebPage from "./pages/WebPage";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Productpage from "./pages/Productpage";
import Loginpage from "./pages/Loginpage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Cartpage from "./pages/Cartpage";
import Paymentpage from "./pages/Paymentpage";
import CategoryHomePage from "./pages/CategoryHomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Loginpage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <WebPage />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/productlist"
            element={
              <PrivateRoute>
                <Productpage />
              </PrivateRoute>
            }
          >
            <Route path="/productlist" element={<CategoryHomePage />} />
            {/* <Route path="/productlist/clothes" element={<Clothes />} />
            <Route path="/productlist/toys" element={<Toys />} />
            <Route path="/productlist/grocery" element={<Grocery />} />
            <Route path="/productlist/mobiles" element={<Mobile />} /> */}
          </Route>
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/cartlist"
            element={
              <PrivateRoute>
                <Cartpage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <Paymentpage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
