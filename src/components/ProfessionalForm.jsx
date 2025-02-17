import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Collapse } from "antd";
import { PlusOutlined, CaretRightOutlined, CloseOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const ProfessionalForm = ({ data, setData }) => {
  const [activeKeys, setActiveKeys] = useState([]); 

  const handleChange = (index, field, value) => {
    const updatedExperience = [...data];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setData(updatedExperience);
  };

  const addExperience = () => {
    const newExperience = {
      company: "",
      occupation: "",
      doj: null,
      dor: null,
      projects: [""], 
    };
    setData([...data, newExperience]);


    setActiveKeys([ data.length.toString()]);
  };

  const addProject = (index) => {
    const updatedExperience = [...data];
    updatedExperience[index].projects.push(""); 
    setData(updatedExperience);
    
  };

  const removeExperience = (index) => {
    const updatedExperience = data.filter((_, i) => i !== index);
    setData(updatedExperience);

    setActiveKeys(activeKeys.filter((key) => key !== index.toString()));
  };

  const removeProject = (experienceIndex, projectIndex) => {
    const updatedExperience = [...data];
    updatedExperience[experienceIndex].projects = updatedExperience[
      experienceIndex
    ].projects.filter((_, i) => i !== projectIndex);
    setData(updatedExperience);
  };

  const handlePanelChange = (keys) => {
    setActiveKeys(keys);
  };

  return (
    <Form layout="vertical">
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
        activeKey={activeKeys}
        onChange={handlePanelChange}
      >
        {data.map((exp, index) => (
          <Panel
            header={`Professional Experience ${index + 1}`}
            key={index.toString()}
            className="site-collapse-custom-panel"
            extra={
              <CloseOutlined
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeExperience(index);
                }}
                className="text-red-500 hover:text-red-700"
              />
            }
          >
            <div className="mb-4">
              <Form.Item label="Company Name">
                <Input
                  value={exp.company || ""}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  placeholder="Enter company name"
                  className="h-10"
                />
              </Form.Item>
              <Form.Item label="Occupation">
                <Input
                  value={exp.occupation || ""}
                  onChange={(e) => handleChange(index, "occupation", e.target.value)}
                  placeholder="Enter your role"
                   className="h-10"
                />
              </Form.Item>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Date of Joining">
                  <DatePicker
                    value={exp.doj || null}
                    onChange={(date) => handleChange(index, "doj", date)}
                    className="max-w-[300px] w-full h-10"
                  />
                </Form.Item>
                <Form.Item label="Date of Relieving">
                  <DatePicker
                    value={exp.dor || null}
                    onChange={(date) => handleChange(index, "dor", date)}
                    className="max-w-[300px] w-full h-10"
                  />
                </Form.Item>
              </div>
              <Form.Item label="Projects">
                {exp.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="mb-2 flex items-center gap-2">
                    <Input.TextArea
                      value={project || ""}
                      onChange={(e) => {
                        const updatedProjects = [...exp.projects];
                        updatedProjects[projectIndex] = e.target.value;
                        handleChange(index, "projects", updatedProjects);
                      }}
                      placeholder="Describe your project"
                      className="flex-1"
                    />
                    <CloseOutlined
                      onClick={() => removeProject(index, projectIndex)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => addProject(index)}
                  icon={<PlusOutlined />}
                  className="mt-2"
                >
                  Add Project
                </Button>
              </Form.Item>
            </div>
          </Panel>
        ))}
      </Collapse>
      <Button
        type="dashed"
        onClick={addExperience}
        icon={<PlusOutlined />}
        className="!mt-4"
      >
        Add Experience
      </Button>
    </Form>
  );
};

export default ProfessionalForm;