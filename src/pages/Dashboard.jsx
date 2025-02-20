import React, { useState, useEffect } from "react";
import { Steps, Button, message } from "antd";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import EducationForm from "../components/EducationForm";
import ProfessionalForm from "../components/ProfessionalForm";
import SkillsForm from "../components/SkillsForm";
import { motion, AnimatePresence } from "framer-motion";
import axiosinstance from "../utils/Axiossetup";
import TemplateList from "../components/TemplateList";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import Loader from "../components/Loader";

const { Step } = Steps;

const Dashboard = () => {
  const [isLoading,setIsLoading]=useState(false)
  const [current, setCurrent] = useState(0);
  const [allTemplates, setAllTemplates] = useState([]);
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
    template_id: "", 
  });

  const handleSubmitForm = async() =>{
    try{
      setIsLoading(true)
      const response = await axiosinstance.post("/resumeData",formData);
      if (response.data.success === true) {
        message.success("Form submitted successfully")
        setFormData({
          personalDetails: {},
          education: [],
          professionalExperience: [],
          skills: {
            skills: [],
            certifications: [],
            achievements: "",
            languages: [],
          },
          template_id: "", 
        })
        setCurrent(0)

      }
    }
    catch(err){
      console.log(err)
      message.error(err?.response?.data?.message);
    }
    finally{
      setIsLoading(false)
    }
  }

  const fetchTemplates = async () => {
    try {
      const response = await axiosinstance.get("/resumeTemplates");
      if (response.data.success === true) {
        setAllTemplates(response.data.templates);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [current]);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setFormData({ ...formData, template_id: templateId });
  };

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
    {
      title: "Choose Template",
      content: (
        <TemplateList
          template={allTemplates}
          data={formData.template_id}
          setData={handleTemplateSelect}
        />
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
     {isLoading && <Loader/>}
      <div className="flex-1 p-8 ">
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
              onClick={() => handleSubmitForm()}
              className="bg-green-500"
            >
              Generate Resume
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;