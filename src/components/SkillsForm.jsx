import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const SkillsForm = ({ data, setData }) => {
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setData({
        ...data,
        skills: [...(data.skills || []), newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = data.skills.filter((_, i) => i !== index);
    setData({ ...data, skills: updatedSkills });
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setData({
        ...data,
        certifications: [...(data.certifications || []), newCertification.trim()],
      });
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = data.certifications.filter((_, i) => i !== index);
    setData({ ...data, certifications: updatedCertifications });
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setData({
        ...data,
        languages: [...(data.languages || []), newLanguage.trim()],
      });
      setNewLanguage("");
    }
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = data.languages.filter((_, i) => i !== index);
    setData({ ...data, languages: updatedLanguages });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Skills">
        <div className="flex flex-wrap gap-2 mb-2">
          {data.skills?.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 rounded-full px-3 py-1 text-sm"
            >
              {skill}
              <CloseOutlined
                onClick={() => handleRemoveSkill(index)}
                className="!ml-2  !cursor-pointer pt-1"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="h-10 max-w-[300px] w-full"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddSkill}
          >
            Add
          </Button>
        </div>
      </Form.Item>

      <Form.Item label="Certifications">
        <div className="flex flex-wrap gap-2 mb-2">
          {data.certifications?.map((certification, index) => (
            <div
              key={index}
              className="flex items-center bg-green-100 rounded-full px-3 py-1 text-sm"
            >
              {certification}
              <CloseOutlined
                onClick={() => handleRemoveCertification(index)}
                 className="!ml-2  !cursor-pointer pt-1"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Input
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="Add a certification"
            className="h-10 max-w-[300px] w-full"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddCertification}
          >
            Add
          </Button>
        </div>
      </Form.Item>

      <Form.Item label="Languages">
        <div className="flex flex-wrap gap-2 mb-2">
          {data.languages?.map((language, index) => (
            <div
              key={index}
              className="flex items-center bg-purple-100 rounded-full px-3 py-1 text-sm"
            >
              {language}
              <CloseOutlined
                onClick={() => handleRemoveLanguage(index)}
                 className="!ml-2  !cursor-pointer pt-1"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add a language"
             className="h-10 max-w-[300px] w-full"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddLanguage}
             
          >
            Add
          </Button>
        </div>
      </Form.Item>

      <Form.Item label="Achievements">
        <Input.TextArea
          value={data.achievements || ""}
          onChange={(e) =>
            setData({ ...data, achievements: e.target.value })
          }
          placeholder="Enter your achievements"
        />
      </Form.Item>

   
    </Form>
  );
};

export default SkillsForm;