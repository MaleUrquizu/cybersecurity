import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo de 5 intentos por IP en ese período
    message: 'Demasiados intentos de inicio de sesión desde esta IP. Por favor, inténtalo de nuevo más tarde.',
  });
  
  export default loginLimiter;