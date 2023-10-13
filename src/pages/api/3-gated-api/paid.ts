import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import Devcycle from '../../../lib/devcycle';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);

  if (!session?.user) {
    return res.status(401).send({ result: 'Invalid user session' });
  }

  const devcycleClient = await Devcycle.getDevcycleClient();

  const user = {
    user_id: session?.user?.email
  };
  const variable = devcycleClient.variable(user, 'paid-feature', false);

  console.log({ variable });

  if (!variable.value) {
    return res.status(401).send({ result: 'paid-feature not allowed' });
  }

  return res.json({ result: ['allowed'] });
};

export default withApiAuthRequired(handler);
