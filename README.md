# EcoMart - E-Commerce Platform

A full-stack e-commerce application built with modern web technologies. EcoMart provides a complete shopping experience with product browsing, cart management, secure payments, and order tracking.

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt/Bcryptjs
- **File Upload**: Multer
- **Image Hosting**: Cloudinary
- **Payment Gateway**: Razorpay
- **API**: RESTful API with CORS support

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui with Radix UI
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: Sonner
- **Icons**: Lucide React & React Icons

## 📋 Project Structure

```
ecomart/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Configuration files (Razorpay, etc.)
│   ├── controllers/        # Route controllers
│   ├── database/           # MongoDB connection
│   ├── middleware/         # Auth & file upload middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (Cloudinary, DataURI)
│   ├── package.json
│   └── server.js           # Entry point
│
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── pages/          # Page components
    │   ├── redux/          # Redux store & slices
    │   ├── lib/            # Utility functions
    │   ├── assets/         # Static assets
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Entry point
    ├── public/             # Static public files
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🛠 Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance - MongoDB Atlas)
- **Cloudinary** account (for image hosting)
- **Razorpay** account (for payment processing)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecomart
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Install Dependencies
```bash
npm install
```

#### Create Environment Variables
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/ecomart
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecomart

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### Start Backend Server
```bash
npm start
# Server will run on http://localhost:3000
```

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Create Environment Variables (if needed)
Create a `.env.local` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

#### Start Development Server
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

#### Build for Production
```bash
npm run build
npm run preview
```

## 📚 API Endpoints

### User Routes (`/api/v1/user`)
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /logout` - User logout

### Product Routes (`/api/v1/product`)
- `GET /` - Get all products
- `GET /:id` - Get single product
- `POST /` - Create new product (admin)
- `PUT /:id` - Update product (admin)
- `DELETE /:id` - Delete product (admin)

### Cart Routes (`/api/v1/cart`)
- `GET /` - Get user's cart
- `POST /add` - Add item to cart
- `PUT /update/:itemId` - Update cart item quantity
- `DELETE /remove/:itemId` - Remove item from cart
- `DELETE /clear` - Clear entire cart

### Order Routes (`/api/v1/orders`)
- `GET /` - Get user's orders
- `POST /create` - Create new order
- `GET /:id` - Get order details
- `PUT /:id/cancel` - Cancel order
- `POST /payment-verify` - Verify Razorpay payment

## 🔐 Authentication

The application uses JWT-based authentication:
- Tokens are issued on user login
- Tokens are stored in secure HTTP-only cookies
- Protected routes require valid JWT tokens
- `isAuthenticated` middleware validates tokens on protected endpoints

## 🏪 Key Features

### User Features
- User registration and authentication
- User profile management
- Product browsing and searching
- Product filtering by category
- Shopping cart management
- Order placement and tracking
- Secure payment via Razorpay
- Order history

### Admin Features
- Product management (Add, Edit, Delete)
- Order management
- Sales analytics dashboard
- User management
- Order tracking and status updates

### Technical Features
- Secure password hashing with Bcrypt
- Image uploads via Cloudinary
- Responsive design with Tailwind CSS
- Real-time notifications with Sonner
- Redux state persistence
- Protected routes
- Error handling and validation

## 📁 Database Models

### User Model
- Email, Password, Name
- Phone, Address information
- Role (user/admin)
- Profile picture (Cloudinary)
- Timestamps

### Product Model
- Name, Description, Price
- Category, Stock quantity
- Product images (Cloudinary)
- Ratings and reviews
- Timestamps

### Cart Model
- User reference
- Product items with quantity
- Timestamps

### Order Model
- User reference
- Products with quantity and price
- Shipping address
- Order status (pending, shipped, delivered, etc.)
- Payment information
- Order total
- Timestamps

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run build
npm run preview
```

## 📦 Dependencies Overview

### Backend Key Dependencies
- **express** - Web framework
- **mongoose** - MongoDB object modeling
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **cloudinary** - Cloud image storage
- **razorpay** - Payment processing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend Key Dependencies
- **react** - UI framework
- **vite** - Build tool
- **react-router-dom** - Client-side routing
- **@reduxjs/toolkit** - State management
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **shadcn/ui** - Component library
- **recharts** - Charting library

## 🔍 Linting & Code Quality

### Frontend Linting
```bash
cd frontend
npm run lint
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check MongoDB Atlas connection string
- Verify `MONGO_URI` in `.env` file is correct

### Cloudinary Issues
- Verify Cloudinary credentials in `.env`
- Check image upload permissions

### Razorpay Payment Issues
- Verify API keys in `.env`
- Ensure Razorpay account is in test mode for development

### CORS Issues
- Frontend runs on `http://localhost:5173`
- Backend CORS is configured to accept requests from this origin
- Ensure URLs match in the application

### Port Already in Use
- Backend default port: 3000
- Frontend default port: 5173
- Change ports in `.env` files if needed

## 📝 Environment Variables Checklist

### Backend `.env`
- [ ] PORT
- [ ] MONGO_URI
- [ ] JWT_SECRET
- [ ] CLOUDINARY_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] RAZORPAY_KEY_ID
- [ ] RAZORPAY_KEY_SECRET

### Frontend `.env.local`
- [ ] VITE_API_URL

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📧 Support

For support, please create an issue in the repository or contact the development team.

---

**Happy Coding! 🎉**
