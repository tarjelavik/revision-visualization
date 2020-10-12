import { formatResourceTemplate } from './formatResourceTemplate';

const dummyData = {};

const resourceTemplate = {};

test('formatResourceTemplate should return an array of resource templates', () => {
    expect(formatResourceTemplate(dummyData)).toMatchObject(resourceTemplate);
});