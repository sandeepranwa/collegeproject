const mongoose = require('mongoose');
const Notice = require('../../models/notice.model');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Files 'uploads/' folder me store hongi
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Multer Middleware for PDF Upload
const upload = multer({ storage: storage }).single('pdfFile');

// 📌 Send Notice with PDF Upload
const SendNotice = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.json({ msg: "Error uploading file!" });
      }

      const receiver_role = req.body.receiver_role || "student";
      const sender_role = req.body.sender_role;
      const title = req.body.title;
      const message = req.body.message;
      const sender = new mongoose.Types.ObjectId(req.body.sender);
      const pdfFile = req.file ? req.file.filename : null; // If file exists

      await Notice.create({ sender, sender_role, receiver_role, title, message, pdfFile });

      return res.json({ msg: "Notice Sent Successfully!" });
    });
  } catch (error) {
    console.log('Error in notice.controller.js => ', error);
    return res.json({ msg: "Internal Server Error!" });
  }
};

// 📌 Get All Notices
const GetAllNotice = async (req, res) => {
  try {
    const notices = await Notice.find();
    return res.json(notices);
  } catch (error) {
    console.log('Error in notice.controller.js => ', error);
    return res.json({ msg: "Internal Server Error!" });
  }
};

// 📌 Get Single Notice
const GetNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.query.noticeId);
    return res.json(notice);
  } catch (error) {
    console.log('Error in notice.controller.js => ', error);
    return res.json({ msg: "Internal Server Error!" });
  }
};

// 📌 Delete Notice
const DeleteNotice = async (req, res) => {
  try {
    if (!req.query.noticeId) return res.json({ msg: "Error while deleting notice!" });
    await Notice.findByIdAndDelete(req?.query?.noticeId);
    return res.json({ msg: "Notice Deleted Successfully!" });
  } catch (error) {
    console.log('Error in notice.controller.js => ', error);
    return res.json({ msg: "Internal Server Error!" });
  }
};

// 📌 Serve Uploaded PDFs
const express = require('express');
const router = express.Router();
router.use('/uploads', express.static('uploads'));

module.exports = {
  SendNotice,
  GetAllNotice,
  DeleteNotice,
  GetNotice
};
