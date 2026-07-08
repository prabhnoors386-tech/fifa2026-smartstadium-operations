import request from 'supertest';
import app from '../index';

describe('FIFA 2026 Smart Stadium Operational Test Suite', () => {
  it('should validate crowd density metrics and fail on invalid zones', async () => {
    const response = await request(app)
      .post('/api/v1/fifa/crowd-intelligence')
      .send({
        stadiumZone: 'Invalid-Zone',
        currentDensity: 5.5,
        gateFlowRate: 150
      });
    
    expect(response.status).toBe(400);
  });
});
