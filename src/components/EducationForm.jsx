import React, { useState } from "react";
import { Form, Input, DatePicker, InputNumber, Button, Collapse } from "antd";
import { PlusOutlined, CaretRightOutlined, CloseOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const EducationForm = ({ data, setData }) => {
  const [activeKeys, setActiveKeys] = useState([]);

  const handleChange = (index, field, value) => {
    const updatedEducation = [...data];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setData(updatedEducation);
  };

  const addEducation = () => {
    const newEducation = {};
    setData([...data, newEducation]);

    setActiveKeys([data.length.toString()]);
  };

  const removeEducation = (index) => {
    const updatedEducation = data.filter((_, i) => i !== index);
    setData(updatedEducation);

    setActiveKeys(activeKeys.filter((key) => key !== index.toString()));
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
        {data.map((edu, index) => (
          <Panel
            header={`Education ${index + 1}`}
            key={index.toString()} 
            className="site-collapse-custom-panel"
            extra={
              <CloseOutlined
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeEducation(index);
                }}
                className="text-red-500 hover:text-red-700"
              />
            }
          >
            <div className="mb-4">
              <Form.Item label="Institute">
                <Input
                  value={edu.institute || ""}
                  onChange={(e) =>
                    handleChange(index, "institute", e.target.value)
                  }
                  placeholder="Enter institute name"
                  className="h-10"
                />
              </Form.Item>
              <Form.Item label="Degree">
                <Input
                  value={edu.degree || ""}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  placeholder="Enter degree"
                   className="h-10"
                />
              </Form.Item>
              <Form.Item label="Field of Study">
                <Input
                  value={edu.fieldOfStudy || ""}
                  onChange={(e) =>
                    handleChange(index, "fieldOfStudy", e.target.value)
                  }
                  placeholder="Enter field of study"
                   className="h-10"
                />
              </Form.Item>
              <div className="grid grid-cols-3 gap-4">
                <Form.Item label="CGPA">
                  <InputNumber
                    value={edu.cgpa || ""}
                    onChange={(value) => handleChange(index, "cgpa", value)}
                    placeholder="Enter CGPA"
                    className="!w-full h-10"
                  />
                </Form.Item>
                <Form.Item label="Start Date">
                  <DatePicker
                    value={edu.startDate || null}
                    onChange={(date) => handleChange(index, "startDate", date)}
                    className="w-full h-10"
                  
                  />
                </Form.Item>
                <Form.Item label="End Date">
                  <DatePicker
                    value={edu.endDate || null}
                    onChange={(date) => handleChange(index, "endDate", date)}
                    className="w-full h-10"
                  />
                </Form.Item>
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>
      <Button
        type="dashed"
        onClick={addEducation}
        icon={<PlusOutlined />}
        className="!mt-4"
      >
        Add Education
      </Button>
    </Form>
  );
};

export default EducationForm;