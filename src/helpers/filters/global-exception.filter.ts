import { Prisma } from '@prisma/client';
import { red } from 'chalk';
import { Response } from 'express';
import { inspect } from 'util';

import {
    ArgumentsHost,
    Catch,
    HttpException,
    HttpServer,
    HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import MESSAGES from '@helpers/messages/http-messages';

const LOG_PREFIX = red('Response/Error');

function getHttpExceptionMessage(exception: HttpException): string {
    const response = exception.getResponse();
    if (typeof response === 'object') {
        if ('message' in response) {
            if (typeof response.message === 'string') return response.message;
            if (
                Array.isArray(response.message) &&
                response.message.every((message) => typeof message === 'string')
            )
                return response.message.join('\n');
        }
    }

    if (typeof response === 'string') return response;
    return exception.message;
}

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
    constructor(httpAdapter: HttpServer) {
        super(httpAdapter);
    }

    postToSentryError(error: Error, response: Response) {
        console.error(
            inspect(error),
            error.stack ?? String(error),
            this.constructor.name,
        );

        console.log(LOG_PREFIX, {
            statusCode: HttpStatus.BAD_REQUEST,
            message: MESSAGES.CONTACT_ADMIN,
        });
        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: MESSAGES.CONTACT_ADMIN,
        });
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof Error) {
            if (exception instanceof Prisma.PrismaClientKnownRequestError) {
                const defaultMessage = exception.message.replace(/\n/g, '');

                // TODO: Send extra context to Sentry?
                const meta = exception.meta;

                let message;
                switch (exception.code) {
                    case 'P2000':
                        message =
                            meta && 'cause' in meta
                                ? meta.cause
                                : defaultMessage;
                        console.log(LOG_PREFIX, {
                            statusCode: HttpStatus.BAD_REQUEST,
                            message,
                        });
                        response.status(HttpStatus.BAD_REQUEST).json({
                            statusCode: HttpStatus.BAD_REQUEST,
                            message,
                        });
                        break;
                    case 'P2002':
                        message =
                            meta && 'target' in meta
                                ? `${meta.target} with same field already exists`
                                : defaultMessage;
                        console.log(LOG_PREFIX, {
                            statusCode: HttpStatus.CONFLICT,
                            message,
                        });
                        response
                            .status(HttpStatus.CONFLICT)
                            .json({ statusCode: HttpStatus.CONFLICT, message });
                        break;
                    case 'P2025':
                        message =
                            meta && 'modelName' in meta
                                ? `No ${meta.modelName} found`
                                : defaultMessage;
                        console.log(LOG_PREFIX, {
                            statusCode: HttpStatus.NOT_FOUND,
                            message,
                        });
                        response.status(HttpStatus.NOT_FOUND).json({
                            statusCode: HttpStatus.NOT_FOUND,
                            message,
                        });
                        break;
                    default:
                        // Unexpected prisma error, send it to sentry
                        this.postToSentryError(exception, response);
                        break;
                }
            } else if (exception instanceof HttpException) {
                const statusCode = exception.getStatus();
                const message = getHttpExceptionMessage(exception);
                console.log(LOG_PREFIX, { statusCode, message });
                response.status(statusCode).json({ statusCode, message });
            } else {
                // Unexpected internal error, send it to sentry
                this.postToSentryError(
                    new Error(
                        `Unexpected internal error, ${inspect(exception)}`,
                    ),
                    response,
                );
            }
        } else {
            // This should never happen: it means that the exception itself is not a JS error; we rethrow it as an unexcepted error type
            this.postToSentryError(
                new Error(`Unexpected error type, ${inspect(exception)}`),
                response,
            );
        }
    }
}
