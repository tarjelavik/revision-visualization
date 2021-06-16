import { searchHandler } from "../../lib/searchHandler";

export default async function handler(req, res) {
  const {
    query: {query},
    method,
  } = req

  // console.log("1: req: ", query)

  switch (method) {
    case 'GET':
      try {
        if(query?.length == 0) {
          res.status(400).json(error);
        }
        const response = await searchHandler(query);
        // console.log('Last: Network served: ', response)
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
