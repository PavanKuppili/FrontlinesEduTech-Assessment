import React, { useEffect } from 'react';
import { CompaniesProvider, useCompanies } from './context/CompaniesContext';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import CompanyGrid from './components/CompanyGrid';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchCompanies } from './data/mockData';

function AppContent() {
  const { state, actions } = useCompanies();

  // Load companies on component mount
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        actions.setLoading(true);
        actions.setError(null);
        const companies = await fetchCompanies();
        actions.setCompanies(companies);
      } catch (error) {
        actions.setError('Failed to load companies. Please try again.');
      } finally {
        actions.setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  // Apply filters and sorting whenever filters or sort options change
  useEffect(() => {
    const applyFiltersAndSort = async () => {
      if (state.companies.length === 0) return;

      try {
        actions.setLoading(true);
        const filteredCompanies = await fetchCompanies(state.filters);
        
        // Apply sorting
        const sortedCompanies = [...filteredCompanies].sort((a, b) => {
          let aValue = a[state.sortBy];
          let bValue = b[state.sortBy];
          
          // Handle different data types
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
          
          if (state.sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        });
        
        actions.setFilteredCompanies(sortedCompanies);
      } catch (error) {
        actions.setError('Failed to filter companies. Please try again.');
      } finally {
        actions.setLoading(false);
      }
    };

    applyFiltersAndSort();
  }, [state.filters, state.sortBy, state.sortOrder]);

  if (state.loading && state.companies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={state.error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 bg-gradient-to-b from-blue-100 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Companies Directory
          </h1>
          <p className="text-gray-600">
            Discover and explore companies across various industries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterControls />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {state.loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="mb-6 bg-yellow-100 p-4 border-2 border-yellow-300 rounded-md">
                  <div className="flex justify-between items-center">
                    <p className="text-black font-bold">
                      Showing {state.filteredCompanies.length} companies
                    </p>
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-gray-700">
                        Sort by:
                      </label>
                      <select
                        value={`${state.sortBy}-${state.sortOrder}`}
                        onChange={(e) => {
                          const [sortBy, sortOrder] = e.target.value.split('-');
                          actions.setSort(sortBy, sortOrder);
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="employees-asc">Employees (Low-High)</option>
                        <option value="employees-desc">Employees (High-Low)</option>
                        <option value="founded-asc">Founded (Old-New)</option>
                        <option value="founded-desc">Founded (New-Old)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <CompanyGrid />
                <div className="mt-6">
                  <Pagination />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-blue-700 text-white text-center py-4 mt-8 border-t-4 border-blue-900">
        <p className="font-bold">COMPANIES DIRECTORY © 2023 | Made with ❤️ in India</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CompaniesProvider>
      <AppContent />
    </CompaniesProvider>
  );
}

export default App;
