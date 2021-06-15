import { getResourceTemplates } from "../../lib/getResourceTemplates";

export default async function handler(req, res) {
  const {
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const response = await getResourceTemplates();
        console.log('Templates served: ', response)
        res.status(200).json(response)
      } catch (error) {
          res.status(400).json(error);
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
