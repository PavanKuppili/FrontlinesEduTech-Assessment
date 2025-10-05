import React from 'react';
import { useCompanies } from '../context/CompaniesContext';
import { getUniqueIndustries, getUniqueLocations } from '../data/mockData';
import { Search, Filter, RotateCcw } from 'lucide-react';

const FilterControls = () => {
  const { state, actions } = useCompanies();
  const industries = getUniqueIndustries();
  const locations = getUniqueLocations();

  const handleFilterChange = (filterType, value) => {
    actions.updateFilters({ [filterType]: value });
  };

  const handleSearchChange = (e) => {
    actions.updateFilters({ search: e.target.value });
  };

  const resetFilters = () => {
    actions.resetFilters();
  };

  return (
    <div className="bg-blue-100 border-2 border-blue-300 rounded-md p-4">
      <div className="flex items-center justify-between mb-4 border-b-2 border-blue-300 pb-2">
        <h2 className="text-xl font-bold text-black flex items-center">
          <Filter className="h-6 w-6 mr-2 text-blue-700" />
          FILTERS
        </h2>
        <button
          onClick={resetFilters}
          className="text-sm bg-red-400 text-white px-2 py-1 rounded-md font-bold flex items-center border border-red-500"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          RESET
        </button>
      </div>

      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-bold text-black mb-1 uppercase">
            Search Companies:
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
            <input
              type="text"
              value={state.filters.search}
              onChange={handleSearchChange}
              placeholder="Type here to search..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-400 rounded-md bg-white text-black"
            />
          </div>
        </div>

        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-bold text-black mb-1 uppercase">
            Industry:
          </label>
          <select
            value={state.filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-md bg-white text-black"
          >
            <option value="all">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-bold text-black mb-1 uppercase">
            Location:
          </label>
          <select
            value={state.filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-md bg-white text-black"
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Company Size Filter */}
        <div>
          <label className="block text-sm font-bold text-black mb-1 uppercase">
            Company Size:
          </label>
          <select
            value={state.filters.employees}
            onChange={(e) => handleFilterChange('employees', e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-md bg-white text-black"
          >
            <option value="all">All Sizes</option>
            <option value="small">Small (&lt; 100)</option>
            <option value="medium">Medium (100-300)</option>
            <option value="large">Large (&gt; 300)</option>
          </select>
        </div>
        
        {/* Apply Filters Button */}
        <div className="mt-4 pt-2 border-t-2 border-blue-300">
          <button 
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md text-sm font-bold border-2 border-green-700 uppercase"
            onClick={() => console.log('Filters applied!')}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(state.filters.search || 
        state.filters.industry !== 'all' || 
        state.filters.location !== 'all' || 
        state.filters.employees !== 'all') && (
        <div className="mt-4 pt-3 border-t-2 border-blue-300">
          <h3 className="text-sm font-bold text-black mb-2 uppercase">ACTIVE FILTERS:</h3>
          <div className="flex flex-wrap gap-2">
            {state.filters.search && (
              <span className="px-2 py-1 bg-blue-300 text-blue-900 text-xs font-bold rounded-md border border-blue-500">
                Search: "{state.filters.search}"
              </span>
            )}
            {state.filters.industry !== 'all' && (
              <span className="px-2 py-1 bg-green-300 text-green-900 text-xs font-bold rounded-md border border-green-500">
                Industry: {state.filters.industry}
              </span>
            )}
            {state.filters.location !== 'all' && (
              <span className="px-2 py-1 bg-purple-300 text-purple-900 text-xs font-bold rounded-md border border-purple-500">
                Location: {state.filters.location}
              </span>
            )}
            {state.filters.employees !== 'all' && (
              <span className="px-2 py-1 bg-orange-300 text-orange-900 text-xs font-bold rounded-md border border-orange-500">
                Size: {state.filters.employees}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
