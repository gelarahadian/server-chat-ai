import dotenv from 'dotenv'

dotenv.config()

export const port = Number(process.env.PORT) || 3000;
export const mongoURI: string = process.env.MONGO_URI || "";
export const jwtSecret: string = process.env.JWT_SECRET || "";
export const frontendUrl: string = process.env.FRONTEND_URL || "";  