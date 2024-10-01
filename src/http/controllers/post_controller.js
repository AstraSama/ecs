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

