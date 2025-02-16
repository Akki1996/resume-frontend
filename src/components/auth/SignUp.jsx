import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axiosinstance from "../../utils/Axiossetup";
import Loader from "../Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage loading

  const onFinish = async (values) => {
    setLoading(true); 
    try {
      const payload = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
      };
      const response = await axiosinstance.post("/register", payload);
      if (response.status === 201) {
        message.success(" Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      message.error(error?.response?.data?.message||" Registration failed. Please try again.");
      console.error("Registration error:", error);
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
          <Link
            to="/login"
            className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-800 !text-[18px]"
          >
            Login
          </Link>
          <button className="px-4 py-2 font-semibold border-b-2 border-blue-600 !text-blue-600 !text-[18px]">
            Sign Up
          </button>
        </div>

        {loading && <Loader/>}
          <Form
            name="signup-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Please input your first name!" }]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-600 pr-2 text-[18px]" />}
                placeholder="First Name"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Please input your last name!" }]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-600 pr-2 text-[18px]" />}
                placeholder="Last Name"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="!text-gray-600 pr-2 text-[18px]" />}
                placeholder="Email"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-600 pr-2 text-[18px]" />}
                placeholder="Password"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("You must agree to the terms and conditions!"),
                },
              ]}
            >
              <Checkbox>
                By signing up, I agree to the{" "}
                <Link to="#" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 !h-10 mx-1 !mt-4"
                disabled={loading} // Disable button while loading
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  );
};

export default SignUp;