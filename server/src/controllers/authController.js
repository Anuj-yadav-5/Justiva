import { store } from '../services/storage/store.js';

export const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    
    // In demo / test mode, allow demo login or any valid email
    let user = store.getUserByEmail(email || 'anuj@lawvanta.ai');
    if (!user) {
      user = store.createUser({
        name: email.split('@')[0] || 'User',
        email: email,
        role: 'user'
      });
    }

    const token = 'justiva-jwt-demo-token-' + user.id;

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  },

  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: { message: 'Email is required' } });
    }

    let existing = store.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'User already exists with this email' } });
    }

    const user = store.createUser({
      name: name || email.split('@')[0],
      email,
      role: 'user'
    });

    const token = 'justiva-jwt-demo-token-' + user.id;

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  },

  me: async (req, res) => {
    // Default to the first demo user
    const user = store.getUserById('user-demo-1') || store.users[0];
    res.json({
      success: true,
      user
    });
  }
};
