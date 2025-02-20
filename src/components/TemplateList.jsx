import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import check ico

const TemplateCard = ({ template, isSelected, onClick }) => {
    return (
      <div
        className={`relative card bg-white rounded-lg   shadow-lg overflow-hidden transform transition-all duration-300 hover:border-blue-500 cursor-pointer border-2 ${
          isSelected ? "border-blue-500  ring-blue-500" : "border-gray-300 "
        }`}
        onClick={onClick}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Check Icon for Selected Template */}
        {isSelected && (
          <div className="absolute top-2 right-2 text-blue-500">
            <FaCheckCircle className="w-6 h-6" />
          </div>
        )}
  
        <div className="p-2 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-2 text-center">{template.templateName}</h2>
          <div
            className="flex-1 overflow-auto template-container"
            dangerouslySetInnerHTML={{ __html: template.content }}
          />
        </div>
      </div>
    );
  };
  

  const TemplateList = ({ template, data, setData }) => {
    // Set the first template as selected by default
    useEffect(() => {
      if (template.length > 0 && !data) {
        setData(template[0].id);
      }
    }, [template, data, setData]);
  
    const handleSelectTemplate = (id) => {
      setData(id);
    };
  
    return (
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {template.map((template, index) => (
            <div key={index} className="w-full h-full">
              <TemplateCard
                template={template}
                isSelected={data === template.id}
                onClick={() => handleSelectTemplate(template.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default TemplateList;