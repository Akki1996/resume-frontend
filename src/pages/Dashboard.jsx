import React, { useState, useEffect } from "react";
import { Steps, Button } from "antd";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import EducationForm from "../components/EducationForm";
import ProfessionalForm from "../components/ProfessionalForm";
import SkillsForm from "../components/SkillsForm";
import { motion, AnimatePresence } from "framer-motion";

const { Step } = Steps;

const Dashboard = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {},
    education: [],
    professionalExperience: [],
    skills: {
      skills: [],
      certifications: [],
      achievements: "",
      languages: [],
    },
  });


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [current]);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const steps = [
    {
      title: "Personal Details",
      content: (
        <PersonalDetailsForm
          data={formData.personalDetails}
          setData={(data) =>
            setFormData({ ...formData, personalDetails: data })
          }
        />
      ),
    },
    {
      title: "Education",
      content: (
        <EducationForm
          data={formData.education}
          setData={(data) => setFormData({ ...formData, education: data })}
        />
      ),
    },
    {
      title: "Professional Experience",
      content: (
        <ProfessionalForm
          data={formData.professionalExperience}
          setData={(data) =>
            setFormData({ ...formData, professionalExperience: data })
          }
        />
      ),
    },
    {
      title: "Skills & Certifications",
      content: (
        <SkillsForm
          data={formData.skills}
          setData={(data) => setFormData({ ...formData, skills: data })}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Steps current={current} className="!mb-8">
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          {steps[current].content}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        {current > 0 && (
          <Button onClick={prev} className="bg-gray-500 text-white">
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} className="bg-blue-500">
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => console.log("Form Data:", formData)}
            className="bg-green-500"
          >
            Generate Resume
          </Button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;