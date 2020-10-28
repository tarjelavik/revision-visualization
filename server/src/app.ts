import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import SigmaGraph from '../../model/SigmaGraph';

import { queryData } from './lib/getGraphData';
import { getResourceTemplates } from './lib/getResourceTemplates';
import { searchHandler } from './lib/searchHandler';

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
        const data: any = await getResourceTemplates();
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
        // MAGIC STRING: THIS NEEDS TO BE SENT TO searchHandler function, NOT directly to queryData
        const data: SigmaGraph | void = await queryData(req.params, 'PLACE');
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.get('/api/form/:query', async(req, res) => {
    try {
        const searchResult: any = await searchHandler(req.params.query);
        res.json(searchResult);
    } catch (error) {
        res.json(error);
    }
});


app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});