import {sendEmailOnLogin} from '../../database/controller';
async function handler(req, res) {
    if(req.method === 'POST')
    {
      await sendEmailOnLogin(req, res);
    }
}
export default handler;