import bcrypt from 'bcrypt';

const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    return hashPassword;
}

const comparePassword = (password, hashPassword) => {
    const match = bcrypt.compareSync(password, hashPassword)

    return match
}

export { hashedPassword, comparePassword}