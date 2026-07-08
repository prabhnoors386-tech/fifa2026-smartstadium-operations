import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import { generateOperationalDecision } from './services/aiEngine';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: '*' }));

app.post(
  '/api/v1/fifa/crowd-intelligence',
  [
    body('stadiumZone').isIn(['Zone-A', 'Zone-B', 'Zone-C', 'Zone-D']),
    body('currentDensity').isFloat({ min: 0 }),
    body('gateFlowRate').isInt({ min: 0 })
  ],
  async (req: express.Request, res: express.Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    const decision = await generateOperationalDecision(req.body);
    res.status(200).json(decision);
  }
);

export default app;
