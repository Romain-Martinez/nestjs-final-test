export const APP_NAME = 'APP_NAME';
export const APP_VERSION = 'APP_VERSION';
export const APP_ENV = 'APP_ENV';
export const APP_PORT = 'APP_PORT';

export type AppConfiguration = {
    [APP_NAME]: string;
    [APP_VERSION]: string;
    [APP_ENV]: string;
    [APP_PORT]: string;
};
