import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

function CountryDetail() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borderingCountries, setBorderingCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!response.ok) throw new Error("Country not found");
        const data = await response.json();
        setCountry(data[0]);

        if (data[0]?.borders?.length > 0) {
          const bordersResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(
              ","
            )}`
          );
          const bordersData = await bordersResponse.json();
          setBorderingCountries(bordersData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
    window.scrollTo(0, 0);
  }, [countryCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-600">Loading country details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Back to Countries
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl mt-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 px-3 py-1.5 bg-green-500 shadow rounded-md hover:bg-green-400  text-sm text-white"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {country && (
        <div className="flex flex-col lg:flex-row gap-4 mb-20 text-center mt-10">
          <div className="flex justify-center lg:justify-start shadow-md rounded-b-md h-auto">
            <img
              src={country.flags?.png}
              alt={`Flag of ${country.name?.common}`}
              className="w-auto h-auto object-contain px-4 shadow-md"
            />
          </div>

          <div className="lg:w-2/3">
            <h1 className="text-2xl font-bold text-green-700 mb-1">
              {country.name?.common}
            </h1>
            <p className="text-red-600 mb-4 text-sm">
              {country.name?.official}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <DetailItem
                  label="Native Name"
                  value={
                    country.name?.nativeName
                      ? Object.values(country.name.nativeName)[0]?.common
                      : "N/A"
                  }
                />
                <DetailItem
                  label="Population"
                  value={country.population?.toLocaleString()}
                />
                <DetailItem label="Region" value={country.region} />
                <DetailItem label="Subregion" value={country.subregion} />
                <DetailItem
                  label="Capital"
                  value={country.capital?.join(", ") || "N/A"}
                />
              </div>
              <div className="space-y-2">
                <DetailItem
                  label="Top Level Domain"
                  value={country.tld?.join(", ")}
                />
                <DetailItem
                  label="Currencies"
                  value={
                    country.currencies
                      ? Object.values(country.currencies)
                          .map((c) => c.name)
                          .join(", ")
                      : "N/A"
                  }
                />
                <DetailItem
                  label="Languages"
                  value={
                    country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"
                  }
                />
              </div>
            </div>

            {borderingCountries.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-3 text-green-700 flex justify-center">
                  Border Countries:
                </h3>
                <div className="ml-19 flex flex-wrap gap-2 justify-center ">
                  {borderingCountries.map((border) => (
                    <button
                      key={border.cca3}
                      onClick={() => navigate(`/country/${border.cca3}`)}
                      className="px-3 py-1 bg-green-200 shadow rounded text-sm hover:bg-green-300 transition text-center"
                    >
                      {border.name.common}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="text-sm">
      <span className="font-medium text-gray-700">{label}: </span>
      <span className="text-gray-600">{value || "N/A"}</span>
    </div>
  );
}

export default CountryDetail;
