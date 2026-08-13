# AutoFix360

AutoFix360 is a vehicle repair and automobile service management web application.

The application allows users to:
- Create an account and log in
- Browse automobile products
- Add products to cart and wishlist
- Place and manage orders
- Book vehicle repair services
- Provide vehicle and repair details
- View available products and offers

The application also includes an admin section for managing users, products, and repair-related information.

## Features

### User Features
- User Registration and Login
- Vehicle Repair Booking
- Product Browsing
- Shopping Cart
- Wishlist
- Order Management
- Insurance Information
- Product Offers

### Admin Features
- Admin Login
- Admin Dashboard
- Product Management
- User Management
- Repair Booking Management

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- SQL Server

### Database
- Microsoft SQL Server

### Other Libraries
- bcrypt
- CORS
- Multer
- MSSQL
- Body Parser

## Project Structure

```text
AutoFix360/
│
├── Backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── database/
│   └── SQLQuery1.sql
│
├── Slider images/
│
├── HTML Pages
├── JavaScript Files
├── stylesheet.css
└── README.md

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/jsan2004/AutoFix360.git
2. Open the project
cd AutoFix360
3. Install backend dependencies
cd Backend
npm install
4. Configure the database

Make sure Microsoft SQL Server is installed and configure the database using:

database/SQLQuery1.sql

Update the database configuration in Backend/server.js according to your local SQL Server setup.

5. Start the backend server
node server.js

The backend runs on:

http://localhost:5000

Note

This project is developed as an academic/project application demonstrating a vehicle repair and automobile service management system.