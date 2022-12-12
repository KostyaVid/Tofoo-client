import { rest } from 'msw';

export const handlers = [
  rest.post('/api/login', async (req, res, ctx) => {
    const { email, password }: { email: string; password: string } = await req.json();
    if (!email || !password) return res(ctx.status(401));
    const user = {
      user_id: 1,
      username: 'John',
      email: email,
    };
    const JWTToken = 'secretToken';

    return res(ctx.status(200), ctx.body(JSON.stringify({ user, JWTToken })));
  }),

  rest.get('/api/login', async (req, res, ctx) => {
    const Authorization = req.headers.get('authorization');

    if (!Authorization) return res(ctx.status(401));
    return res(ctx.status(200));
  }),

  rest.post('/api/company', async (req, res, ctx) => {
    const { name }: { name: string } = await req.json();

    if (!name) return res(ctx.status(401));
    const company = {
      company_id: 1,
      company_name: name,
    };
    const JWTToken = 'secretToken';

    return res(ctx.status(200), ctx.body(JSON.stringify({ company, JWTToken })));
  }),

  rest.patch('/api/company/leave', async (req, res, ctx) => {
    const user = {
      user_id: 1,
      username: 'John',
      email: 'john@gmail.com',
    };
    const JWTToken = 'secretToken';

    return res(ctx.status(200), ctx.body(JSON.stringify({ user, JWTToken })));
  }),
];
