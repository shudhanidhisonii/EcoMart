import express from 'express'

import {
  allUser,
  changePassword,
  getUserById,
  login,
  register,
  updateUser
} from '../controllers/userController.js'

import {
  isAdmin,
  isAuthenticated
} from '../middleware/isAuthenticated.js'

import { singleUpload } from '../middleware/multer.js'

const router = express.Router()


// Auth Routes
router.post('/register', register)
router.post('/login', login)



// User Routes
router.get('/all-user', isAuthenticated, isAdmin, allUser)
router.get('/get-user/:userId', getUserById)


// Password Route
router.post('/change-password/:email', changePassword)


// Update Profile
router.put(
  '/update/:id',
  isAuthenticated,
  singleUpload,
  updateUser
)

export default router