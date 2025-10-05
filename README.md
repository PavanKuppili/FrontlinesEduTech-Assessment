# Companies Directory - Frontend Application

A modern React-based frontend application that displays company data with advanced filtering, sorting, and pagination features. This application has been styled with a beginner-friendly UI and uses Indian locations for company data.

## Features

### Core Features
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Company Display**: Card-based layout showing company information
- **Advanced Filtering**: 
  - Search by name, description, or location
  - Filter by industry
  - Filter by location
  - Filter by company size (employees)
- **Sorting Options**:
  - Sort by name (A-Z, Z-A)
  - Sort by employees (Low-High, High-Low)
  - Sort by founded year (Old-New, New-Old)
- **Pagination**: Navigate through large datasets efficiently
- **Loading States**: Smooth loading indicators during data fetching
- **Error Handling**: User-friendly error messages with retry options

### Technical Features
- **State Management**: React Context API for global state management
- **Mock API**: Simulated API calls with realistic delays
- **Modern React**: Built with React 18 and modern hooks
- **Component Architecture**: Modular, reusable components
- **TypeScript Ready**: Structured for easy TypeScript migration

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Context API** - State management

## Documentation

Detailed documentation is available in the following files:

- `documentation.md`: General project documentation explaining components, data flow, and features
- `code-documentation.md`: Detailed code explanations for developers

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CompanyCard.jsx     # Individual company card
│   ├── CompanyGrid.jsx     # Grid layout for companies
│   ├── FilterControls.jsx  # Filter sidebar
│   ├── Header.jsx          # Application header
│   ├── Pagination.jsx      # Pagination controls
│   ├── LoadingSpinner.jsx  # Loading indicator
│   └── ErrorMessage.jsx    # Error display
├── context/            # State management
│   └── CompaniesContext.jsx # Global state context
├── data/               # Mock data and API simulation
│   └── mockData.js         # Company data and API functions
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Filtering Companies
- Use the search bar to find companies by name, description, or location
- Select industry from the dropdown to filter by business sector
- Choose location to filter by city
- Filter by company size based on employee count

### Sorting
- Use the "Sort by" dropdown to organize companies
- Options include sorting by name, employee count, or founding year
- Choose ascending or descending order

### Pagination
- Navigate through pages using the pagination controls
- Each page shows 6 companies by default
- Page numbers and navigation buttons are provided

## Mock Data

The application includes 12 sample companies across various industries:
- Technology
- Energy
- Healthcare
- Finance
- Education
- Retail
- Automotive
- Food & Beverage
- Media
- Logistics
- Real Estate
- Travel

## Customization

### Adding New Companies
Edit `src/data/mockData.js` to add more companies to the mock data.

### Modifying Filters
Update the filter options in `src/components/FilterControls.jsx` to add new filtering criteria.

### Styling Changes
Modify `tailwind.config.js` or individual component styles to customize the appearance.
 
