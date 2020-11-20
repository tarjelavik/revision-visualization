// TODO: Write test
export const getActionId = (url: string): number => Number(/\d\w+/.exec(url));