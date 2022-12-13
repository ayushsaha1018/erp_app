export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/erp-app";
export const PORT = process.env.PORT || 5000;

export const JWT = {
  secret: process.env.JWT_SECRET || "secret",
  expiresIn: process.env.JWT_EXPIRES_IN || "7d"
};

export const AUTH_COOKIE = {
  name: "erp-app-auth",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
};
