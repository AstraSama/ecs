import Post from "../../database/models/post_model";

export const store = async (req, res) => {
    try {
        const { text } = req.body;

        if(!text) {
            return res.status(400).json({ message: "O campo text é obrigatório" });
        }

        const content = await Post.create({
            text: text,
            User: req.User.id
        });

        res.status(201).json(content);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const index = async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']] // retrieve posts in descending order of creation time
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "O campo text é obrigatório" });
        }

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        post.text = text;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "Post não encontrado" });
        }

        await post.destroy();

        res.status(204).json({ message: "Post deletado com sucesso" });
    } catch (error) {
        res.status(400).json(error);
    }
}