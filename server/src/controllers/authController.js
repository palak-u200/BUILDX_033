import User from '../models/User.js';
import Role from '../models/Role.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('role');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        department: user.department,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register a new user (Internal Gov use only)
// @route   POST /api/auth/register
// @access  Private/Super Admin
export const registerUser = async (req, res) => {
  const { name, email, password, roleName, department } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role._id,
      department
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate('role');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      department: user.department
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
