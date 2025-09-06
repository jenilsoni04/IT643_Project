const userService = require("../services/userService");

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  } 
};