const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

AdminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compareSync(plain, this.passwordHash);
};

module.exports = mongoose.model('Admin', AdminSchema);
