import express from 'express';
import {
  getAllCatalog,
  getCatalogById,
  createCatalog,
} from '../controller/catalogController.js';
import { authenticateUser } from '../controller/authController.js';
const router = express.Router();

router.post('/catalog', authenticateUser, createCatalog);
router.get('/catalog', getAllCatalog);
router.get('/catalog/:id', getCatalogById);
// router.put('/catalog/:id', updateById);
// router.delete('/catalog/:id', deleteCatalog);

export default router;
