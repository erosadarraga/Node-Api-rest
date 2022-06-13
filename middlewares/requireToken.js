import jwt from 'jsonwebtoken';
export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization
        console.log(token);
        if (!token) throw new Error("No existe el token el header usa Bearer")
        token = token.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload)
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message })
    }
}