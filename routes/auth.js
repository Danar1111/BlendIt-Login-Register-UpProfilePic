const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const deleteController = require('../controllers/deleteController');

router.post(
  '/register',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.register(req, res, next);
  }
);

router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.login(req, res, next);
  }
);

router.post(
  '/upload-profile-picture',
  authMiddleware.authMiddleware,
  uploadMiddleware,
  uploadController.uploadProfilePicture
);

router.delete(
  '/delete-profile-picture',
  authMiddleware.authMiddleware,
  deleteController.deleteProfilePicture
);

router.post('/logout', authController.logout);

module.exports = router;
