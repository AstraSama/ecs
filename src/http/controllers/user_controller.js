import User from "../../database/models/user_model";

export const store = async (req, res) => {
    try {
        const { nickname, email, password } = req.body;

        if (!nickname || !email || !password) {
            return res.status(400).json({ message: "Os campos nickname, email e password são obrigatórios" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email já cadastrado" });
        }

        const user = await User.create({
            nickname,
            email,
            password
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const index = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // retrieve all users, excluding passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password'); // retrieve a user by id, excluding password
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nickname, email } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (nickname) {
            user.nickname = nickname;
        }
        if (email) {
            user.email = email;
        }

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        await user.remove();

        res.status(204).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(400).json(error);
    }
}