const express = require("express");
const sql = require("mssql");
const multer = require("multer")
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use("/uploads", express.static("uploads")); // Serve images

const upload = multer({ dest: "uploads/" });

// SQL Server Connection Configuration
const dbConfig = {
    user: "sa",
    password: "your_password", // Change this
    server: "DESKTOP-E4RE5F4",
    port: 1433,
    database: "AutoFix360",
    options: {
        trustServerCertificate: true
    }
};

// Create a connection pool
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch(err => console.error("Database connection failed!", err));

module.exports = { poolPromise, sql };
// Global connection pool
let pool;

async function connectToDB() {
    try {
        if (!pool) {
            pool = await sql.connect(dbConfig);
            console.log("✅ Connected to SQL Server");
        }
        return pool;
    } catch (err) {
        console.error("❌ Database connection failed:", err);
        throw err;
    }
}

// Test database connection
app.get("/test-db", async (req, res) => {
    try {
        const pool = await connectToDB();
        const result = await pool.request().query("SELECT 1 AS Test");
        res.json({ status: "success", message: "Database connection successful!", result: result.recordset });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Database connection failed!", error: error.message });
    }
});



// Signup API Route
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Received data:", email, password);

    try {
        const pool = await poolPromise;
        await pool.request()
            .input("email", sql.NVarChar, email)
            .input("password", sql.NVarChar, hashedPassword)
            .query("INSERT INTO Users (email, password) VALUES (@email, @password)");

        res.json({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error signing up" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("email", sql.NVarChar, email)
            .query("SELECT * FROM Users WHERE email = @email");

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "User not found. Please sign up first!" });
        }

        const user = result.recordset[0];

        if (!user.password) {
            return res.status(500).json({ message: "User password not found in database." });
        }

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Send user email in response
        res.json({
            message: "Login successful!",
            user: { email: user.email }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});
// Delete User from Database
app.delete("/deleteUser", async (req, res) => {
    const { email } = req.body;
  
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("DELETE FROM Users WHERE email = @email");
  
      if (result.rowsAffected[0] > 0) {
        res.json({ success: true, message: "User deleted successfully." });
      } else {
        res.status(404).json({ success: false, message: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  });

// Repair Booking

  app.post("/book-repair", async (req, res) => {
    try {
        console.log("📨 Received request:", req.body);

        const pool = await connectToDB(); // Ensure connection is established
        const request = pool.request();

        request.input("UserEmail", sql.VarChar, req.body.user_email);
        request.input("VehicleType", sql.VarChar, req.body.vehicle_type);
        request.input("RepairType", sql.VarChar, req.body.repair_type);
        request.input("EstimatedPrice", sql.VarChar, req.body.estimated_price);
        request.input("ScheduleDate", sql.Date, req.body.schedule_date);
        request.input("Comments", sql.Text, req.body.comments);
        request.input("AddressLine1", sql.VarChar, req.body.address_line1);
        request.input("AddressLine2", sql.VarChar, req.body.address_line2 || "");
        request.input("Landmark", sql.VarChar, req.body.landmark);
        request.input("PinCode", sql.VarChar, req.body.pin_code);

        console.log("✅ Inserting data into database...");

        await request.query(`
            INSERT INTO RepairBooking
            (UserEmail, VehicleType, RepairType, EstimatedPrice, ScheduleDate, Comments, AddressLine1, AddressLine2, Landmark, PinCode)
            VALUES (@UserEmail, @VehicleType, @RepairType, @EstimatedPrice, @ScheduleDate, @Comments, @AddressLine1, @AddressLine2, @Landmark, @PinCode)
        `);

        console.log("✅ Booking saved successfully!");
        res.json({ status: "success", message: "Repair booking successful!" });

    } catch (error) {
        console.error("❌ Error processing request:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
    }
});
//Prducts
app.post("/addProduct", async (req, res) => {
  try {
      const { productName, productPrice, productSection, productDiscount, productImage, productLink } = req.body;

      if (!productName || !productPrice || !productSection || !productLink) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      const pool = await connectToDB();
      await pool.request()
          .input("productName", sql.NVarChar, productName)
          .input("productPrice", sql.Decimal(10, 2), productPrice)
          .input("productSection", sql.NVarChar, productSection)
          .input("productDiscount", sql.Int, productDiscount || 0)
          .input("productLink", sql.NVarChar, productLink)
          .input("productImage", sql.NVarChar, productImage || null)
          .query(`
              INSERT INTO Products (ProductName, Price, Section, Discount, ProductLink, ImagePath) 
              VALUES (@productName, @productPrice, @productSection, @productDiscount, @productLink, @productImage)
          `);

      res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all products
app.get("/getProducts", async (req, res) => {
  try {
      const pool = await connectToDB();
      const result = await pool.request().query("SELECT * FROM AutoFix360.dbo.Products ORDER BY CreatedAt DESC");
      res.json(result.recordset);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
app.get("/get-products", async (req, res) => {
  try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT * FROM PAutoFix360.dbo.Products");
      res.json(result.recordset);
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error retrieving products" });
  }
});


// Delete a product
app.delete("/deleteProduct/:id", async (req, res) => {
  try {
      const productId = req.params.id;
      const pool = await connectToDB();
      await pool.request()
          .input("productId", sql.Int, productId)
          .query("DELETE FROM Products WHERE ProductID = @productId");

      res.json({ message: "Product deleted successfully!" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

  

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
