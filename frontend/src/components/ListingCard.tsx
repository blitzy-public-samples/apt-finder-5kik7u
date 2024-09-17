import React from 'react';
import { formatCurrency, formatDate } from 'frontend/src/utils/formatters';
import { ListingSchema } from 'frontend/src/schema/listing';

// HUMAN ASSISTANCE NEEDED
// The confidence level is below 0.8, so this component may need review and improvements.
// Please check the implementation and make necessary adjustments.

const ListingCard: React.FC<{ listing: ListingSchema }> = ({ listing }) => {
  return (
    <div className="listing-card">
      <img src={listing.imageUrl} alt={listing.title} className="listing-image" />
      <div className="listing-details">
        <h2>{listing.title}</h2>
        <p className="rent">{formatCurrency(listing.rent)}/month</p>
        <p className="key-details">
          {listing.bedrooms} bed • {listing.bathrooms} bath • {listing.squareFootage} sq ft
        </p>
        <p className="available-date">Available: {formatDate(listing.availableDate)}</p>
        <a href={listing.zillowUrl} target="_blank" rel="noopener noreferrer" className="zillow-link">
          View on Zillow
        </a>
      </div>
    </div>
  );
};

export default ListingCard;