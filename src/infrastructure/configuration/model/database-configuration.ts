export const DATABASE_NAME = 'DATABASE_NAME';
export const DATABASE_PORT = 'DATABASE_PORT';
export const DATABASE_URL = 'DATABASE_URL';

export type DatabaseConfiguration = {
    [DATABASE_NAME]: string;
    [DATABASE_PORT]: string;
    [DATABASE_URL]: string;
};
