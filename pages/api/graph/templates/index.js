import { getResourceTemplates } from "../../lib/getResourceTemplates";

const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

export default async function handler(req, res) {
  const {
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const response = await getResourceTemplates();
        const urlToNumber = response.map(item => {
          return {
            id: getLastItem(item.id),
            label: item.label
          }
        })
        // console.log('Templates served: ', urlToNumber)
        res.status(200).json(urlToNumber)
      } catch (error) {
          res.status(400).json(error);
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
