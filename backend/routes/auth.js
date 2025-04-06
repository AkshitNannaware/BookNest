import express from 'express';
import multer from 'multer';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('photo'), register);
router.post('/login', login);

export default router;
