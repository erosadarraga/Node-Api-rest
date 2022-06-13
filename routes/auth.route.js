import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
const router = Router()

router.post("/register", [
    body(
        "email", "Formato email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "minimo 6 caracteres").trim()
        .isLength({ min: 6 }),
    body("password", "password incorrecto")
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No conciden las contraseña")
            }
            return value
        })
],
    validationResultExpress,
    register)
router.post("/login", [
    body(
        "email", "Formato email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "minimo 6 caracteres").trim()
        .isLength({ min: 6 })
], validationResultExpress, login)

export default router;