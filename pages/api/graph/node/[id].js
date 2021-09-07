import { getNodeData } from '../../lib/getNodeData';

/**
 * Get data about a node, e.g. an instance from Omeka
 * 
 * @param {*} req 
 * @param {*} res 
 */

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const response = await getNodeData(id);
        // console.log('Node served: ', response.data)
        res.status(200).json(response.data)
      } catch (error) {
        res.status(400).json(error);
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

