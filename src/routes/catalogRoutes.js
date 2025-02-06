import express from 'express';
import {
  getAllCatalog,
  getCatalogById,
} from '../controller/catalogController.js';

const router = express.Router();

// router.post('/catalog', createCatalog);
router.get('/catalog', getAllCatalog);
router.get('/catalog/:id', getCatalogById);
// router.put('/catalog/:id', updateById);
// router.delete('/catalog/:id', deleteCatalog);

export default router;
