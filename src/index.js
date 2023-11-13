import express from 'express'
import cors from 'cors'
import rootRoutes from './routes/rootRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));
app.listen(8080);


app.use("/api",rootRoutes)


