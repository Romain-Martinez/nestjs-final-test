import { json, urlencoded } from 'express';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

import { APP_PORT } from '@infrastructures/configuration/model/app-configuration';
import { ConfigurationService } from '@infrastructures/configuration/services/configuration.service';
import { PrismaService } from '@infrastructures/database/services/prisma.service';
import { GlobalExceptionFilter } from '@helpers/filters/global-exception.filter';

async function bootstrap() {
    const configService = new ConfigurationService(new ConfigService());

    const app = await NestFactory.create(AppModule);

    // Init APP
    // app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.enableVersioning({ type: VersioningType.URI });

    // Prisma
    const dbService: PrismaService = app.get(PrismaService);
    dbService.enableShutdownHooks(app);

    // Swagger
    const config = new DocumentBuilder()
        .setTitle(
            `NestJS- ${configService._isProd ? 'Production' : 'Development & Testing'} API`,
        )
        .setDescription('Official NestJS API Documentation')
        .setVersion('1.0')
        .build();

    const options: SwaggerDocumentOptions = {
        deepScanRoutes: true,
        operationIdFactory: (_controllerKey: string, methodKey: string) =>
            methodKey,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    // writeFileSync("./swagger-spec.json", JSON.stringify(document));
    SwaggerModule.setup('', app, document);

    // Middlewares
    app.use(morgan('dev'));
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.use(helmet());
    app.enableCors();

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

    await app.listen(configService.appConfig[APP_PORT]);

    console.info(
        `Application is running on: ${await app.getUrl()}`,
        'bootstrap',
    );
}
bootstrap();
