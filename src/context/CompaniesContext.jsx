import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  companies: [],
  filteredCompanies: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    industry: 'all',
    location: 'all',
    employees: 'all'
  },
  sortBy: 'name',
  sortOrder: 'asc',
  currentPage: 1,
  itemsPerPage: 6
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_COMPANIES: 'SET_COMPANIES',
  SET_FILTERED_COMPANIES: 'SET_FILTERED_COMPANIES',
  SET_ERROR: 'SET_ERROR',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  SET_SORT: 'SET_SORT',
  SET_PAGE: 'SET_PAGE',
  RESET_FILTERS: 'RESET_FILTERS'
};

// Reducer function
const companiesReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_COMPANIES:
      return { ...state, companies: action.payload, filteredCompanies: action.payload };
    
    case ActionTypes.SET_FILTERED_COMPANIES:
      return { ...state, filteredCompanies: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ActionTypes.UPDATE_FILTERS:
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        currentPage: 1 // Reset to first page when filters change
      };
    
    case ActionTypes.SET_SORT:
      return { 
        ...state, 
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
        currentPage: 1 // Reset to first page when sorting changes
      };
    
    case ActionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    
    case ActionTypes.RESET_FILTERS:
      return { 
        ...state, 
        filters: initialState.filters,
        filteredCompanies: state.companies,
        currentPage: 1
      };
    
    default:
      return state;
  }
};

// Create context
const CompaniesContext = createContext();

// Provider component
export const CompaniesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companiesReducer, initialState);

  const actions = {
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setCompanies: (companies) => dispatch({ type: ActionTypes.SET_COMPANIES, payload: companies }),
    setFilteredCompanies: (companies) => dispatch({ type: ActionTypes.SET_FILTERED_COMPANIES, payload: companies }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    updateFilters: (filters) => dispatch({ type: ActionTypes.UPDATE_FILTERS, payload: filters }),
    setSort: (sortBy, sortOrder) => dispatch({ type: ActionTypes.SET_SORT, payload: { sortBy, sortOrder } }),
    setPage: (page) => dispatch({ type: ActionTypes.SET_PAGE, payload: page }),
    resetFilters: () => dispatch({ type: ActionTypes.RESET_FILTERS })
  };

  return (
    <CompaniesContext.Provider value={{ state, actions }}>
      {children}
    </CompaniesContext.Provider>
  );
};

// Custom hook to use the context
export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
};
