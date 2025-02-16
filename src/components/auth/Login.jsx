import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axiosinstance from "../../utils/Axiossetup"; 
import Loader from "../Loader";

const Login = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true); 
    try {
      const payload = {
        email: values.email,
        password: values.password,
      };
      const response = await axiosinstance.post("/login", payload); 
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token); 
        message.success(" Login successful!");
        navigate("/"); 
      }
    } catch (error) {
      message.error(error?.response?.data?.message||" Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
        </div>

        <div className="flex justify-center !mb-10">
          <button className="px-4 py-2 font-semibold border-b-2 border-blue-600 !text-blue-600 !text-[18px]">
            Login
          </button>
          <Link
            to="/signup"
            className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-800 !text-[18px]"
          >
            Sign Up
          </Link>
        </div>

       {loading && <Loader/>}
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-600 pr-2 text-[18px]" />}
                placeholder="Email"
                className="h-12 ml-2" // Increased height
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-600 pr-2 text-[18px]" />}
                placeholder="Password"
                className="h-12" // Increased height
              />
            </Form.Item>

            <Form.Item className="!mt-[-20px]">
              <Link
                to="#"
                className="float-right text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 !h-10 " // Increased height
                disabled={loading} // Disable button while loading
              >
                Login
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  );
};

export default Login;