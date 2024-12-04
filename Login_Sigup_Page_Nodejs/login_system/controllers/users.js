const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const nodemailer = require("nodemailer");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'lisandro.schuster13@ethereal.email',
      pass: 'xdg2cdVb7hZPzcqtBk'
  }
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        msg: "Please Enter Your Email and Password",
        msg_type: "error",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (error, result) => {
        if (result.length <= 0) {
          return res.status(401).render("login", {
            msg: "Invalid Email or Password",
            msg_type: "error",
          });
        } else {
          if (!(await bcrypt.compare(password, result[0].pass))) {
            return res.status(401).render("login", {
              msg: "Invalid Email or Password",
              msg_type: "error",
            });
          } else {
            const id = result[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("joes", token, cookieOptions);
            res.status(200).redirect("/home");
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.register = (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  db.query(
    "SELECT email FROM users WHERE email=?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }

      if (result.length > 0) {
        return res.render("register", {
          msg: "Email id already Taken",
          msg_type: "error",
        });
      } else if (password !== confirm_password) {
        return res.render("register", {
          msg: "Password do not match",
          msg_type: "error",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);

      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, pass: hashedPassword },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            return res.render("register", {
              msg: "User Registration Success",
              msg_type: "good",
            });
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.joes) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.joes,
        process.env.JWT_SECRET
      );
      db.query(
        "SELECT * FROM users WHERE id=?",
        [decode.id],
        (err, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie("joes", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/");
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).render("forgot-password", {
        msg: "Email not found",
        msg_type: "error",
      });
    }

    const resetToken = generateResetToken();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

    await updateUserResetToken(user.id, resetToken);

    sendResetEmail(user.email, resetUrl);

    return res.render("forgot-password", {
      msg: "Password reset email sent. Check your inbox.",
      msg_type: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("forgot-password", {
      msg: "Error sending reset email",
      msg_type: "error",
    });
  }
};
exports.resetPasswordPage = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await getUserByResetToken(token);

    if (!user) {
      return res.status(400).render("reset-password", {
        msg: "Invalid or expired reset token",
        msg_type: "error",
      });
    }

    return res.render("reset-password", { token });
  } catch (error) {
    console.error(error);
    return res.status(500).render("reset-password", {
      msg: "Error processing reset token",
      msg_type: "error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password, confirm_password } = req.body;

  try {
    const user = await getUserByResetToken(token);

    if (!user) {
      return res.status(400).render("reset-password", {
        msg: "Invalid or expired reset token",
        msg_type: "error",
      });
    }

    if (password !== confirm_password) {
      return res.render("reset-password", {
        msg: "Password do not match",
        msg_type: "error",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await updateUserPassword(user.id, hashedPassword);

    return res.render("reset-password", {
      msg: "Password reset successful",
      msg_type: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("reset-password", {
      msg: "Error resetting password",
      msg_type: "error",
    });
  }
};
exports.resetPasswordPage = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await getUserByResetToken(token);

    if (!user) {
      return res.status(400).render("reset-password", {
        msg: "Invalid or expired reset token",
        msg_type: "error",
      });
    }

    return res.render("reset-password", { token });
  } catch (error) {
    console.error(error);
    return res.status(500).render("reset-password", {
      msg: "Error processing reset token",
      msg_type: "error",
    });
  }
};



   

// Helper functions
async function getUserByResetToken(resetToken) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE reset_token=?", [resetToken], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function updateUserResetToken(userId, resetToken) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET reset_token=? WHERE id=?",
      [resetToken, userId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

async function updateUserPassword(userId, hashedPassword) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET pass=?, reset_token=NULL WHERE id=?",
      [hashedPassword, userId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}
async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function updateUserResetToken(userId, resetToken) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET reset_token=? WHERE id=?",
      [resetToken, userId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  })}
function generateResetToken() {
  return Math.random().toString(36).substring(2, 15);
}

function sendResetEmail(email, resetUrl) {
  const mailOptions = {
    from: "lisandro.schuster13@ethereal.email",
    to: email,
    subject: "Password Reset",
    html: `Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}