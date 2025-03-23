const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://ishwarprajapat5454:X4oAkWritR9U1ENj@collage.lz1dd.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  first_name: { type: String, trim: true },
  middle_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  email: { type: String, required: true, unique: true, trim: true },
  number: { type: Number },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'tpo_admin', 'management_admin', 'superuser'], required: true },
  profile: { type: String, default: '/profileImgs/default/defaultProfileImg.jpg' },
  fullAddress: {
    address: { type: String },
    pincode: { type: Number }
  },
  dateOfBirth: { type: Date },
  createdAt: { type: Date, default: new Date() },
  token: { type: String },
  isProfileCompleted: { type: Boolean, default: false }
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', UserSchema);

// Users data
const users = [
  {
    first_name: 'Rahul',
    middle_name: '',
    last_name: 'Sharma',
    gender: 'Male',
    email: 'rahul.sharma@example.com',
    number: 9876543210,
    password: 'password123',
    role: 'student',
    fullAddress: {
      address: '123 Main Street',
      pincode: 110001
    },
    dateOfBirth: new Date('2000-05-15')
  },
  {
    first_name: 'Priya',
    middle_name: 'K.',
    last_name: 'Verma',
    gender: 'Female',
    email: 'priya.verma@example.com',
    number: 9876543211,
    password: 'password456',
    role: 'tpo_admin',
    fullAddress: {
      address: '456 Park Avenue',
      pincode: 110002
    },
    dateOfBirth: new Date('1998-08-20')
  },
  {
    first_name: 'Aman',
    middle_name: '',
    last_name: 'Singh',
    gender: 'Male',
    email: 'aman.singh@example.com',
    number: 9876543212,
    password: 'password789',
    role: 'management_admin',
    fullAddress: {
      address: '789 Oak Street',
      pincode: 110003
    },
    dateOfBirth: new Date('1995-12-05')
  },
  {
    first_name: 'Simran',
    middle_name: '',
    last_name: 'Kaur',
    gender: 'Female',
    email: 'simran.kaur@example.com',
    number: 9876543213,
    password: 'password321',
    role: 'superuser',
    fullAddress: {
      address: '321 Pine Street',
      pincode: 110004
    },
    dateOfBirth: new Date('1997-03-22')
  }
];

// Save users with hashed passwords
const saveUsers = async () => {
  try {
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }
    console.log('Users successfully saved with hashed passwords!');
  } catch (err) {
    console.log('Error saving users:', err);
  } finally {
    mongoose.connection.close();
  }
};

saveUsers();
