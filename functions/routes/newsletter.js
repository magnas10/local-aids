const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const { body, validationResult } = require('express-validator');

// Subscribe to newsletter
router.post(
  '/subscribe',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address')
  ],
  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: errors.array()[0].msg,
          errors: errors.array() 
        });
      }

      const { email } = req.body;

      // Check if email already exists
      let subscriber = await Newsletter.findOne({ where: { email } });

      if (subscriber) {
        if (subscriber.isActive) {
          return res.status(400).json({
            message: 'This email is already subscribed to our newsletter'
          });
        } else {
          // Reactivate subscription
          subscriber.isActive = true;
          subscriber.subscribedAt = new Date();
          subscriber.unsubscribedAt = null;
          await subscriber.save();
          
          return res.status(200).json({
            message: 'Welcome back! Your subscription has been reactivated',
            subscriber: {
              email: subscriber.email,
              subscribedAt: subscriber.subscribedAt
            }
          });
        }
      }

      // Create new subscription
      subscriber = await Newsletter.create({ email });

      res.status(201).json({
        message: 'Thank you for subscribing! You\'ll receive updates on community impact and volunteer opportunities',
        subscriber: {
          email: subscriber.email,
          subscribedAt: subscriber.subscribedAt
        }
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({
        message: 'An error occurred while processing your subscription. Please try again later'
      });
    }
  }
);

// Unsubscribe from newsletter
router.post(
  '/unsubscribe',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: errors.array()[0].msg 
        });
      }

      const { email } = req.body;

      const subscriber = await Newsletter.findOne({ where: { email } });

      if (!subscriber) {
        return res.status(404).json({
          message: 'Email address not found in our subscription list'
        });
      }

      if (!subscriber.isActive) {
        return res.status(400).json({
          message: 'This email is already unsubscribed'
        });
      }

      subscriber.isActive = false;
      subscriber.unsubscribedAt = new Date();
      await subscriber.save();

      res.status(200).json({
        message: 'You have been successfully unsubscribed from our newsletter'
      });
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      res.status(500).json({
        message: 'An error occurred while processing your request. Please try again later'
      });
    }
  }
);

// Get subscription status (optional - for users to check their status)
router.get('/status/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    
    const subscriber = await Newsletter.findOne({ where: { email } });

    if (!subscriber) {
      return res.status(404).json({
        subscribed: false,
        message: 'Email not found'
      });
    }

    res.status(200).json({
      subscribed: subscriber.isActive,
      subscribedAt: subscriber.subscribedAt,
      email: subscriber.email
    });
  } catch (error) {
    console.error('Newsletter status check error:', error);
    res.status(500).json({
      message: 'An error occurred while checking subscription status'
    });
  }
});

module.exports = router;
