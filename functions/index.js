import { onRequest } from "firebase-functions/v2/https";
import corsLib from "cors";
import { config } from "dotenv";
import process from "process";

// Initialize dotenv
config();

const cors = corsLib({ origin: true });

export const adminLogin = onRequest((req, res) => {
  return cors(req, res, () => {
    const { password } = req.body;

    // Use the imported process object
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (password && password === correctPassword) {
      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false, message: "Unauthorized" });
  });
});

export const checkAdminAuth = onRequest((req, res) => {
  return cors(req, res, () => {
    const { isAdminLoggedIn } = req.body;
    if (isAdminLoggedIn === 'true') {
      return res.status(200).json({ authenticated: true });
    }
    return res.status(401).json({ authenticated: false });
  });
});
