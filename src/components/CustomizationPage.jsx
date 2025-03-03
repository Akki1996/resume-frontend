import React, { useEffect, useRef, useState } from "react";
import aiIcon from "../assets/generative.png";
import backIcon from "../assets/back-arrow.png";
import { SiOpenai } from "react-icons/si";
import { message } from "antd";
import axiosinstance from "../utils/Axiossetup";
import { useNavigate } from "react-router-dom";

const CustomizationPage = ({ templateContent, setIsLoading }) => {
  const templateRef = useRef(null);
  const navigate = useNavigate()
  const [modifiedElements, setModifiedElements] = useState({});

  const handleAIClick = async (event) => {
    try {
      setIsLoading(true);
      const icon = event.target;
      const parentElement = icon.parentElement;

      const textNodes = Array.from(parentElement.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (textNodes.length > 0) {
        const originalText = textNodes[0].textContent;
        const sectionType = parentElement.className;

        const response = await axiosinstance.post("/changeTextWithAI", {
          description: originalText,
          sectionType: sectionType,
        });

        if (response.data.optimizedDescription) {
          textNodes[0].textContent = ` ${response.data.optimizedDescription}`;
        }

        setModifiedElements((prev) => ({
          ...prev,
          [parentElement.id]: originalText,
        }));

        if (!parentElement.querySelector("img[alt='Back Icon']")) {
          const backImg = document.createElement("img");
          backImg.src = backIcon;
          backImg.alt = "Back Icon";
          backImg.style.marginLeft = "8px";
          backImg.style.cursor = "pointer";
          backImg.style.verticalAlign = "middle";
          backImg.style.display = "inline";
          backImg.style.width = "28px";
          backImg.style.height = "28px";
          backImg.addEventListener("click", () =>
            handleBackClick(parentElement.id)
          );
          parentElement.appendChild(backImg);
        }
      }
    } catch (err) {
      console.log(err);
      message.error("Failed to generate AI-enhanced text.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = (elementId) => {
    setModifiedElements((prev) => {
      const parentElement = document.getElementById(elementId);
      if (parentElement) {
        const textNodes = Array.from(parentElement.childNodes).filter(
          (node) => node.nodeType === Node.TEXT_NODE
        );

        if (textNodes.length > 0 && prev[elementId]) {
          textNodes[0].textContent = ` ${prev[elementId]}`;
        }

        const backImg = parentElement.querySelector("img[alt='Back Icon']");
        if (backImg) {
          backImg.remove();
        }

        const newModifiedElements = { ...prev };
        delete newModifiedElements[elementId];
        return newModifiedElements;
      }
      return prev;
    });
  };

  useEffect(() => {
    if (templateRef.current) {
      const projectElements = templateRef.current.querySelectorAll(".project");
      projectElements.forEach((project, index) => {
        project.id = `project-${index}`;
        const img = document.createElement("img");
        img.src = aiIcon;
        img.alt = "AI Icon";
        img.style.marginLeft = "8px";
        img.style.cursor = "pointer";
        img.style.verticalAlign = "middle";
        img.style.display = "inline";
        img.style.width = "34px";
        img.style.height = "34px";
        img.addEventListener("click", handleAIClick);
        project.appendChild(img);
      });

      const achievementsElement = templateRef.current.querySelector(".achievement");
      if (achievementsElement) {
        achievementsElement.id = "achievements";
        const img = document.createElement("img");
        img.src = aiIcon;
        img.alt = "AI Icon";
        img.style.cursor = "pointer";
        img.style.marginLeft = "8px";
        img.style.verticalAlign = "middle";
        img.style.display = "inline";
        img.style.width = "38px";
        img.style.height = "38px";
        img.addEventListener("click", handleAIClick);
        achievementsElement.appendChild(img);
      }
    }

    return () => {
      if (templateRef.current) {
        const icons = templateRef.current.querySelectorAll("img[alt='AI Icon']");
        icons.forEach((icon) => {
          icon.removeEventListener("click", handleAIClick);
        });
      }
    };
  }, [templateContent]);

  const removeIcons = () => {
    if (templateRef.current) {
      const icons = templateRef.current.querySelectorAll("img[alt='AI Icon'], img[alt='Back Icon']");
      icons.forEach((icon) => icon.remove());
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      removeIcons();
      const modifiedHTML = templateRef.current.innerHTML;

      const response = await axiosinstance.post("/saveResumeDataUser", { template: modifiedHTML });
      if (response.data.success === true) {
        message.success("Form submitted successfully");
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-12">
        Customise Your Template with AI
      </h1>
      <div className="flex justify-between items-center mb-8">
        <SiOpenai className="text-4xl text-blue-500" />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 !text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <div className="space-y-6">
        <div
          className="p-6"
          ref={templateRef}
          dangerouslySetInnerHTML={{ __html: templateContent }}
        />
      </div>
    </div>
  );
};

export default CustomizationPage;