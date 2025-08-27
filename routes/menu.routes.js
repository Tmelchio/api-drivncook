import express from 'express';
import { getMenus, createMenu } from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getMenus);
router.post('/', createMenu);

export default router;
