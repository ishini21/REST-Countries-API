import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([countries]);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const url = selectedRegion
          ? `https://restcountries.com/v3.1/region/${selectedRegion}`
          : "https://restcountries.com/v3.1/all";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [selectedRegion]);

  useEffect(() => {
    if (countries.length === 0) return;
    let result = [...countries];

    if (searchTerm) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(result);
  }, [searchTerm, countries]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSelectedRegion("");
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-center text-green-500">
          World Countries
        </h1>

        <div className="flex flex-col sm:flex-row items-right gap-4 w-full sm:w-2/3">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-6 py-1 border border-green-400 focus:outline-none focus:border-green-600 rounded-md w-full"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto text-green-700 hover:border-green-400">
            <select
              value={selectedRegion}
              onChange={handleRegionChange}
              className="px-6 py-1 border border-green-400 focus:border-green-500  rounded-md w-full sm:w-auto"
            >
              <option value="">All Regions</option>
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>

            {(searchTerm || selectedRegion) && (
              <button
                onClick={clearFilters}
                className="bg-green-900 hover:bg-gray-300 py-1 px-6 rounded-md text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            onClick={() => navigate(`/country/${country.cca3}`)}
            style={{ cursor: "pointer" }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-40 bg-white flex items-center justify-center">
              {country.flags?.png && (
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="h-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-black mb-1 text-center">
                {country.name.common}
              </h2>
              <p className="text-amber-800 text-center">
                {country.name.official}
              </p>
              <div className="mt-2 flex justify-between text-sm font-semibold text-blue-600">
                <span>Region: {country.region}</span>
                <span>Population: {country.population?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countries;
