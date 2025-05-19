/* eslint-disable  @typescript-eslint/no-unsafe-return */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

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
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
