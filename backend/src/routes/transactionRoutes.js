import express from 'express';
import { 
  getTransactions, 
  createTransaction, 
  getTransactionById, 
  updateTransaction, 
  deleteTransaction 
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All transaction routes are protected
router.use(protect);

router.route('/')
  .get(getTransactions)
  .post(createTransaction);

router.route('/:id')
  .get(getTransactionById)
  .put(updateTransaction)
  .delete(deleteTransaction);

export default router;
