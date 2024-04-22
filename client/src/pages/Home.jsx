import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData("/api/listing/get?offer=true&limit=4", setOfferListings);
    fetchData("/api/listing/get?type=rent&limit=4", setRentListings);
    fetchData("/api/listing/get?type=sale&limit=4", setSaleListings);
  }, []);

  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-xl md:text-xl font-extrabold leading-tight mb-6 animate__animated animate__fadeIn">
            Find Your Next <span className="text-yellow-300">Dream</span> Place
            with Top Security
          </h1>
          <Link
            href="/search"
            className="bg-yellow-400 text-blue-800 px-8 py-4 rounded-full hover:bg-yellow-500 hover:scale-105 text-xl font-bold transition transform duration-300 shadow-lg"
          >
            Start Your Search
          </Link>
        </div>
      </section>

      <section className="container mx-auto py-12">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-4xl font-bold text-blue-700 mb-6">
            Recent Offers
          </h2>
          <a
            href="/search?offer=true"
            className="text-blue-600 hover:text-blue-800 text-xl font-medium transition duration-300"
          >
            See More Offers
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {offerListings.map(listing => (
            <div
              key={listing._id}
              className="shadow-lg p-4 rounded-lg bg-white hover:shadow-xl transition duration-300"
            >
              <ListingItem listing={listing} />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-4xl font-bold text-blue-700 mb-6">
            Recent Places For Rent
          </h2>
          <a
            href="/search?type=rent"
            className="text-blue-600 hover:text-blue-800 text-xl font-medium transition duration-300"
          >
            Explore More Rentals
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {rentListings.map(listing => (
            <div
              key={listing._id}
              className="shadow-lg p-4 rounded-lg bg-white hover:shadow-xl transition duration-300"
            >
              <ListingItem listing={listing} />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-4xl font-bold text-blue-700 mb-6">
            Recent Places For Sale
          </h2>
          <a
            href="/search?type=sale"
            className="text-blue-600 hover:text-blue-800 text-xl font-medium transition duration-300"
          >
            Discover More for Sale
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {saleListings.map(listing => (
            <div
              key={listing._id}
              className="shadow-lg p-4 rounded-lg bg-white hover:shadow-xl transition duration-300"
            >
              <ListingItem listing={listing} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
