import { getResourceTemplates } from '../../lib/getResourceTemplates';

const getTemplateId = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

/**
 * Get all resource templates from Omeka. A template is the same as a rdfs Class.
 * 
 * @param {*} req 
 * @param {*} res 
 */

export default async function handler(req, res) {
  const {
    method,
  } = req

  const unwantedTemplates = ['15', '17', '20', '21', '22', '24']

  switch (method) {
    case 'GET':
      try {
        const response = await getResourceTemplates();
        // console.log(response)
        const templateData = response.map(item => {
          return {
            id: getTemplateId(item.id),
            label: item.label
          }
        })

        const filteredTemplates = templateData.filter(({ id }) => !unwantedTemplates.includes(id))

        res.status(200).json(filteredTemplates)
      } catch (error) {
        res.status(400).json(error);
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
