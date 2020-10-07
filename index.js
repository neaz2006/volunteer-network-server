const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors');
const  ObjectId  = require('mongodb').ObjectID;
app.use(cors());



const port = 5000
app.use(cors());
app.use(bodyParser.json())

// console.log(process.env.DB_USER);

app.get('/', (req, res) => {
  res.send('hello volunteer network')
})



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5xfom.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

  const humanatys = client.db("volunteerdb").collection("charaty");
  const deletes = client.db("volunteerdb").collection("charaty");

  app.post('/addHumanaty', (req, res) => {
    const newHumanaty = req.body;
    humanatys.insertOne(newHumanaty)
      .then(result => {
        console.log(result);
      })
      
    app.get('/humanatys', (req, res) => {
      humanatys.find({})
        .toArray((err, documents) => {
          res.send(documents);
        })
    })

    app.delete('/delete/:id', (req, res) => {
        deletes.deleteOne({ _id: ObjectId(req.params.id) })
        .then((result) => {
          res.send(result.deletedCount > 0);
        })
    })

  })
});
app.listen(process.env.PORT || port);


