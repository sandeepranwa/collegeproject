import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Toast from './Toast';
import ModalBox from './Modal';
import { BASE_URL } from '../config/config';
import { useNavigate } from 'react-router-dom';

function SendNotice() {
  document.title = 'BIET | Send Notice';
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState({ role: '', id: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${BASE_URL}/user/detail`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        setCurrentUser({ id: res.data.id, role: res.data.role });
        setLoading(false);
      })
      .catch(err => {
        console.log("SendNotice.jsx => ", err);
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    if (currentUser?.role && currentUser?.id) {
      setData(prevData => ({
        ...prevData,
        sender: currentUser.id,
        sender_role: currentUser.role,
        receiver_role: prevData.receiver_role || 'student'
      }));
    }
  }, [currentUser]);

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    console.log("📌 Form Data Before Submit:", data); // Debugging

    if (!data.receiver_role || !data.title?.trim() || !data.message?.trim()) {
      console.log("❌ Validation Failed! Missing Fields:", {
        receiver_role: data.receiver_role,
        title: data.title,
        message: data.message
      });
      setError('All Fields Required!');
      return;
    }

    setShowModal(true);
  };

  const confirmSubmit = async () => {
    const formData = new FormData();
    formData.append('sender', currentUser.id);
    formData.append('sender_role', currentUser.role);
    formData.append('receiver_role', data.receiver_role || 'student');
    formData.append('title', data.title);
    formData.append('message', data.message);
    if (file) formData.append('pdfFile', file);

    try {
      const response = await axios.post(`${BASE_URL}/management/send-notice`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response?.data?.msg) {
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
      navigate(currentUser?.role === 'management_admin' ? '/management/all-notice' : '/tpo/all-notice');
    } catch (error) {
      console.log('Error while sending notice: ', error);
    }
    setShowModal(false);
  };

  return (
    <>
      <Toast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} delay={3000} position="bottom-end" />
      {loading ? (
        <div className="flex justify-center h-72 items-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl" />
        </div>
      ) : (
        <>
          <div className="my-8 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-2">
              {currentUser?.role === 'management_admin' && (
                <FloatingLabel controlId="floatingSendTo" label={<span>Receiver Role *</span>}>
                  <Form.Select name="receiver_role" value={data?.receiver_role || ""} onChange={handleDataChange}>
                    <option disabled value="">Select Receiver Role...</option>
                    <option value="student">Student</option>
                    <option value="tpo_admin">TPO</option>
                  </Form.Select>
                </FloatingLabel>
              )}
              <FloatingLabel controlId="floatingTitle" label={<span>Title *</span>}>
                <Form.Control type="text" placeholder="Title" name='title' value={data?.title || ""} onChange={handleDataChange} />
              </FloatingLabel>
              <div className="col-span-2">
                <FloatingLabel controlId="floatingMessage" label={<span>Message *</span>}>
                  <Form.Control as="textarea" placeholder="Message" name='message' style={{ height: "200px" }} value={data?.message || ""} onChange={handleDataChange} />
                </FloatingLabel>
              </div>
              <div className="col-span-2">
                <Form.Group controlId="formFile">
                  <Form.Label>Attach PDF (Optional)</Form.Label>
                  <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} />
                </Form.Group>
              </div>
            </div>
            <div className="mt-2 text-center text-red-500">{error && error}</div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button variant="primary" size='lg' onClick={handleSubmit}>
              <i className="fa-regular fa-paper-plane mr-2" /> Send
            </Button>
          </div>
        </>
      )}
      <ModalBox show={showModal} close={closeModal} header="Confirmation" body={`Send Notice with PDF?`} btn="Send" confirmAction={confirmSubmit} />
    </>
  );
}

export default SendNotice;
