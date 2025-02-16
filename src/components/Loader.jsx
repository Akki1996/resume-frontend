import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <Spin size="large" className="text-white" />
    </div>
  );
};

export default Loader;