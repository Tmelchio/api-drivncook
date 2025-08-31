
// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import multer from 'multer'; // à activer pour upload fichiers
// import { errorHandler } from './middlewares/errorHandler.js'; // à créer

import orderCountRoutes from './routes/order.count.routes.js';
import loyaltyCardRoutes from './routes/loyaltycard.routes.js';
import newsletterSubRoutes from './routes/newslettersub.routes.js';
import eventCustomRoutes from './routes/eventcustom.routes.js';
import orderRoutes from './routes/order.routes.js';
import saleRoutes from './routes/sale.routes.js';
import maintenanceRoutes from './routes/maintenance.routes.js';
import breakdownRoutes from './routes/breakdown.routes.js';
import menuRoutes from './routes/menu.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';
import eventRoutes from './routes/event.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();

app.use('/api/loyaltycards', loyaltyCardRoutes);
app.use('/api/newslettersubs', newsletterSubRoutes);
app.use('/api/eventcustoms', eventCustomRoutes);

// Middlewares sécurité, logs, parsing, CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Routes de base (à compléter)
app.use('/api/orders', orderRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/maintenances', maintenanceRoutes);
app.use('/api/breakdowns', breakdownRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/fidelity', fidelityRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/supplies', supplyRoutes);

app.get('/', (req, res) => res.send("API Driv'n Cook running"));

// Gestion des erreurs générique
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connecté');
  app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
}).catch(err => console.error('Erreur MongoDB :', err));
