import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ result: ['allowed'] });
};

export default handler;
