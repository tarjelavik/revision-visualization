import { splitAndCapitalizeHeading } from '.';

describe('splitAndCapitalizeHeading', () => {
    it('Should return a string wich is split into separate words, where each word is capitalized', () => {
        const testString = 'thisIsTheTestString';
        const resultString = splitAndCapitalizeHeading(testString);
        expect(resultString).toEqual('This Is The Test String');
    });
});

