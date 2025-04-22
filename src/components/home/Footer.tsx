
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="font-bold text-xl mb-2">Sadak2Sky</h3>
          <p className="text-gray-300 text-sm">Your Journey, Our Scan!</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <FooterSection 
            title="Company" 
            items={['About', 'Careers', 'Press', 'Blog']} 
          />
          <FooterSection 
            title="Support" 
            items={['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']} 
          />
          <FooterSection 
            title="Follow Us" 
            items={['Twitter', 'Instagram', 'Facebook']} 
            isSocial 
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 mt-6 border-t border-gray-700 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sadak2Sky. All rights reserved.
      </div>
    </footer>
  );
};

const FooterSection = ({ 
  title, 
  items, 
  isSocial = false 
}: { 
  title: string; 
  items: string[]; 
  isSocial?: boolean;
}) => (
  <div>
    <h4 className="font-semibold mb-3">{title}</h4>
    {isSocial ? (
      <div className="flex space-x-4 text-sm">
        {items.map((item) => (
          <span key={item} className="cursor-pointer">{item}</span>
        ))}
      </div>
    ) : (
      <ul className="space-y-2 text-sm text-gray-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default Footer;
