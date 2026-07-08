import request from 'supertest';
import app from '../src/index';

describe('FIFA 2026 Smart Stadium Test Suite', () => {
  it('should return 400 on invalid stadium zone', async () => {
    const res = await request(app).post('/api/v1/fifa/crowd-intelligence').send({
      stadiumZone: 'Zone-Z', 
      currentDensity: 5.5, 
      gateFlowRate: 150
    });
    expect(res.status).toBe(400);
  });

  it('should flag negative density values', async () => {
    const res = await request(app).post('/api/v1/fifa/crowd-intelligence').send({
      stadiumZone: 'Zone-A', 
      currentDensity: -2.5, 
      gateFlowRate: 50
    });
    expect(res.status).toBe(400);
  });

  it('should serve WCAG accessible HTML dashboard', async () => {
    const res = await request(app).get('/api/v1/stadium/accessibility-dashboard');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});
