const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/db_games", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

module.exports = mongoose;