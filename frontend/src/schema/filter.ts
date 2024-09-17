import { z } from 'zod';

const FilterCriteriaSchema = z.object({
  field: z.string(),
  operator: z.enum(['<', '<=', '=', '>=', '>']),
  value: z.string()
});

// HUMAN ASSISTANCE NEEDED
// Please review the FilterSchema, especially the zipCodes regex and the use of FilterCriteriaSchema
const FilterSchema = z.object({
  name: z.string(),
  zipCodes: z.array(z.string().regex(/^\d{5}$/)),
  criteria: z.array(FilterCriteriaSchema)
});

export type FilterCriteria = z.infer<typeof FilterCriteriaSchema>;
export type Filter = z.infer<typeof FilterSchema>;

export { FilterCriteriaSchema, FilterSchema };