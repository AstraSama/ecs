import express from 'express';
import { index, show, store, update, destroy } from "../controllers/post_controller.js";

const router = express.Router();

router.get('/', index); // retrieve all users
router.get('/:id', show); // retrieve a user by id
router.post('/', store); // create a new user
router.put('/:id', update); // update a user
router.delete('/:id', destroy); // delete a user

export default router;