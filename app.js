const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://nikhileashy9_db_user:L2uTDMp9AhTjICyz@ac-vxxbpg8-shard-00-00.lbmml1l.mongodb.net:27017,ac-vxxbpg8-shard-00-01.lbmml1l.mongodb.net:27017,ac-vxxbpg8-shard-00-02.lbmml1l.mongodb.net:27017/?ssl=true&replicaSet=atlas-ouhjvf-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  city: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  membershipType: { 
    type: String, 
    required: true, 
    enum: ['Regular', 'Silver', 'Gold', 'Platinum', 'Premium', 'VIP'] // As specified in UI dropdown
  },
  registrationDate: { 
    type: Date, 
    default: Date.now // Automatically sets to current date if not provided
  }
}, { timestamps: true });

// booking model

const BookingSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Relates directly to the User model
    required: true 
  },
  movieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', // Relates directly to the Movie model
    required: true 
  },
  customerName: { 
    type: String, 
    required: true 
  },
  showDate: { 
    type: Date, 
    required: true 
  },
  showTime: { 
    type: String, 
    required: true 
  },
  numberOfTickets: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  seatNumber: { 
    type: String, // e.g., "A1, A2" or an Array of Strings if handling multiple seats cleanly
    required: true 
  },
  bookingAmount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'] // As specified in UI dropdown
  }
}, { timestamps: true });


app.get("/health", (req, res) => {
  res.send("App is running");
});


//  user routes 

const User = mongoose.model("User", UserSchema);

app.post("/add-user", async (req, res) => {
  try {
    await User.create(req.body);

    res.json({
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});


app.post("/view-users", async (req, res) => {
  try {
    const data = await User.find();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// booking routes

const Booking = mongoose.model("Booking", BookingSchema);

app.post("/add-booking", async (req, res) => {
    try {
      await Booking.create(req.body);
  
      res.json({
        status: "Success",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
})

app.post("/view-bookings", async (req, res) => {
    try {
      const data = await Booking.find();
  
      res.json(data);
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  });

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
