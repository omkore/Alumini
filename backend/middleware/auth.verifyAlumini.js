import jwt from "jsonwebtoken";
import Alumni from"../models/alumini.model" // Assuming you have an Alumni model

export const verifyAlumni = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.alumniId = decoded.id;

    // Check if the user is an alumni
    const alumni = await Alumni.findById(req.alumniId);
    if (!alumni) {
      return res.status(401).json({ message: 'Authorization denied, user not found' });
    }

    // Proceed if alumni is verified
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

