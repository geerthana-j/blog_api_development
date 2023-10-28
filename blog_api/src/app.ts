import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/postRoutes';
import {validateApiKey} from './utils/security';
const app = express();
app.use(bodyParser.json());
app.use('/api',validateApiKey);
app.use('/api', router);
export default app;
