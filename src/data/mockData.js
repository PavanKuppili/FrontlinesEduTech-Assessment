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
  {
    id: 2,
    name: "GreenEnergy Inc",
    industry: "Energy",
    location: "Hyderabad, Telangana",
    employees: 180,
    founded: 2012,
    revenue: "$30M",
    description: "Renewable energy solutions and solar panel manufacturing"
  },
  {
    id: 3,
    name: "HealthTech Innovations",
    industry: "Healthcare",
    location: "Chennai, Tamil Nadu",
    employees: 320,
    founded: 2018,
    revenue: "$75M",
    description: "Digital health platforms and telemedicine solutions"
  },
  {
    id: 4,
    name: "FinanceFlow Systems",
    industry: "Finance",
    location: "Mumbai, Maharashtra",
    employees: 450,
    founded: 2010,
    revenue: "$120M",
    description: "Financial technology and payment processing solutions"
  },
  {
    id: 5,
    name: "EduTech Academy",
    industry: "Education",
    location: "Pune, Maharashtra",
    employees: 95,
    founded: 2019,
    revenue: "$15M",
    description: "Online learning platforms and educational technology"
  },
  {
    id: 6,
    name: "RetailMax Corp",
    industry: "Retail",
    location: "Delhi, NCR",
    employees: 600,
    founded: 2008,
    revenue: "$200M",
    description: "E-commerce solutions and retail management systems"
  },
  {
    id: 7,
    name: "AutoDrive Technologies",
    industry: "Automotive",
    location: "Gurugram, Haryana",
    employees: 280,
    founded: 2016,
    revenue: "$45M",
    description: "Autonomous vehicle technology and smart transportation"
  },
  {
    id: 8,
    name: "FoodTech Solutions",
    industry: "Food & Beverage",
    location: "Kolkata, West Bengal",
    employees: 150,
    founded: 2017,
    revenue: "$25M",
    description: "Food delivery platforms and restaurant management systems"
  },
  {
    id: 9,
    name: "MediaStream Inc",
    industry: "Media",
    location: "Ahmedabad, Gujarat",
    employees: 200,
    founded: 2014,
    revenue: "$40M",
    description: "Streaming platforms and digital content distribution"
  },
  {
    id: 10,
    name: "LogiTech Global",
    industry: "Logistics",
    location: "Jaipur, Rajasthan",
    employees: 350,
    founded: 2011,
    revenue: "$80M",
    description: "Supply chain management and logistics optimization"
  },
  {
    id: 11,
    name: "RealEstate Pro",
    industry: "Real Estate",
    location: "Chandigarh, Punjab",
    employees: 120,
    founded: 2013,
    revenue: "$20M",
    description: "Property management and real estate technology platforms"
  },
  {
    id: 12,
    name: "TravelTech Adventures",
    industry: "Travel",
    location: "Kochi, Kerala",
    employees: 180,
    founded: 2016,
    revenue: "$35M",
    description: "Travel booking platforms and tourism technology solutions"
  }
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
  
  if (filters.industry && filters.industry !== 'all') {
    filteredCompanies = filteredCompanies.filter(company =>
      company.industry === filters.industry
    );
  }
  
  if (filters.location && filters.location !== 'all') {
    filteredCompanies = filteredCompanies.filter(company =>
      company.location.includes(filters.location)
    );
  }
  
  if (filters.employees) {
    filteredCompanies = filteredCompanies.filter(company => {
      switch (filters.employees) {
        case 'small':
          return company.employees < 100;
        case 'medium':
          return company.employees >= 100 && company.employees < 300;
        case 'large':
          return company.employees >= 300;
        default:
          return true;
      }
    });
  }
  
  return filteredCompanies;
};

export const getUniqueIndustries = () => {
  return [...new Set(mockCompanies.map(company => company.industry))];
};

export const getUniqueLocations = () => {
  return [...new Set(mockCompanies.map(company => company.location))];
};
