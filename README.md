# 🍽️ PlateShare - Community Food Sharing Platform

**Live Site URL:** (https://assignment-10-plateshare.web.app/)                                              

## 🌟 About PlateShare

PlateShare is a full-stack MERN application that connects food donors with people in need, creating a sustainable solution to reduce food waste while supporting local communities. Our platform makes it easy for individuals and businesses to share surplus food, ensuring it reaches those who need it most through a secure, intuitive, and user-friendly interface.

## ✨ Key Features

### 🔐 Authentication & Security
- **Firebase Authentication** - Secure email/password and social login options
- **Protected Routes** - Role-based access control for different user types
- **Session Management** - Persistent login state with secure token handling

### 🍕 Food Sharing & Management
- **Easy Food Listing** - Simple form with auto-filled donor information
- **Real-time Updates** - Instant status changes and availability tracking
- **Smart Status System** - Automatic updates from 'available' to 'donated'
- **Image Support** - Visual representation of shared food items

### 🤝 Community Engagement
- **Food Request System** - Users can request available food with contact details
- **Location-based** - Find food donations in your area
- **Request Management** - Donors can accept or reject incoming requests
- **Communication Tools** - Built-in contact system between donors and recipients

### 📱 User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation** - Clean, user-friendly interface
- **Real-time Notifications** - Instant updates on food requests and status changes

## 🛠️ Technology Stack

**Frontend:**
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "tailwindcss": "^3.2.0",
  "firebase": "^9.17.0",
  "react-hot-toast": "^2.4.0"
}
```

**Backend:**
```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0",
  "nodemon": "^2.0.0"
}
```

### Deployment & Services
- **Frontend Hosting**: - Firebase Hosting

- **Backend Hosting**: - Vercel/Railway

- **Database**: - MongoDB Atlas

- **Authentication**: - Firebase Auth

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Firebase project for authentication

### Installation
1. Clone the repository
   ```bash
   bash
   git clone https://github.com/your-username/plateshare.git
   cd plateshare
   ```
2. Install dependencies
   ```bash
   bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies  
   cd ../server
   npm install
   ```
   
3. Environment Setup
   ```env
   env
   MONGODB_URI=your_mongodb_connection_string
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project_auth_domain
   CLIENT_URL=http://localhost:3000
   ```

   Create .env file in client directory:
   ```env
   env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_FIREBASE_CONFIG=your_firebase_config
   ```
5. Run the application
   ```bash
   bash
   # Start backend server (from server directory)
    npm run dev
   # Start frontend client (from client directory)  
    npm start
    ```  
7. Access the application
- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:3000

## 📁 Project Structure
```
text
plateshare/
├── client/                      #React frontend application
│   ├── public/                 #Static assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   └── src/                    # Source code
│       ├── components/         # Reusable UI components
│       │   ├── common/         # Shared components
│       │   │   ├── Header.js
│       │   │   ├── Footer.js
│       │   │   └── LoadingSpinner.js
│       │   ├── forms/          # Form components
│       │   │   ├── FoodForm.js
│       │   │   ├── RequestForm.js
│       │   │   └── AuthForm.js
│       │   └── ui/             # Basic UI elements
│       │       ├── Button.js
│       │       ├── Card.js
│       │       └── Modal.js
│       ├── contexts/           # React contexts
│       │   └── AuthContext.js  # Authentication context
│       ├── pages/              # Route components
│       │   ├── Home.js         # Landing page
│       │   ├── Dashboard/      # User dashboard
│       │   │   ├── DonorDashboard.js
│       │   │   └── UserDashboard.js
│       │   ├── Food/           # Food-related pages
│       │   │   ├── FoodList.js
│       │   │   ├── FoodDetails.js
│       │   │   └── AddFood.js
│       │   └── Auth/           # Authentication pages
│       │       ├── Login.js
│       │       ├── Register.js
│       │       └── Profile.js
│       ├── layouts/            # Layout components
│       │   ├── MainLayout.js   # Main app layout
│       │   └── AuthLayout.js   # Auth pages layout
│       ├── hooks/              # Custom React hooks
│       │   ├── useAuth.js
│       │   └── useFood.js
│       ├── utils/              # Utility functions
│       │   ├── constants.js
│       │   ├── helpers.js
│       │   └── validators.js
│       ├── styles/             # Global styles
│       │   ├── index.css
│       │   └── components.css
│       ├── App.js              # Main App component
│       ├── index.js            # App entry point
│       └── routes.js           # Route configuration
├── server/                     # Express backend application
│   ├── controllers/            # Route controllers
│   │   ├── authController.js
│   │   ├── foodController.js
│   │   └── requestController.js
│   ├── models/                 # MongoDB models
│   │   ├── User.js             # User schema
│   │   ├── Food.js             # Food listing schema
│   │   └── Request.js          # Food request schema
│   ├── routes/                 # API routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── food.js             # Food management routes
│   │   └── requests.js         # Request management routes
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # Authentication middleware
│   │   ├── validation.js       # Input validation
│   │   └── errorHandler.js     # Error handling
│   ├── config/                 # Configuration files
│   │   ├── database.js         # MongoDB connection
│   │   └── firebase.js         # Firebase configuration
│   ├── utils/                  # Server utilities
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── emailService.js
│   ├── app.js                  # Express app configuration
│   └── server.js               # Server entry point
└── README.md                   # Project documentation
```

## 🔧 Available Scripts
### Frontend Scripts
### Backend Scripts

## 🗄️ API Endpoints
### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user

### Food Management
- GET /api/food - Get all food listings
- POST /api/food - Create new food listing
- PUT /api/food/:id - Update food listing
- DELETE /api/food/:id - Delete food listing
- GET /api/food/user/:userId - Get user's food listings

### Request Management
- POST /api/requests - Create food request 
- GET /api/requests/food/:foodId - Get requests for specific food
- PUT /api/requests/:id - Update request status

## 🌐 Deployment
### Frontend Deployment (Firebase)
```bash
bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

### Backend Deployment (Vercel)
- Connect GitHub repository to Vercel
- Configure environment variables
- Automatic deployments on push to main branch

## 🤝 Contributing
We welcome contributions! Please feel free to submit pull requests, report bugs, or suggest new features.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors
Name - noushinanikakhan

## 🙏 Acknowledgments
- Firebase for authentication services
- MongoDB Atlas for database hosting
- Tailwind CSS for the styling framework
- React community for excellent documentation
