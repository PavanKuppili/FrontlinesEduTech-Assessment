# Companies Directory - Code Documentation

## Component Code Explanations

### App.jsx

```jsx
import React, { useEffect } from 'react';
import { CompaniesProvider, useCompanies } from './context/CompaniesContext';
// Other imports...

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
      // Implementation...
    };

    applyFiltersAndSort();
  }, [state.filters, state.sortBy, state.sortOrder]);

  // Render logic...
}

function App() {
  return (
    <CompaniesProvider>
      <AppContent />
    </CompaniesProvider>
  );
}

export default App;
```

**Code Explanation:**
- The App component is split into two parts: `App` and `AppContent`
- `App` provides the context wrapper using `CompaniesProvider`
- `AppContent` contains the actual application logic and UI
- The first `useEffect` loads companies when the component mounts
- The second `useEffect` applies filters and sorting when filter or sort options change
- The component handles loading and error states with conditional rendering
- The main UI is rendered in a responsive container with a blue gradient background

### CompaniesContext.jsx

```jsx
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
  // Other action types...
};

// Reducer function
const companiesReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_COMPANIES:
      return { ...state, companies: action.payload, filteredCompanies: action.payload };
    
    // Other cases...
    
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
    // Other actions...
  };

  return (
    <CompaniesContext.Provider value={{ state, actions }}>
      {children}
    </CompaniesContext.Provider>
  );
};

// Custom hook for using the context
export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
};
```

**Code Explanation:**
- Uses React Context API with useReducer for state management
- Defines an initial state with all necessary application state
- Creates action types as constants for better maintainability
- Implements a reducer function that handles different action types
- Provides a context provider component that wraps the application
- Exposes a custom hook `useCompanies` for easy context consumption
- Actions are defined as methods that dispatch to the reducer

### mockData.js

```javascript
// Mock company data
export const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Technology",
    location: "Bangalore, Karnataka",
    employees: 250,
    founded: 2015,
    revenue: "$50M",
    description: "Leading provider of enterprise software solutions"
  },
  // More companies...
];

// Simulate API delay
export const simulateApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Mock API functions
export const fetchCompanies = async (filters = {}) => {
  await simulateApiCall(null, 800); // Simulate network delay
  
  let filteredCompanies = [...mockCompanies];
  
  // Apply filters
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredCompanies = filteredCompanies.filter(company =>
      company.name.toLowerCase().includes(searchTerm) ||
      company.description.toLowerCase().includes(searchTerm) ||
      company.location.toLowerCase().includes(searchTerm)
    );
  }
  
  // More filtering logic...
  
  return filteredCompanies;
};

export const getUniqueIndustries = () => {
  return [...new Set(mockCompanies.map(company => company.industry))];
};

export const getUniqueLocations = () => {
  return [...new Set(mockCompanies.map(company => company.location))];
};
```

**Code Explanation:**
- Defines mock company data with Indian locations
- Implements a function to simulate API delay using Promises and setTimeout
- Provides a fetchCompanies function that simulates an API call with filtering
- Implements filtering logic for search, industry, location, and company size
- Provides utility functions to extract unique industries and locations
- Uses the Set object to ensure uniqueness in the extracted values

### FilterControls.jsx

```jsx
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
      {/* Filter header */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-blue-300 pb-2">
        {/* Header content */}
      </div>

      <div className="space-y-4">
        {/* Search Input */}
        <div>
          {/* Search input implementation */}
        </div>

        {/* Industry Filter */}
        <div>
          {/* Industry dropdown implementation */}
        </div>

        {/* Location Filter */}
        <div>
          {/* Location dropdown implementation */}
        </div>

        {/* Company Size Filter */}
        <div>
          {/* Company size dropdown implementation */}
        </div>
        
        {/* Apply Filters Button */}
        <div className="mt-4 pt-2 border-t-2 border-blue-300">
          {/* Apply button implementation */}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(state.filters.search || 
        state.filters.industry !== 'all' || 
        state.filters.location !== 'all' || 
        state.filters.employees !== 'all') && (
        <div className="mt-4 pt-3 border-t-2 border-blue-300">
          {/* Active filters display */}
        </div>
      )}
    </div>
  );
};

export default FilterControls;
```

**Code Explanation:**
- Uses the `useCompanies` hook to access global state and actions
- Gets unique industries and locations from the mockData utility functions
- Implements handler functions for filter changes and search input
- Provides a reset function to clear all filters
- Renders a UI with search input, dropdowns for filtering, and an apply button
- Displays active filters when any filters are applied
- Uses Tailwind CSS for styling with a beginner-friendly appearance

### CompanyCard.jsx

```jsx
import React from 'react';
import { MapPin, Users, Calendar, DollarSign, ArrowRight } from 'lucide-react';

const getIndustryColor = (industry) => {
  const colors = {
    'Technology': 'bg-red-500',
    'Healthcare': 'bg-green-500',
    'Finance': 'bg-blue-500',
    'Education': 'bg-yellow-500',
    'Retail': 'bg-purple-500'
  };
  
  return colors[industry] || 'bg-gray-500';
};

const CompanyCard = ({ company }) => {
  const { name, industry, description, location, employees, founded, revenue } = company;
  
  return (
    <div className="bg-white border-2 border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card header with name and industry */}
      <div className="p-4 border-b-2 border-gray-200">
        {/* Company name and industry tag */}
      </div>
      
      {/* Company description */}
      <div className="p-4 border-b-2 border-gray-200">
        {/* Description text */}
      </div>
      
      {/* Company details */}
      <div className="p-4 space-y-2">
        {/* Location, employees, founded year, revenue */}
      </div>
      
      {/* Card actions */}
      <div className="bg-gray-100 p-3 border-t-2 border-gray-200 flex justify-end">
        {/* View details button */}
      </div>
    </div>
  );
};

export default CompanyCard;
```

**Code Explanation:**
- Defines a function to get color classes based on industry
- Destructures company properties from props
- Renders a card with company information in different sections
- Uses Lucide React icons for visual enhancement
- Implements hover effects and transitions for better UX
- Uses Tailwind CSS for styling with a beginner-friendly appearance

### CompanyGrid.jsx

```jsx
import React from 'react';
import { useCompanies } from '../context/CompaniesContext';
import CompanyCard from './CompanyCard';

const CompanyGrid = () => {
  const { state } = useCompanies();
  
  // Calculate paginated companies
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedCompanies = state.filteredCompanies.slice(startIndex, endIndex);
  
  if (paginatedCompanies.length === 0) {
    return (
      <div className="col-span-full bg-yellow-100 border-2 border-yellow-300 rounded-md p-6 text-center">
        <p className="text-lg font-bold text-yellow-800">No companies found matching your criteria.</p>
        <p className="text-sm text-yellow-700 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {paginatedCompanies.map(company => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyGrid;
```

**Code Explanation:**
- Uses the `useCompanies` hook to access global state
- Calculates paginated companies based on current page and items per page
- Handles empty state with a "No companies found" message
- Renders a responsive grid of CompanyCard components
- Uses Tailwind CSS for styling with a beginner-friendly appearance

### Pagination.jsx

```jsx
import React from 'react';
import { useCompanies } from '../context/CompaniesContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
  const { state, actions } = useCompanies();
  
  const totalPages = Math.ceil(state.filteredCompanies.length / state.itemsPerPage);
  
  if (totalPages <= 1) return null;
  
  const handlePageChange = (page) => {
    actions.setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset of pages with current page in the middle
      let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Adjust if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };
  
  return (
    <div className="bg-blue-200 p-4 rounded-md flex items-center justify-between mt-6">
      {/* Pagination implementation */}
    </div>
  );
};

export default Pagination;
```

**Code Explanation:**
- Uses the `useCompanies` hook to access global state and actions
- Calculates total pages based on filtered companies and items per page
- Returns null if there's only one page or less
- Implements a page change handler that also scrolls to top
- Generates page numbers with logic for showing a subset of pages
- Renders previous/next buttons and page numbers
- Uses Tailwind CSS for styling with a beginner-friendly appearance

## Data Flow and State Management

### State Structure

```javascript
const initialState = {
  companies: [],         // Original unfiltered companies
  filteredCompanies: [], // Companies after filters are applied
  loading: false,        // Loading state for async operations
  error: null,           // Error message if something goes wrong
  filters: {             // Filter criteria
    search: '',          // Text search
    industry: 'all',     // Industry filter
    location: 'all',     // Location filter
    employees: 'all'     // Company size filter
  },
  sortBy: 'name',        // Field to sort by
  sortOrder: 'asc',      // Sort direction (ascending/descending)
  currentPage: 1,        // Current page for pagination
  itemsPerPage: 6        // Number of items to show per page
};
```

### Actions

```javascript
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
```

### Data Flow Sequence

1. **Initial Load**:
   ```javascript
   // In App.jsx useEffect
   actions.setLoading(true);
   const companies = await fetchCompanies();
   actions.setCompanies(companies);
   actions.setLoading(false);
   ```

2. **Filter Application**:
   ```javascript
   // In FilterControls.jsx
   const handleFilterChange = (filterType, value) => {
     actions.updateFilters({ [filterType]: value });
   };
   
   // In App.jsx useEffect
   const filteredCompanies = await fetchCompanies(state.filters);
   // Apply sorting
   actions.setFilteredCompanies(sortedCompanies);
   ```

3. **Pagination**:
   ```javascript
   // In Pagination.jsx
   const handlePageChange = (page) => {
     actions.setPage(page);
     window.scrollTo({ top: 0, behavior: 'smooth' });
   };
   
   // In CompanyGrid.jsx
   const startIndex = (state.currentPage - 1) * state.itemsPerPage;
   const endIndex = startIndex + state.itemsPerPage;
   const paginatedCompanies = state.filteredCompanies.slice(startIndex, endIndex);
   ```

## Styling Approach

The project uses Tailwind CSS for styling with a beginner-friendly approach:

1. **Container Styling**:
   ```jsx
   <div className="bg-blue-100 border-2 border-blue-300 rounded-md p-4">
   ```

2. **Text Styling**:
   ```jsx
   <h2 className="text-xl font-bold text-black flex items-center">
   ```

3. **Button Styling**:
   ```jsx
   <button className="text-sm bg-red-400 text-white px-2 py-1 rounded-md font-bold flex items-center border border-red-500">
   ```

4. **Form Control Styling**:
   ```jsx
   <input className="w-full pl-10 pr-4 py-2 border-2 border-gray-400 rounded-md bg-white text-black" />
   ```

5. **Card Styling**:
   ```jsx
   <div className="bg-white border-2 border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
   ```

6. **Grid Layout**:
   ```jsx
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   ```

7. **Responsive Design**:
   ```jsx
   <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
   ```

## Common Patterns

1. **Component Structure**:
   ```jsx
   import React from 'react';
   import { useCompanies } from '../context/CompaniesContext';
   
   const ComponentName = () => {
     const { state, actions } = useCompanies();
     
     // Component logic
     
     return (
       // JSX
     );
   };
   
   export default ComponentName;
   ```

2. **Event Handlers**:
   ```jsx
   const handleSomeEvent = (param) => {
     actions.someAction(param);
   };
   ```

3. **Conditional Rendering**:
   ```jsx
   {condition && (
     <div>Rendered when condition is true</div>
   )}
   ```

4. **List Rendering**:
   ```jsx
   {items.map(item => (
     <ItemComponent key={item.id} item={item} />
   ))}
   ```

5. **Icon Usage**:
   ```jsx
   <IconName className="h-4 w-4 mr-1" />
   ```

## Debugging Tips

1. **Check Context Provider**:
   Ensure components using `useCompanies` are wrapped in `CompaniesProvider`

2. **Filter Logic**:
   Verify filter functions in mockData.js are working correctly

3. **State Updates**:
   Confirm actions are correctly dispatching to the reducer

4. **Component Props**:
   Ensure all required props are passed to components

5. **Async Operations**:
   Check loading and error states are properly managed

6. **Pagination Logic**:
   Verify page calculations and slicing are correct

7. **CSS Classes**:
   Confirm Tailwind classes are applied correctly