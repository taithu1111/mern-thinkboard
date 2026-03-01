import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);
app.use(cors({
  origin: 'http://localhost:5173',
}));
//our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method: ${req.method} and req url: ${req.url}`);
//   next();
// });

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on Port:", PORT);
  });
});


//mongodb+srv://nguyenphanbaolong1402_db_user:GYIX3Llq2F6CUYbF@cluster0.5wc2xqh.mongodb.net/?appName=Cluster0