const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../client/build'));

let Submission;
let User;
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
});
const submissionSchema = new mongoose.Schema({
    suggestion: String,
    signatures:[{
        name: String,
        date: Date
    }]
});

process.env.SECRET_KEY = 'secret';

Submission = mongoose.model('Submission', submissionSchema);

User = mongoose.model('User', userSchema);


app.get('/api/suggestions', (req, res) => {
    Submission.find({}, (err, suggestions) => {
        res.json(suggestions)
    })
});


app.post('/api/addsuggestion', async (req, res) => {
    const text = req.body.suggestion;
    let subHold = new Submission({suggestion: text, signatures: []});
    subHold.save();
});


app.post('/api/suggestions/:id/signature', async (req, res)=>{
    let id = req.params.id;
    let text = req.body.text;
    let signature = await Submission.findById(id);
    signature.signatures.push({name: text, date: Date.now()});
    signature.save();
});

app.post('/api/register', async (req, res) =>{
   let userData = {
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       email: req.body.email,
       password: req.body.password
   };
   User.findOne({
       email: req.body.email
   })
       .then(user => {
           if(!user){
               bcrypt.hash(req.body.password, 5, (err, hash) =>{
                   userData.password = hash
                   User.create(userData)
                       .then(user => {
                           res.json({status: user.email + ' registered!'})
                       })
                       .catch(err => {
                           res.send('error: ' + err)
                       })
               })
           }else{
               res.json({error: 'User already exists'})
           }
       })
       .catch(err => {
           res.send('error: ' + err)
       })
});

app.post('/api/login', async (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, 'secret', {
                        expiresIn: "4m"
                    })
                    res.json(token)
                }else{
                    res.json({error: "Wrong mail or password"})
                }
            }else{
                res.json({error: "User does not exist"})
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })
});





app.get('*', (req, res) =>
res.sendFile(path.resolve('..','client','build','index.html'))
);

const url = process.env.MONGO_URL || 'mongodb+srv://new-user__31:123321@cluster0-ou0ly.mongodb.net/exam-test?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(async ()=> {
    await app.listen(port);
    console.log('Database Connected: ', mongoose.connection.name);
})
.catch(error => console.error(error));