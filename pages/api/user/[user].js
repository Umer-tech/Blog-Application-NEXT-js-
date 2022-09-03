import {connectToDatabase} from '../../../lib/db';
import {getUserById, validateSession} from '../../../database/controller'
async function handler(req, res) {

  //Checking weather user is authorized
  validateSession(req, res);
  if (req.method !== 'GET') {
    return;
  }

  await getUserById(req, res);
}

export default handler;