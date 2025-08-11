// import jwt from "jsonwebtoken";

// export const generateToken = (user) => {
//   return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, verified: user.verified },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
