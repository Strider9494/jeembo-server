const express = require('express');

const users = require ('./routers/users')

// const marat = new User ({
//   name: "Marat",
//   email: "Marat94@gmail.com",
//   password: hash
// });

// marat.save ( (err, marat) => {
//   if (err) return console.error(err);
//   console.log(marat);
// })
// console.log(marat.name);

const app = express();

app.use(express.json());


app.use('/users' , users);

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening on port ${port}...`));