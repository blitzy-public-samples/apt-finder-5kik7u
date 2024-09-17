import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListingSchema } from 'frontend/src/schema/listing';

interface ListingState {
  listings: ListingSchema[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ListingState = {
  listings: [],
  isLoading: false,
  error: null,
};

// HUMAN ASSISTANCE NEEDED
// The following slice implementation may need review and potential adjustments for production readiness
const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    fetchListingsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchListingsSuccess(state, action: PayloadAction<ListingSchema[]>) {
      state.isLoading = false;
      state.listings = action.payload;
    },
    fetchListingsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateListing(state, action: PayloadAction<ListingSchema>) {
      const index = state.listings.findIndex(listing => listing.id === action.payload.id);
      if (index !== -1) {
        state.listings[index] = action.payload;
      }
    },
    addListing(state, action: PayloadAction<ListingSchema>) {
      state.listings.push(action.payload);
    },
    removeListing(state, action: PayloadAction<string>) {
      state.listings = state.listings.filter(listing => listing.id !== action.payload);
    },
  },
});

export const {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
  updateListing,
  addListing,
  removeListing,
} = listingSlice.actions;

export default listingSlice.reducer;