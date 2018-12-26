const express = require('express');

const users = require ('./routers/users')

const app = express();

app.use(express.json());


app.use('/users' , users);

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening on port ${port}...`));