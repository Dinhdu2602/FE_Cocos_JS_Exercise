import type { Request, Response } from 'express';
import  { AuthService } from './auth.service';

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

export const login = (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const account = AuthService.login(email, password);
        if(!account) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        res.json(account);
    } catch (error) {
       return res.status(500).json({ message: 'Internal Server error' });
    }
}