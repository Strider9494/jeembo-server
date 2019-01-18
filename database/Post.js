const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jeemboserver', { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

const postSchema = new mongoose.Schema ({
  userId: String,
  title: String,
  body: String,
  date: {type: Date, default: Date.now}
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;