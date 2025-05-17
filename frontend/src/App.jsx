import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import CountryDetail from "./pages/CountryDetail";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import CountriesList from "./pages/CountriesList";

function App() {
  return (
    <>
      <div className="w-full mx-auto">
      
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

        <Navbar />
        <Routes>
         
          <Route path="/" element={<Home />} />
        
          <Route path="/countries" element={<CountriesList />} />
          <Route path="/country/:countryCode" element={<CountryDetail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
