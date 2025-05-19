"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
/* eslint-disable  @typescript-eslint/no-unsafe-return */
var common_1 = require("@nestjs/common");
/**
 * A decorator that injects the authenticated user into a controller method.
 *
 * This decorator uses the ExecutionContext to access the underlying HTTP request,
 * and extracts the authenticated user from the request object.
 *
 * @param {unknown} data - Not used, but required by the createParamDecorator signature.
 * @param {ExecutionContext} ctx - The execution context of the controller method.
 * @returns {any} The authenticated user.
 */
exports.AuthUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
