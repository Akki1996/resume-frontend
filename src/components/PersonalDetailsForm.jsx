import React, { useState } from "react";
import { Form, Input, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const PersonalDetailsForm = ({ data, setData }) => {
  const [activeKeys, setActiveKeys] = useState(["0"]); 

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handlePanelChange = (keys) => {
    setActiveKeys(keys);
  };

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      className="site-collapse-custom-collapse"
      activeKey={activeKeys}
      onChange={handlePanelChange}
    >
      <Panel header="Personal Details" key="0" className="site-collapse-custom-panel">
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={data.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your name"
              className="h-10"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              className="h-10"
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="h-10"
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input.TextArea
              value={data.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter your address"
            />
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default PersonalDetailsForm;