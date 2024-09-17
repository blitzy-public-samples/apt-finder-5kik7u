import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
          <div className="mt-2 md:mt-0">
            <a href="/terms" className="text-sm text-gray-600 hover:text-gray-800 mr-4">
              Terms of Service
            </a>
            <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-800">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;