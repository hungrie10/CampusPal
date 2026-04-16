const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(() => (console.log('🍟Fried chips and  eggs'))).catch((err) => console.error(err))
