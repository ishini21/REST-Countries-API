const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }
    
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }
    
   
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

   
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }

   
    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({ 
      email, 
      password: hashed 
    });
    
    await newUser.save();
    
    return res.json({ 
      success:true,
      message: 'User created successfully' 
    });
    
  } catch (err) {
    console.error('Signup error:', err); 
    
   
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: err.message 
      });
    }
    
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }
    
    return res.status(500).json({ 
      message: 'Server error while creating user' 
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not Found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token ,
      success:true,
      message: 'Login successful' 
    
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
};
