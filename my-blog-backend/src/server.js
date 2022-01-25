import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

// const articleInfo = {
//     'learn-react': {
//         upvotes: 0,
//         comments: []
//     },
//     'learn-node': {
//         upvotes: 0,
//         comments: []
//     },
//     'my-thoughts-on-resumes': {
//         upvotes: 0,
//         comments: []
//     }
// };

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('myBlog');
        await operations(db);
        db.close();
    } catch (e) {
        res.status(500).json({ message: 'Error Connecting with DB', e});
    }
}

const app = express();
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

app.get('/hello', (req, res) => res.send('Hello!....'));
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}`));

app.get('/api/article/:name', async (req, res) => {
    withDB(async (db) => {
        const courseName = req.params.name;
        const articleResponse = await db.collection('articles').findOne({ name: courseName });
        res.status(200).json(articleResponse);
    }, res);
});

app.post('/api/article/:name/upvote', async (req, res) => {
    withDB(async (db) => {
        const courseName = req.params.name;
        const articleResponse = await db.collection('articles').findOne({ name: courseName });
        await db.collection('articles').updateOne({ name: courseName },{
            '$set': {
                upvotes: articleResponse.upvotes + 1
            }
        });
        const updatedArticleResponse = await db.collection('articles').findOne({ name: courseName });
        res.status(200).json(updatedArticleResponse);
    }, res);
});

app.post('/api/article/:name/add-comment', async (req, res) => {
    withDB(async (db) => {
        const { username, text } = req.body;
        const courseName = req.params.name;
        const articleResponse = await db.collection('articles').findOne({ name: courseName });
        //const updatedComments = [...articleResponse.comments, { username, text }];
        await db.collection('articles').updateOne({ name: courseName }, {
            '$set': {
                comments: articleResponse.comments.concat({ username, text })
            }
        });
        const updatedArticleResponse = await db.collection('articles').findOne({ name: courseName });
        res.status(200).json(updatedArticleResponse);
    }, res);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));