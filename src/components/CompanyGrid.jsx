import React from 'react';
import { useCompanies } from '../context/CompaniesContext';
import CompanyCard from './CompanyCard';

const CompanyGrid = () => {
  const { state } = useCompanies();
  
  // Calculate pagination
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedCompanies = state.filteredCompanies.slice(startIndex, endIndex);

  if (paginatedCompanies.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-gray-300 bg-gray-100 rounded-md">
        <div className="text-gray-600 mb-4">
          <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-black mb-2">NO COMPANIES FOUND!</h3>
        <p className="text-black font-bold">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {paginatedCompanies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyGrid;
