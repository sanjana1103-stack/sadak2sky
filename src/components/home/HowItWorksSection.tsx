
import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Enter Your Journey",
      description: "Tell us where you're starting from and where you want to go"
    },
    {
      number: 2,
      title: "Compare Options",
      description: "We'll show you all possible routes with detailed information"
    },
    {
      number: 3,
      title: "Book Your Journey",
      description: "Select your preferred option and book tickets directly"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md my-16">
      <h2 className="text-2xl font-semibold text-center mb-8">How Sadak2Sky Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
              {step.number}
            </div>
            <h3 className="font-medium mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
