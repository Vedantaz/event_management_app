"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var HttpExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)(common_1.HttpException)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HttpExceptionFilter = _classThis = /** @class */ (function () {
        function HttpExceptionFilter_1() {
        }
        HttpExceptionFilter_1.prototype.catch = function (exception, host) {
            var _a, _b, _c, _d;
            var context = host.switchToHttp();
            var response = context.getResponse();
            var request = context.getRequest();
            var status = exception.getStatus() || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            var message = ((_a = exception === null || exception === void 0 ? void 0 : exception.response) === null || _a === void 0 ? void 0 : _a.message)
                ? (_b = exception === null || exception === void 0 ? void 0 : exception.response) === null || _b === void 0 ? void 0 : _b.message
                : exception === null || exception === void 0 ? void 0 : exception.message;
            var code = "HttpException";
            common_1.Logger.error(message, exception.stack, "".concat(request.method, " ").concat(request.url));
            switch (exception.constructor) {
                case common_1.NotFoundException:
                    status = exception.getStatus();
                    message = exception.message;
                    code = exception.code;
                    break;
                case common_1.ForbiddenException:
                    status = exception.getStatus();
                    message = exception.message;
                    code = exception.code;
                    break;
                case common_1.UnauthorizedException:
                    status = exception.getStatus();
                    message = exception.message;
                    code = exception.code;
                    break;
                case common_1.HttpException:
                    status = exception.getStatus();
                    message = exception.message;
                    code = exception.code;
                    break;
                case client_1.Prisma.PrismaClientKnownRequestError:
                    status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                    message = exception
                        .message;
                    code = exception.code;
                    break;
                case client_1.Prisma.PrismaClientInitializationError:
                    status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                    message = exception.message;
                    code = exception.code;
                    break;
                case client_1.Prisma.PrismaClientUnknownRequestError:
                    status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                    message = exception.message;
                    code = exception.code;
                    break;
                case client_1.Prisma.PrismaClientValidationError:
                    status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                    message = exception
                        .message;
                    code = exception.code;
                    break;
                case common_1.BadRequestException:
                    status = exception.getStatus();
                    message = ((_c = exception === null || exception === void 0 ? void 0 : exception.response) === null || _c === void 0 ? void 0 : _c.message)
                        ? (_d = exception === null || exception === void 0 ? void 0 : exception.response) === null || _d === void 0 ? void 0 : _d.message
                        : exception === null || exception === void 0 ? void 0 : exception.message;
                    code = exception.code;
                    break;
                default:
                    status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            }
            response.status(status).json({
                statusCode: status,
                message: message,
                path: request.url,
                timestamp: new Date().toISOString(),
            });
        };
        return HttpExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "HttpExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpExceptionFilter = _classThis;
}();
exports.HttpExceptionFilter = HttpExceptionFilter;
