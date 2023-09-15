import { check, validationResult } from 'express-validator';

// Middleware de validación personalizado
const validateRegister = [
    check('firstName', 'El nombre es obligatorio').custom((value) => {
        if (!value.trim()) {
            throw new Error('El nombre es obligatorio');
        }
        return true;
    }),
    check('lastName', 'El apellido es obligatorio').custom((value) => {
        if (!value.trim()) {
            throw new Error('El apellido es obligatorio');
        }
        return true;
    }),
    check('username', 'El nombre de usuario es obligatorio').notEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial')
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/),
    check('confirmPassword', 'Las contraseñas no coinciden').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error();
        }
        return true;
    })
];

const validateLogin = [
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty()
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export { validateRegister, validateLogin, validate };

