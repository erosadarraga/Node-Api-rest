import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization
        console.log(token);
        if (!token) throw new Error("No existe el token el header usa Bearer")
        token = token.split(" ")[1]
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        req.id = uid
        next()
    } catch (error) {
        console.log(error.message);

        const tokenVerificationErrors = {
            ["invalid signure"]: "La firma del JWT no es valida",
            ["jwt expired"]: "JWT expirado",
            ["invalid token"]: "Token no valido",
            ["No Bearer"]: "Utiliza formtato Bearer",
            ["jwt malformed"]: "JWT formato no valido"
        }
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] })
    }
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken")
    res.json({ ok: true })
}
