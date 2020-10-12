import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import SigmaGraph from '../../model/SigmaGraph';
import { queryData } from './lib/getGraphData';
import { getResourceTemplates } from './lib/getResourceTemplates';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (_req, res) => {
    res.send('Revision-visualization server is running');
});

app.get('/api/resource_templates', async(_req, res) => {

    try {
        const data = await getResourceTemplates();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.get('/api/fetch', async(req, res) => {
    req.params = {
        'query': `
    PREFIX schema: <http://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX bdm2: <http://purl.org/bdm2>
    PREFIX o: <http://omeka.org/s/vocabs/o#>
    SELECT DISTINCT ?personName ?personId ?associatedPlaceName ?associatedPlaceId WHERE {
      # Person
      ?sub ?pred ?obj .
      ?sub a bdm2:Person .
      ?sub schema:name ?personName .
      ?sub o:id ?personId .

      # Associated Place
      ?sub schema:location ?associatedPlace .
      ?associatedPlace schema:name ?associatedPlaceName .
      ?associatedPlace o:id ?associatedPlaceId .
    } LIMIT 100`
    };

    try {
        const data: SigmaGraph | void = await queryData(req.params);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.post('/api/form', (req, res) => {
    console.log(req.body);
    res.json('hello');
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});