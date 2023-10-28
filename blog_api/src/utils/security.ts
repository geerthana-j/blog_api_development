import { Request,Response } from "express";
export const validateApiKey = (req: Request, res: Response, next: any) => {
    const apiKey = req.headers['x-api-key'];
  
    if (apiKey === 'napqueen') {
      return next();
    } else {
      return res.status(403).json({ error: 'API key is invalid' });
    }
  };
  