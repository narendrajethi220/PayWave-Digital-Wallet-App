const { Router } = require("express");
const zod = require("zod");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = require("../middlewares/middleware");
const router = Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Incorrect inputs",
      });
    }

    const existingUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already taken",
      });
    }

    const user = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    //hashing the password using createHash before saving the user
    user.password_hash = await user.createHash(req.body.password);
    await user.save();

    const userId = user._id;

    // ----------------- Creating new account adn Initializing balances
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });
    // -----------------------------------------------//

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

//------------------------------------------- Sign in
router.post("/signin", async (req, res) => {
  try {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Incorrect Inputs",
      });
    }
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(401).json({
        message: "Error while logging in",
      });
    }

    // validating password
    const isPasswordValid = await user.validatePassword(req.body.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    //Generating JWT token after successfull login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------- router for updating user information
const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Incorrected Inputs",
      });
    }
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
      message: "Update successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// route to get users from the backend, filterable via firstname/lastname
// Query Parameter: ?filter=harkirat
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      //it checks if the user's firstName or lastName matches the regular expression ($regex) specified by filter.
      {
        firstName: {
          $regex: filter,
          $options: "i", //fixes typo and adds case-insensitivity
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
