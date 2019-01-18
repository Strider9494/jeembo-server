const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jeemboserver', { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

const userSchema = new mongoose.Schema ({
  name: String,
  email: String,
  password: String,
  avatar: String,
  posts: Array,
  date: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema);

module.exports = User;