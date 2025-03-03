import React, { useEffect, useState } from "react";
import { Card, Empty } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2pdf from "html2pdf.js";
import DocViewer from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import axiosinstance from "../utils/Axiossetup";
import Loader from "../components/Loader";

const TemplatesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [pdfUrls, setPdfUrls] = useState({});

  useEffect(() => {
    handleFetchAll();
  }, []);

  const handleFetchAll = async () => {
    try {
      setIsLoading(true);
      const response = await axiosinstance.post("/getAllUserTemplates");
      if (response.data.success === true) {
        setTemplates(response.data.data);
        response.data.data.forEach((template) => {
          convertHtmlToPdf(template.template, template._id);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const convertHtmlToPdf = (html, id) => {
    const element = document.createElement("div");
    element.innerHTML = html;

    html2pdf()
      .set({
        margin: 10,
        filename: `template-${id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .output("blob")
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfUrls((prev) => ({ ...prev, [id]: url }));
      });
  };

  const downloadPdf = (id) => {
    const pdfUrl = pdfUrls[id];
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `template-${id}.pdf`;
      link.click();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-8">
      {isLoading && <Loader />}

      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template._id} className="flex flex-col">
              <Card
                className="shadow-lg hover:shadow-xl transition-shadow min-h-[300px] h-auto"
                cover={
                  <div className="relative">
                    <div
                      className="absolute top-2 right-2 z-10 bg-white border border-gray-700 h-[34px] w-[34px] flex justify-center items-center rounded-full cursor-pointer"
                      onClick={() => downloadPdf(template._id)}
                    >
                      <DownloadOutlined className="text-[18px]" />
                    </div>

                    {pdfUrls[template._id] ? (
                      <div className="h-auto min-h-[400px] overflow-hidden rounded-[6px]">
                        <DocViewer
                          documents={[
                            {
                              uri: pdfUrls[template._id],
                              fileType: "pdf",
                            },
                          ]}
                          config={{
                            header: {
                              disableHeader: true,
                              disableFileName: true,
                            },
                            pdfZoom: {
                              defaultZoom: 1.3,
                            },
                          }}
                        />
                      </div>
                    ) : (
                      <p>Loading preview...</p>
                    )}
                  </div>
                }
              />
              <div className="mt-2 text-center">
                <p className="font-semibold">{template._id}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          description="No resume found"
          className="flex flex-col items-center justify-center h-64"
        />
      )}
    </div>
  );
};

export default TemplatesPage;