"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var role_guard_1 = require("../../../../../../../../../../../src/common/guards/role.guard");
var jwtAuthGuard_1 = require("../../../../../../../../../../../src/common/guards/jwtAuthGuard");
var upload_constants_1 = require("../../../../../../../../../../../src/common/constants/upload.constants");
var swagger_1 = require("@nestjs/swagger");
var swagger_contants_1 = require("../../../../../../../../../../../src/common/constants/swagger.contants");
var enums_1 = require("../../../../../../../../../../../src/common/enums/enums");
var role_decorator_1 = require("../../../../../../../../../../../src/common/decorators/role.decorator");
var UploadController = function () {
    var _classDecorators = [(0, common_1.Controller)("upload")];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _uploadProfile_decorators;
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var UploadController = _classThis = /** @class */ (function () {
        function UploadController_1(uploadService) {
            this.uploadService = (__runInitializers(this, _instanceExtraInitializers), uploadService);
        }
        UploadController_1.prototype.uploadProfile = function (file, authUser) {
            return __awaiter(this, void 0, void 0, function () {
                var id, res, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = authUser.userId;
                            if (!file) {
                                return [2 /*return*/, {
                                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                                        message: upload_constants_1.Messages.FILE_FORMAT,
                                    }];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadService.createProfile(file, id)];
                        case 2:
                            res = _a.sent();
                            return [2 /*return*/, {
                                    statusCode: common_1.HttpStatus.CREATED,
                                    message: upload_constants_1.Messages.PROFILE_UPLOADED,
                                    data: { Url: res.imageUrl },
                                }];
                        case 3:
                            error_1 = _a.sent();
                            throw new common_1.BadRequestException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                message: upload_constants_1.Messages.IMAGE_FAILED_TO_SAVE,
                            });
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UploadController_1.prototype.getProfile = function (filename, res) {
            var filePath = this.uploadService.getUploadedFilePath(filename);
            if (!this.uploadService.isFileExists(filePath)) {
                return res
                    .status(common_1.HttpStatus.NOT_FOUND)
                    .json({ message: upload_constants_1.Messages.FILE_NOT_FOUND });
            }
            return res.sendFile(filePath);
        };
        UploadController_1.prototype.updateProfile = function (file, authUser) {
            return __awaiter(this, void 0, void 0, function () {
                var id, updatedUser, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = authUser.userId;
                            if (!id) {
                                throw new common_1.UnauthorizedException({
                                    status: common_1.HttpStatus.UNAUTHORIZED,
                                    message: upload_constants_1.Messages.AUTH.UNAUTHORIZED,
                                });
                            }
                            if (!file) {
                                throw new common_1.BadRequestException({
                                    status: common_1.HttpStatus.BAD_REQUEST,
                                    message: upload_constants_1.Messages.BAD_REQUEST,
                                });
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadService.updateImage(id, file)];
                        case 2:
                            updatedUser = _a.sent();
                            return [2 /*return*/, {
                                    message: upload_constants_1.Messages.PROFILE_UPDATED,
                                    data: updatedUser,
                                }];
                        case 3:
                            error_2 = _a.sent();
                            throw new common_1.InternalServerErrorException({
                                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                                message: upload_constants_1.Messages.SERVER_ERROR,
                            });
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return UploadController_1;
    }());
    __setFunctionName(_classThis, "UploadController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _uploadProfile_decorators = [(0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard), (0, common_1.Post)("uploadProfile"), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")), (0, swagger_1.ApiOperation)({ summary: swagger_contants_1.swaggerMessages.UPLOAD_FILE }), (0, swagger_1.ApiConsumes)("multipart/form-data"), (0, swagger_1.ApiBody)({
                required: true,
                schema: {
                    type: "object",
                    properties: {
                        file: {
                            type: "string",
                            format: "binary",
                        },
                    },
                },
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: upload_constants_1.Messages.PROFILE_CREATED,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.BAD_REQUEST,
                description: "".concat(upload_constants_1.Messages.FILE_NOT_FOUND, " | ").concat(upload_constants_1.Messages.IMAGE_FAILED_TO_SAVE),
            })];
        _getProfile_decorators = [(0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard), (0, common_1.Get)("getprofile/:filename"), (0, swagger_1.ApiOperation)({ summary: swagger_contants_1.swaggerMessages.GET_PROFILE_WITH_FILENAME })];
        _updateProfile_decorators = [(0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, role_guard_1.RolesGuard), (0, role_decorator_1.Roles)(enums_1.ROLES.ADMIN), (0, common_1.Patch)("update-profile"), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: swagger_contants_1.swaggerMessages.UPDATE_PROFILE_PIC }), (0, swagger_1.ApiConsumes)("multipart/form-data"), (0, swagger_1.ApiBody)({
                required: true,
                schema: {
                    type: "object",
                    properties: {
                        file: {
                            type: "string",
                            format: "binary",
                        },
                    },
                },
            }), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file"))];
        __esDecorate(_classThis, null, _uploadProfile_decorators, { kind: "method", name: "uploadProfile", static: false, private: false, access: { has: function (obj) { return "uploadProfile" in obj; }, get: function (obj) { return obj.uploadProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UploadController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UploadController = _classThis;
}();
exports.UploadController = UploadController;
