import bcrypt from 'bcrypt';

const generateHash = (password:string) => bcrypt.hash(password, bcrypt.genSaltSync(10));

const validatePassword = (password:string, hash:string) => bcrypt.compare(password, hash);

export {
    generateHash,
    validatePassword
};
