// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import franchiseRoutes from './routes/franchise.routes.js';
import camionRoutes from './routes/camion.routes.js';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/franchises', franchiseRoutes);
app.use('/api/camions', camionRoutes);

const PORT = process.env.PORT || 8083;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connecté');
  app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
}).catch(err => console.error('Erreur MongoDB :', err));
