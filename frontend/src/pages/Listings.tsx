import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListingCard from 'frontend/src/components/ListingCard';
import FilterForm from 'frontend/src/components/FilterForm';
import { getListings } from 'frontend/src/services/api';
import { ListingSchema } from 'frontend/src/schema/listing';
import { FilterSchema } from 'frontend/src/schema/filter';

// HUMAN ASSISTANCE NEEDED
// The following component needs review for production readiness and potential improvements in pagination implementation

const Listings: React.FC = () => {
  const [listings, setListings] = useState<ListingSchema[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterSchema>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { filterId } = useParams<{ filterId: string }>();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getListings(filterId, currentPage);
        setListings(response.listings);
        setTotalPages(response.totalPages);
        setCurrentFilter(response.filter);
      } catch (error) {
        console.error('Error fetching listings:', error);
        // TODO: Implement proper error handling
      }
    };

    fetchListings();
  }, [filterId, currentPage]);

  const handleFilterChange = (newFilter: FilterSchema) => {
    setCurrentFilter(newFilter);
    setCurrentPage(1);
    // TODO: Implement API call to update listings based on new filter
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="listings-page">
      <h1>Apartment Listings</h1>
      <FilterForm currentFilter={currentFilter} onFilterChange={handleFilterChange} />
      <div className="listings-grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      <div className="pagination">
        {/* TODO: Implement proper pagination controls */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Listings;