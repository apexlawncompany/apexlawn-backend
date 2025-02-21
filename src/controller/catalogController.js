/**
 *  Standardized response function
 */

import {
  getAllCatalogService,
  getAllCatalogByIdService,
  createCatalogService,
} from '../models/catalogModel.js';
import { handleResponse } from '../utils/catchError.js';


export const getAllCatalog = async (req, res, next) => {
  try {
    const getAllCatalogs = await getAllCatalogService();
    handleResponse(
      res,
      200,
      'Fetching all catalogs successfully',
      getAllCatalogs
    );
  } catch (err) {
    next(err);
  }
};

export const getCatalogById = async (req, res, next) => {
  try {
    const catalog = await getAllCatalogByIdService(req.params.id);
    if (!catalog)
      return handleResponse(res, 404, 'Catalog with given id not found');
    handleResponse(res, 200, 'Found catalog successfully', catalog);
  } catch (err) {
    next(err);
  }
};


export const createCatalog = async (req, res, next) => {
  try {
    const catalog = await createCatalogService(req.body);
    handleResponse(res, 201, 'Catalog created successfully', catalog);
  } catch (err) {
    next(err);
  }
};