import { generateId } from '../src/lib/generateId';

test('generateId should not return undefined', () => {
    const id = generateId();
    expect(id).not.toBeUndefined();
});