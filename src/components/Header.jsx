import React from 'react';
import { Building2, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-500 border-b-4 border-blue-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full border-2 border-yellow-400">
              <Building2 className="h-8 w-8 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-white uppercase">
              COMPANIES DIRECTORY
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-lg text-white bg-blue-600 p-2 rounded-md border-2 border-white">
            <Search className="h-5 w-5" />
            <span className="font-bold">Find Companies Now!</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
