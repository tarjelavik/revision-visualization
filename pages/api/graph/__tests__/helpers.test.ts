import { getActionId } from '../../lib/helpers';

test('getActionId should extract only numbers from an URL', () => {
    const actionId = getActionId('https://dummy.url.net/1337');
    expect(actionId).toBe(1337);
});