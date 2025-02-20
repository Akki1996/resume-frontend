import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0   bg-gray-200 opacity-30"></div>
      <Spin tip="Loading" size="large">
       
      </Spin>
    </div>
  );
};

export default Loader;