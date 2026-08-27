# FinFlow — Backend & Database Architecture

Production-grade RESTful API built for **FinFlow (Student Finance Management Platform)** using Node.js, Express.js, MongoDB, and Mongoose with JWT authentication and bcrypt password hashing.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Security**: CORS, Parameterized Mongoose queries, User Data Isolation
- **Environment**: dotenv

---

## 📁 Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── models/
│   │   ├── User.js               # User schema & password hashing hooks
│   │   ├── Transaction.js        # Transaction schema & indexed queries
│   │   ├── Budget.js             # Budget categories, thresholds & limits
│   │   └── SavingsGoal.js        # Savings milestones & target progress
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Me, Profile update
│   │   ├── transactionController.js # CRUD for user transactions
│   │   ├── budgetController.js   # Category budget management
│   │   ├── savingsController.js  # Savings goals & deposits
│   │   └── dashboardController.js# Aggregated metrics, burn rate & breakdown
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── budgetRoutes.js
│   │   ├── savingsRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer verification & user attachment
│   │   └── errorMiddleware.js    # Centralized JSON error formatting
│   ├── utils/
│   │   └── generateToken.js      # JWT signing helper
│   ├── app.js                    # Express app configuration & middleware
│   └── server.js                 # Entrypoint server runner
├── .env.example
├── .env
├── package.json
└── README.md
```

---

## 🚀 Quickstart & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) running locally on port 27017 or a MongoDB Atlas connection string.

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file from `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/finflow
JWT_SECRET=finflow_super_secure_jwt_secret_key_2026_student_platform
FRONTEND_URL=http://localhost:5173
```

### 4. Start Backend Server
```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

The API will be live at `http://localhost:5000/api/health`.

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new student account & seed starter data | No |
| `POST` | `/api/auth/login` | Login with email & password (returns JWT) | No |
| `GET` | `/api/auth/me` | Get current authenticated user profile | **Yes (Bearer JWT)** |
| `PUT` | `/api/auth/me` | Update profile information & monthly budget | **Yes (Bearer JWT)** |

### 💳 Transactions (`/api/transactions`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/transactions` | Get transactions with search, category, and date filtering | **Yes** |
| `POST` | `/api/transactions` | Log new expense or income transaction | **Yes** |
| `GET` | `/api/transactions/:id` | Get single transaction by ID | **Yes** |
| `PUT` | `/api/transactions/:id` | Update transaction amount, category, or note | **Yes** |
| `DELETE`| `/api/transactions/:id`| Remove transaction & auto-adjust budget spent | **Yes** |

### 🎯 Budgets (`/api/budgets`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/budgets` | Get all category budgets with spent amounts | **Yes** |
| `POST` | `/api/budgets` | Create new category budget limit | **Yes** |
| `PUT` | `/api/budgets/:id` | Update category limit or warning threshold | **Yes** |
| `DELETE`| `/api/budgets/:id`| Delete budget | **Yes** |

### 🏆 Savings Goals (`/api/savings`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/savings` | Get user savings goals & progress | **Yes** |
| `POST` | `/api/savings` | Create new target (e.g. Laptop, Trip, Bootcamp) | **Yes** |
| `PUT` | `/api/savings/:id` | Update goal details or deposit incremental funds | **Yes** |
| `DELETE`| `/api/savings/:id`| Delete savings goal | **Yes** |

### 📊 Dashboard Summary (`/api/dashboard`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/dashboard` | Get real-time totals, monthly balance, category percentages & recent transactions | **Yes** |

---

## 🔒 Security & Data Isolation

1. **Authentication**: All protected routes verify the `Authorization: Bearer <token>` header via `authMiddleware.js`.
2. **Strict Ownership Check**: Every transaction, budget, and savings goal check verifies `resource.userId.equals(req.user._id)`. User A cannot view, edit, or delete User B's records.
3. **Password Security**: Passwords are never stored in plain text and are hashed using bcrypt with salt rounds = 10. `password` field is excluded by default from query results (`select: false`).
4. **CORS Safe**: Configured to accept incoming requests from the frontend client origin (`http://localhost:5173`).
