const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../client/suggestion-box/build'));

let Submission;
const submissionSchema = new mongoose.Schema({
    suggestion: String,
    signatures:[{
        name: String,
        date: Date
    }]
});
Submission = mongoose.model('Submission', submissionSchema);

app.get('/api/suggestions', (req, res) => {
    Submission.find({}, (err, suggestions) => {
        res.json(suggestions)
    })
});
app.post('/api/addsuggestion', (req, res) => {
    const text = req.body.suggestion;
    let subHold = new Submission({suggestion: text, signatures: []});
    subHold.save();
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