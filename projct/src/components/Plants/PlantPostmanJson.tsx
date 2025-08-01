import React from 'react';

const PlantPostmanJson = () => {
  const jsonExample = {
    name: "string",
    scientificName: "string",
    category: "string",
    image: "string",
    wateringFrequency: "string",
    sunlight: "string",
    temperature: "string",
    isFlowering: true,
    nextWatering: "string",
    healthStatus: "string"
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Create Plant JSON Format</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(jsonExample, null, 2)}
      </pre>
    </div>
  );
};

export default PlantPostmanJson;
