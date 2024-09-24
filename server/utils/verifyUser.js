import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'User is unauthenticated. Please login',
        success: false
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === "undefined") {
      return res.status(401).json({
        message: "User is unauthenticated. Please login",
        success: false
      })
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false
      })
    };
    req.userId = decode.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
