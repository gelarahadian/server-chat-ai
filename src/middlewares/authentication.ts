import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtSecret } from "../config/config";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;

        if (!token) {
          return res
            .status(401)
            .json({ message: "Unauthorized: No token provided" });
        }
        
        const secret = jwtSecret

        if(!secret){
            throw new Error("JWT Secret not found in evironment variables")
        }

        const decoded = jwt.verify(token, secret) as JwtPayload

        req.userId = decoded.id

        next()
    }catch(err: any){
        console.log("Auth error:", err);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        return res
            .status(500)
            .json({ message: "Authentication error" });
    }
}

export default authenticate;