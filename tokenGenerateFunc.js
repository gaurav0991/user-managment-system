import jwt from "jsonwebtoken";

const genearte = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};
export default genearte;
