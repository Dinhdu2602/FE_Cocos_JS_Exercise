import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import jwt from 'jsonwebtoken';

export const register = (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }
        const account = AuthService.register({ email, password, role });
        res.json(account);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const account = await AuthService.login(email, password);
        if (!account) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
        const payload = {
            id: account._id,
            email: account.email,
            role: account.role,
        };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
        res.json({ account, accessToken });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' });
    }
};