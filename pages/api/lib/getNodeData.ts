import axios from 'axios';

export const getNodeData = async(id: number) => {
    const birgittaURL = `https://birgitta.test.uib.no/api/items/${id}`;

    try {
        const nodeData: any = axios.get(birgittaURL, { headers: {'Accept': 'application/ld+json'}})
            .then(res => {return res;})
            .catch(err => console.log(err));
        return nodeData;
    } catch (error) {
        console.log(error);
        return null;
    }
};
