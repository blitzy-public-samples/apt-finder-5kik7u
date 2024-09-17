import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterList from 'frontend/src/components/FilterList';
import ListingCard from 'frontend/src/components/ListingCard';
import { getUserFilters, getRecentListings } from 'frontend/src/services/api';
import { FilterSchema } from 'frontend/src/schema/filter';
import { ListingSchema } from 'frontend/src/schema/listing';

// HUMAN ASSISTANCE NEEDED
// The following code may need additional refinement for production readiness.
// Please review and adjust as necessary, particularly error handling and loading states.

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterSchema[]>([]);
  const [recentListings, setRecentListings] = useState<ListingSchema[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFilters = await getUserFilters();
        setFilters(userFilters);

        const listings = await getRecentListings();
        setRecentListings(listings);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // TODO: Implement proper error handling and user feedback
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <section className="filters">
        <h2>Saved Filters</h2>
        <FilterList filters={filters} />
        <Link to="/create-filter">Create New Filter</Link>
      </section>

      <section className="recent-listings">
        <h2>Recent Listings</h2>
        {recentListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
        <Link to="/listings">View All Listings</Link>
      </section>
    </div>
  );
};

export default Dashboard;