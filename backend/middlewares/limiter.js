import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 2, // Límite de 2 solicitudes por IP en ese período
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
});

export default limiter;




