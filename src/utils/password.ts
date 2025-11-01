import bcrypt from "bcrypt";

const passwordHash = (password: string) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return err;
        }
        return hash;
    });
}

const passwordVerify = (password: string, hash: string) => {
    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            return err;
        }
        return result;
    });
}