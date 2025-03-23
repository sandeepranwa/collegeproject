import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/CPMS.png';
import Toast from '../../components/Toast';
import isAuthenticated from '../../utility/auth.utility';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BASE_URL } from '../../config/config';

function Login() {
  document.title = 'BIET | Student Login';
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isEyeOpen, setEyeOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../student/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError({
      email: !email ? 'Email Required!' : '',
      password: !password ? 'Password Required!' : ''
    });

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/student/login`, formData);
      localStorage.setItem('token', response.data.token);
      navigate('../student/dashboard');
    } catch (error) {
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.log("Error in Student login.jsx => ", error);
      setLoading(false);
    }
  };

  const { showToastPass, toastMessagePass } = location.state || { showToastPass: false, toastMessagePass: '' };
  useEffect(() => {
    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(showToastPass);
      navigate('.', { replace: true, state: {} });
    }
  }, []);

  const handleEye = () => setEyeOpen(!isEyeOpen);

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-white">
        <Form className="backdrop-blur-md bg-white border border-gray-200 rounded-2xl p-10 shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <img className="rounded-xl shadow-lg w-28 h-28 mx-auto" src={Logo} alt="Logo" />
            <h1 className="text-3xl font-extrabold mt-4 text-gray-800">Student Login</h1>
          </div>

          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label className="text-gray-700">Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleChange} isInvalid={!!error.email} className="focus:ring-2 focus:ring-gray-400" />
            <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label className="text-gray-700">Password</Form.Label>
            <InputGroup>
              <Form.Control type={isEyeOpen ? "text" : "password"} placeholder="Password" name="password" value={password} onChange={handleChange} isInvalid={!!error.password} className="focus:ring-2 focus:ring-gray-400" />
              <Button variant="outline-secondary" onClick={handleEye} className="hover:bg-gray-400 hover:text-white">
                <i className={`fa ${isEyeOpen ? "fa-eye" : "fa-eye-slash"}`}></i>
              </Button>
              <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition-all duration-300" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Log In'}
          </Button>

          <div className="text-center mt-4">
            <span className="text-gray-700">Don't have an account? </span>
            <span className="text-gray-900 font-semibold cursor-pointer hover:underline" onClick={() => navigate('../student/signup')}>
              Sign Up
            </span>
          </div>

          <p className="text-center text-gray-500 mt-4">© College Placement Management System 2024 - 25</p>
        </Form>
      </div>
    </>
  );
}

export default Login;
