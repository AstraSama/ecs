import express from 'express';
import user_router from './routers/user_router.js';
import post_router from './routers/post_router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()); // enable JSON parsing

app.use('/users', user_router); // mount user routes
app.use('/posts', post_router); // mount post routes

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

app.listen(process.env.API_PORT, () => {
    console.log(`Server started on port ${process.env.API_PORT}`);
});
