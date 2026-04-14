const {User} = require("../model/db")

const profile_logic = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
}

module.exports = {profile_logic};