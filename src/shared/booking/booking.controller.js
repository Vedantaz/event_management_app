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
exports.BookingController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwtAuthGuard_1 = require("../../../../../../../../../../../src/common/guards/jwtAuthGuard");
var role_guard_1 = require("../../../../../../../../../../../src/common/guards/role.guard");
var enums_1 = require("../../../../../../../../../../../src/common/enums/enums");
var client_1 = require("@prisma/client");
var role_decorator_1 = require("../../../../../../../../../../../src/common/decorators/role.decorator");
var booking_constants_1 = require("../../../../../../../../../../../src/common/constants/booking.constants");
var swagger_contants_1 = require("../../../../../../../../../../../src/common/constants/swagger.contants");
var BookingController = function () {
    var _classDecorators = [(0, common_1.Controller)("booking"), (0, swagger_1.ApiTags)("bookings")];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createBooking_decorators;
    var _getAllBookings_decorators;
    var _getBooking_decorators;
    var _confirmBookings_decorators;
    var _CancelBooking_decorators;
    var _processRefund_decorators;
    var BookingController = _classThis = /** @class */ (function () {
        function BookingController_1(bookingService) {
            this.bookingService = (__runInitializers(this, _instanceExtraInitializers), bookingService);
        }
        BookingController_1.prototype.createBooking = function (data, authUser) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, bookings, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = authUser.userId;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.bookingService.eventBooking(userId, data)];
                        case 2:
                            bookings = _a.sent();
                            return [2 /*return*/, {
                                    message: booking_constants_1.bookingMessages.BOOKING_CREATED_SUCCESS,
                                    data: bookings,
                                    statusCode: common_1.HttpStatus.CREATED,
                                }];
                        case 3:
                            error_1 = _a.sent();
                            throw new common_1.HttpException(error_1.message, common_1.HttpStatus.BAD_REQUEST);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        BookingController_1.prototype.getAllBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                var bookings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingService.getBookings()];
                        case 1:
                            bookings = _a.sent();
                            return [2 /*return*/, {
                                    message: bookings.length
                                        ? booking_constants_1.bookingMessages.BOOKING_RETRIEVED_SUCCESS
                                        : booking_constants_1.bookingMessages.NO_BOOKING_FOUND,
                                    data: bookings,
                                }];
                    }
                });
            });
        };
        BookingController_1.prototype.getBooking = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedStatus, booking, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            normalizedStatus = status === null || status === void 0 ? void 0 : status.toUpperCase();
                            if (!client_1.BookingStatus[normalizedStatus]) {
                                throw new common_1.BadRequestException(booking_constants_1.bookingMessages.INVALID_BOOKING_STATUS);
                            }
                            return [4 /*yield*/, this.bookingService.getBookingByStatus(client_1.BookingStatus[normalizedStatus])];
                        case 1:
                            booking = _a.sent();
                            if (booking) {
                                return [2 /*return*/, {
                                        statusCode: common_1.HttpStatus.OK,
                                        message: booking_constants_1.bookingMessages.BOOKING_FOUND,
                                        data: booking,
                                    }];
                            }
                            return [2 /*return*/, { message: booking_constants_1.bookingMessages.NO_BOOKING_FOUND }];
                        case 2:
                            error_2 = _a.sent();
                            throw new common_1.HttpException(error_2.message, common_1.HttpStatus.NOT_FOUND);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        BookingController_1.prototype.confirmBookings = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var booking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingService.confirmBookingStatus(dto)];
                        case 1:
                            booking = _a.sent();
                            return [2 /*return*/, {
                                    statuCode: common_1.HttpStatus.OK,
                                    message: booking_constants_1.bookingMessages.BOOKING_UPDATE_SUCCESS,
                                    data: booking,
                                }];
                    }
                });
            });
        };
        BookingController_1.prototype.CancelBooking = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.bookingService.deleteBooking(data)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: booking_constants_1.bookingMessages.BOOKING_CANCELLED_SUCCESS }];
                        case 2:
                            error_3 = _a.sent();
                            throw new common_1.HttpException(error_3.message, common_1.HttpStatus.NOT_FOUND);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        BookingController_1.prototype.processRefund = function (cancellationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.bookingService.processRefund(cancellationId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    statusCode: common_1.HttpStatus.OK,
                                    message: booking_constants_1.bookingMessages.REFUND_PROCESSED_SUCCESS,
                                }];
                    }
                });
            });
        };
        return BookingController_1;
    }());
    __setFunctionName(_classThis, "BookingController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createBooking_decorators = [(0, common_1.Post)("ticket-booking"), (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard), (0, swagger_1.ApiOperation)({ summary: booking_constants_1.bookingMessages.CREATING_BOOKING_FOR_EVENT }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CREATED,
                description: booking_constants_1.bookingMessages.EVENT_TICKET_BOOKED,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: booking_constants_1.bookingMessages.USER_NOT_FOUND,
            }), (0, swagger_1.ApiResponse)({
                status: 403,
                description: booking_constants_1.bookingMessages.FORBIDDEN_MSG,
            })];
        _getAllBookings_decorators = [(0, common_1.Get)("get-all"), (0, swagger_1.ApiOperation)({ summary: booking_constants_1.bookingMessages.GET_ALL_BOOKINGS })];
        _getBooking_decorators = [(0, common_1.Get)("get-by-status"), (0, swagger_1.ApiOperation)({ summary: booking_constants_1.bookingMessages.GET_SPECIFIC_DATA }), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, role_guard_1.RolesGuard), (0, role_decorator_1.Roles)(enums_1.ROLES.ADMIN)];
        _confirmBookings_decorators = [(0, common_1.Post)("confirm-booking-by-status"), (0, swagger_1.ApiBearerAuth)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, role_guard_1.RolesGuard), (0, role_decorator_1.Roles)(enums_1.ROLES.ADMIN), (0, swagger_1.ApiOperation)({ summary: swagger_contants_1.swaggerMessages.CONFIRM_BOOKING })];
        _CancelBooking_decorators = [(0, common_1.Delete)("cancel-booking"), (0, swagger_1.ApiOperation)({ summary: booking_constants_1.bookingMessages.CANCEL_BOOKING }), (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard)];
        _processRefund_decorators = [(0, common_1.Post)("process-refund/:id"), (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, role_guard_1.RolesGuard), (0, role_decorator_1.Roles)(enums_1.ROLES.ADMIN), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: booking_constants_1.bookingMessages.REFUND_PROCESS })];
        __esDecorate(_classThis, null, _createBooking_decorators, { kind: "method", name: "createBooking", static: false, private: false, access: { has: function (obj) { return "createBooking" in obj; }, get: function (obj) { return obj.createBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllBookings_decorators, { kind: "method", name: "getAllBookings", static: false, private: false, access: { has: function (obj) { return "getAllBookings" in obj; }, get: function (obj) { return obj.getAllBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBooking_decorators, { kind: "method", name: "getBooking", static: false, private: false, access: { has: function (obj) { return "getBooking" in obj; }, get: function (obj) { return obj.getBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _confirmBookings_decorators, { kind: "method", name: "confirmBookings", static: false, private: false, access: { has: function (obj) { return "confirmBookings" in obj; }, get: function (obj) { return obj.confirmBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _CancelBooking_decorators, { kind: "method", name: "CancelBooking", static: false, private: false, access: { has: function (obj) { return "CancelBooking" in obj; }, get: function (obj) { return obj.CancelBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _processRefund_decorators, { kind: "method", name: "processRefund", static: false, private: false, access: { has: function (obj) { return "processRefund" in obj; }, get: function (obj) { return obj.processRefund; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingController = _classThis;
}();
exports.BookingController = BookingController;
