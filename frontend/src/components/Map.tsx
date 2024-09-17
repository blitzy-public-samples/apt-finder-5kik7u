import React, { useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { ListingSchema } from 'frontend/src/schema/listing';

// HUMAN ASSISTANCE NEEDED
// The following code needs review and potential improvements for production readiness.
// Areas that may need attention:
// - Error handling for map loading failures
// - Implementing custom map styles
// - Adding more interactive features like info windows
// - Optimizing marker rendering for large datasets
// - Implementing proper TypeScript types for Google Maps objects

const Map: React.FC<{ listings: ListingSchema[] }> = ({ listings }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 0,
    lng: 0
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (mapRef.current && listings.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      listings.forEach((listing) => {
        bounds.extend(new google.maps.LatLng(listing.latitude, listing.longitude));
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [listings]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      options={options}
    >
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={{ lat: listing.latitude, lng: listing.longitude }}
          onClick={() => {
            // TODO: Implement marker click handler to show listing details
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;