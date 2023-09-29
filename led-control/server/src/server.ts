import express, { Application } from 'express';
import { Request, Response } from 'express';
import { connect } from 'mqtt';
import mqttRoute from './routes/mqttRoute';
import cors from 'cors';
import { connectDB } from './dbConn';

connectDB();

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = { origin: allowedOrigins };

const app: Application = express();
const port = process.env.PORT || 3200;

app.use(cors(options));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Node.js Server!');
  res.json({body: " Hello World"});
});

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello from, TypeScript Node.js Server!');
});

app.use('/mqtt', mqttRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});