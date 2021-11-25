import axios from 'axios';

const ES_DOMAIN = process.env.NEXT_PUBLIC_ES_DOMAIN
const KEY = process.env.NEXT_PUBLIC_ES_KEY
const APP_ID = process.env.NEXT_PUBLIC_ES_APP_ID

const removeFirstLine = async (q) => {
  if (!q) return null
  // break the textblock into an array of lines
  var lines = q.split('\n');
  // remove one line, starting at the first position
  lines.splice(0, 1);
  // join the array back into a single string
  return lines.join('\n');
}

/**
 * Query the ES endpoint for data
 * 
 * @param {*} req 
 * @param {*} res 
 */

export default async function handler(req, res) {
  const q = await removeFirstLine(req.body)

  try {
    const response = await axios.post(`${ES_DOMAIN}/all/id/_search`, q, { headers: { 'x-api-key': KEY, 'x-api-id': APP_ID, 'Content-Type': 'application/json' } })
    //.then(res => console.log(res))
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
