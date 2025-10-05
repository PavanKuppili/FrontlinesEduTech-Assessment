import React from 'react';
import { useCompanies } from '../context/CompaniesContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
  const { state, actions } = useCompanies();
  
  const totalPages = Math.ceil(state.filteredCompanies.length / state.itemsPerPage);
  
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page) => {
    actions.setPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, state.currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 p-4 border-2 border-blue-300 rounded-md">
      <div className="text-sm font-bold text-black mb-3 md:mb-0">
        <span className="uppercase">PAGE {state.currentPage} OF {totalPages}</span> | 
        Showing {((state.currentPage - 1) * state.itemsPerPage) + 1} to{' '}
        {Math.min(state.currentPage * state.itemsPerPage, state.filteredCompanies.length)} of{' '}
        {state.filteredCompanies.length} results
      </div>
      
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(state.currentPage - 1)}
          disabled={state.currentPage === 1}
          className={`p-2 rounded-md border-2 ${state.currentPage === 1 ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white border-blue-700 hover:bg-blue-600'}`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md border-2 font-bold ${page === state.currentPage ? 'bg-green-500 text-white border-green-700' : 'bg-white text-black border-gray-400 hover:bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
        
        {/* Next Button */}
        <button
          onClick={() => handlePageChange(state.currentPage + 1)}
          disabled={state.currentPage === totalPages}
          className={`p-2 rounded-md border-2 ${state.currentPage === totalPages ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white border-blue-700 hover:bg-blue-600'}`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
