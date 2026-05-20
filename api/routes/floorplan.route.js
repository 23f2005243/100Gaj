import express from 'express';
import { generateFloorPlan } from '../controllers/floorplan.controller.js';

const router = express.Router();

router.post('/generate', generateFloorPlan);

export default router;
