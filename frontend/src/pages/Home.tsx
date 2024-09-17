import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import SearchForm from '../components/SearchForm';
import { getListings } from '../services/api';
import { ListingSchema } from '../schema/listing';

const Home: React.FC = () => {
  const [featuredListings, setFeaturedListings] = useState<ListingSchema[]>([]);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const listings = await getListings({ featured: true, limit: 6 });
        setFeaturedListings(listings);
      } catch (error) {
        console.error('Error fetching featured listings:', error);
      }
    };

    fetchFeaturedListings();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to Our Property Listing Platform</h1>
      
      <SearchForm />

      <section className="featured-listings">
        <h2>Featured Listings</h2>
        <div className="listing-grid">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <Link to="/listings" className="view-all-link">
        View All Listings
      </Link>
    </div>
  );
};

export default Home;