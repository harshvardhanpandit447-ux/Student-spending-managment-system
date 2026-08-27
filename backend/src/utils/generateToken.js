import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET || 'finflow_super_secure_jwt_secret_key_2026_student_platform', 
    { expiresIn: '30d' }
  );
};
