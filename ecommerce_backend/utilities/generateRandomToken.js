const crypto = require("crypto");
exports.generateRandomToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return { token: token, passwordResetToken: passwordResetToken };
};
