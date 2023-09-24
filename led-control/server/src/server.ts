import express, { Application } from 'express';
import { Request, Response } from 'express';
import { connect } from 'mqtt';
import mqttRoute from './routes/mqttRoute';
import cors from 'cors';


const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
  };

const app: Application = express();
const port = process.env.PORT || 3200;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Node.js Server!');
});

app.use('/');
app.use('/mqtt', mqttRoute);
app.use(cors(options));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});