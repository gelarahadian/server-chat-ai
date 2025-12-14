import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config";

const passwordHash = async (password: string) => {
  return bcrypt.hash(password, 10);
};

const passwordVerify = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

const signToken = (id: string) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

function sanitizeUser(user: any) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.__v;
  return obj;
}

function normalizeCodeBlocks(text: string) {
  // Deteksi kode python
  const looksLikePython =
    /def\s+\w+\(|if\s+__name__\s*==\s*["']__main__["']|print\(/i.test(text);

  // Kalau ada potongan code tapi fence tidak konsisten
  const hasFence = text.includes("```");

  if (looksLikePython) {
    // Ambil SEMUA baris yang kelihatan seperti code
    const lines = text.split("\n");

    const codeLines = lines.filter((l) =>
      /^[ \t]*(def |if |for |while |try:|except|print\(|return|import |from )/.test(
        l
      )
    );

    if (codeLines.length) {
      return ["```python", codeLines.join("\n"), "```"].join("\n");
    }
  }

  return text;
}

export {
  passwordHash,
  passwordVerify,
  signToken,
  sanitizeUser,
  normalizeCodeBlocks,
};
