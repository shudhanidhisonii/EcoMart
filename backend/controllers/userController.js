import User from '../models/userModel.js'

import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cloudinary from '../utils/cloudinary.js'


// ================= REGISTER =================

export const register = async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      password
    } = req.body

    if (!firstName || !lastName || !email || !password) {

      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })

    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    // JWT TOKEN
    const accessToken = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    )

    const user = await User.findById(newUser._id)
      .select("-password")

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
      accessToken
    })

  } catch (e) {

    return res.status(500).json({
      success: false,
      message: e.message
    })

  }

}


// ================= LOGIN =================

export const login = async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })

    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {

      return res.status(400).json({
        success: false,
        message: "User does not exist"
      })

    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordValid) {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })

    }

    // JWT TOKEN
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    )

    const user = await User.findById(existingUser._id)
      .select("-password")

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.firstName}`,
      user,
      accessToken
    })

  } catch (e) {

    return res.status(500).json({
      success: false,
      message: e.message
    })

  }

}



// ================= GET ALL USERS =================

export const allUser = async (_, res) => {

  try {

    const users = await User.find()
      .select("-password")

    return res.status(200).json({
      success: true,
      users
    })

  } catch (e) {

    return res.status(500).json({
      success: false,
      message: e.message
    })

  }

}


// ================= GET USER BY ID =================

export const getUserById = async (req, res) => {

  try {

    const { userId } = req.params

    const user = await User.findById(userId)
      .select("-password")

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      })

    }

    return res.status(200).json({
      success: true,
      user
    })

  } catch (e) {

    return res.status(500).json({
      success: false,
      message: e.message
    })

  }

}


// ================= CHANGE PASSWORD =================

export const changePassword = async (req, res) => {

  try {

    const { newPassword, confirmPassword } = req.body
    const { email } = req.params

    const user = await User.findOne({ email })

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User not found"
      })

    }

    if (!newPassword || !confirmPassword) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })

    }

    if (newPassword !== confirmPassword) {

      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      })

    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword

    await user.save()

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    })

  } catch (e) {

    return res.status(500).json({
      success: false,
      message: e.message
    })

  }

}


// ================= UPDATE USER =================

export const updateUser = async (req, res) => {

  try {

    const userIdToUpdate = req.params.id
    const loggedInUser = req.user

    const {
      firstName,
      lastName,
      address,
      city,
      zipcode,
      phoneNo,
      role
    } = req.body

    // Authorization Check
    if (
      loggedInUser._id.toString() !== userIdToUpdate &&
      loggedInUser.role !== "admin"
    ) {

      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile"
      })

    }

    let user = await User.findById(userIdToUpdate)

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      })

    }

    let profilePic = user.profilePic
    let profilePicPublicId = user.profilePicPublicId

    // Upload new image
    if (req.file) {

      if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicId)
      }

      const uploadResult = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {

            if (error) reject(error)
            else resolve(result)

          }
        )

        stream.end(req.file.buffer)

      })

      profilePic = uploadResult.secure_url
      profilePicPublicId = uploadResult.public_id

    }

    // Update fields
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.address = address || user.address
    user.city = city || user.city
    user.zipcode = zipcode || user.zipcode
    user.phoneNo = phoneNo || user.phoneNo
    user.role = role || user.role
    user.profilePic = profilePic
    user.profilePicPublicId = profilePicPublicId

    const updatedUser = await user.save()

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    })

  } catch (e) {

    return res.status(500).json({
      success: false,
      message: e.message
    })

  }

}