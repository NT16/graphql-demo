const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const schema = require('./schema/schema');

const app = express();
const port = process.env.PORT || 4000;

//to allow cross origin requests
app.use(cors());

mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.once('open', ()=> {
    console.log('connected to DB');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, ()=>{
console.log(`listening for requests on port ${port}`);
})