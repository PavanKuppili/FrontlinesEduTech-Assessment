import React from 'react';
import { Building2, MapPin, Users, Calendar, DollarSign } from 'lucide-react';

const CompanyCard = ({ company }) => {
  // Simplified color function with fewer options and brighter colors
  const getIndustryColor = (industry) => {
    const colors = {
      'Technology': 'bg-blue-300 text-blue-900',
      'Energy': 'bg-green-300 text-green-900',
      'Healthcare': 'bg-red-300 text-red-900',
      'Finance': 'bg-yellow-300 text-yellow-900',
      'Education': 'bg-purple-300 text-purple-900',
      'Retail': 'bg-pink-300 text-pink-900',
      'Automotive': 'bg-blue-300 text-blue-900',
      'Food & Beverage': 'bg-orange-300 text-orange-900',
      'Media': 'bg-green-300 text-green-900',
      'Logistics': 'bg-yellow-300 text-yellow-900',
      'Real Estate': 'bg-red-300 text-red-900',
      'Travel': 'bg-purple-300 text-purple-900'
    };
    return colors[industry] || 'bg-gray-300 text-gray-900';
  };

  return (
    <div className="bg-white border-2 border-gray-300 rounded-md p-4 mb-4">
      {/* Header - Simplified */}
      <div className="mb-3">
        <div className="flex items-center">
          <div className="p-2 bg-blue-200 rounded-md mr-2">
            <Building2 className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-black">
              {company.name}
            </h3>
            <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${getIndustryColor(company.industry)}`}>
              {company.industry}
            </span>
          </div>
        </div>
      </div>

      {/* Description - Simplified */}
      <p className="text-black mb-3 border-b-2 border-gray-200 pb-2">
        {company.description}
      </p>

      {/* Company Details - Simplified */}
      <div className="space-y-2">
        <div className="flex items-center text-black">
          <MapPin className="h-4 w-4 mr-2 text-black" />
          <span>{company.location}</span>
        </div>
        
        <div className="flex items-center text-black">
          <Users className="h-4 w-4 mr-2 text-black" />
          <span>{company.employees.toLocaleString()} employees</span>
        </div>
        
        <div className="flex items-center text-black">
          <Calendar className="h-4 w-4 mr-2 text-black" />
          <span>Founded {company.founded}</span>
        </div>
        
        <div className="flex items-center text-black">
          <DollarSign className="h-4 w-4 mr-2 text-black" />
          <span>Revenue: {company.revenue}</span>
        </div>
      </div>

      {/* Action Button - Simplified */}
      <div className="mt-4 pt-2">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-bold border-2 border-blue-700">
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
