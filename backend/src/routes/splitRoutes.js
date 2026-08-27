import express from 'express';
import { 
  getSplits, 
  createSplit, 
  toggleParticipantPaid, 
  deleteSplit 
} from '../controllers/splitController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getSplits)
  .post(createSplit);

router.route('/:id')
  .delete(deleteSplit);

router.route('/:id/toggle-paid')
  .put(toggleParticipantPaid);

export default router;
