import { z } from 'zod';

export const ListingSchema = z.object({
  id: z.string().uuid(),
  listingDate: z.date(),
  rent: z.number().positive(),
  brokerFee: z.number().nonnegative(),
  squareFootage: z.number().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  availableDate: z.date(),
  streetAddress: z.string(),
  zillowUrl: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Listing = z.infer<typeof ListingSchema>;