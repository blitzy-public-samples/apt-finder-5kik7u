import React, { useState } from 'react';
import { FilterSchema } from 'frontend/src/schema/filter';
import { isValidZipCode } from 'frontend/src/utils/validators';

// HUMAN ASSISTANCE NEEDED
// The following component may need additional refinement and error handling for production readiness.
// The criteria builder part is not fully implemented and may require more complex logic.

const FilterForm: React.FC<{ initialFilter?: FilterSchema; onSubmit: (filter: FilterSchema) => void }> = ({ initialFilter, onSubmit }) => {
  const [filter, setFilter] = useState<FilterSchema>(initialFilter || {
    name: '',
    zipCodes: [],
    criteria: []
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, name: e.target.value });
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newZipCodes = [...filter.zipCodes];
    newZipCodes[index] = e.target.value;
    setFilter({ ...filter, zipCodes: newZipCodes });
  };

  const addZipCode = () => {
    setFilter({ ...filter, zipCodes: [...filter.zipCodes, ''] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(filter);
    }
  };

  const validateForm = () => {
    if (!filter.name) {
      alert('Please enter a filter name');
      return false;
    }
    if (filter.zipCodes.some(zip => !isValidZipCode(zip))) {
      alert('Please enter valid zip codes');
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="filterName">Filter Name:</label>
        <input
          id="filterName"
          type="text"
          value={filter.name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label>Zip Codes:</label>
        {filter.zipCodes.map((zip, index) => (
          <input
            key={index}
            type="text"
            value={zip}
            onChange={(e) => handleZipCodeChange(e, index)}
            pattern="\d{5}"
            title="Five digit zip code"
          />
        ))}
        <button type="button" onClick={addZipCode}>Add Zip Code</button>
      </div>
      {/* HUMAN ASSISTANCE NEEDED */}
      {/* Criteria builder component needs to be implemented */}
      <div>
        <p>Criteria Builder not implemented</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FilterForm;