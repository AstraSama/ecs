import express from 'express';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';

const app = express();

app.use(express.json()); // enable JSON parsing

app.use('/users', userRouter); // mount user routes
app.use('/posts', postRouter); // mount post routes

app.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // retrieve all users, excluding passwords
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']] // retrieve posts in descending order of creation time
        });
        res.status(200).json({ users, posts });
    } catch (error) {
        res.status(400).json(error);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});