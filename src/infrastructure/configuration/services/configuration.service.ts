import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
    APP_ENV,
    APP_NAME,
    APP_PORT,
    APP_VERSION,
    AppConfiguration,
} from '../model/app-configuration';
import {
    DATABASE_NAME,
    DATABASE_PORT,
    DATABASE_URL,
    DatabaseConfiguration,
} from '../model/database-configuration';

@Injectable()
export class ConfigurationService {
    private _databaseConfig!: DatabaseConfiguration;
    private _appConfig!: AppConfiguration;

    public _isProd: boolean = false;

    get databaseConfig(): DatabaseConfiguration {
        return this._databaseConfig;
    }

    private set databaseConfig(value: DatabaseConfiguration) {
        this._databaseConfig = value;
    }

    get appConfig(): AppConfiguration {
        return this._appConfig;
    }

    private set appConfig(value: AppConfiguration) {
        this._appConfig = value;
    }

    constructor(private nestConfigService: ConfigService) {
        this.setupEnvironment();
    }

    private setupEnvironment(): void {
        // APP
        const appName = this.getVariableFromEnvFile(APP_NAME);
        const appVersion = this.getVariableFromEnvFile(APP_VERSION);
        const appEnv = this.getVariableFromEnvFile(APP_ENV);
        const appPort = this.getVariableFromEnvFile(APP_PORT);

        this._appConfig = {
            APP_NAME: appName,
            APP_VERSION: appVersion,
            APP_ENV: appEnv,
            APP_PORT: appPort ?? '4000',
        };
        this._isProd = appEnv === 'production' || appEnv === 'prod';

        // DATABASE
        const databasePort = this.getVariableFromEnvFile(DATABASE_PORT);
        const databaseName = this.getVariableFromEnvFile(DATABASE_NAME);
        const databaseUrl = this.getVariableFromEnvFile(DATABASE_URL);

        this._databaseConfig = {
            DATABASE_NAME: databaseName,
            DATABASE_PORT: databasePort,
            DATABASE_URL: databaseUrl,
        };
    }

    private getVariableFromEnvFile(key: string): string {
        const variable = this.nestConfigService.get<string>(key);
        if (!variable) {
            throw new Error('No database port could be found from env file.');
        }
        return variable;
    }
}
