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
exports.BookingService = void 0;
var common_1 = require("@nestjs/common");
var booking_constants_1 = require("../../../../../../../../../../../src/common/constants/booking.constants");
var client_1 = require("@prisma/client");
var enums_1 = require("../../../../../../../../../../../src/common/enums/enums");
var BookingService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BookingService = _classThis = /** @class */ (function () {
        function BookingService_1(prisma, mailService) {
            this.prisma = prisma;
            this.mailService = mailService;
        }
        BookingService_1.prototype.eventBooking = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var user, event, booking, totalPrice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException({
                                    status: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.USER_NOT_FOUND,
                                });
                            }
                            return [4 /*yield*/, this.prisma.event.findUnique({
                                    where: { id: data.eventId },
                                })];
                        case 2:
                            event = _a.sent();
                            if (!event) {
                                throw new common_1.NotFoundException({
                                    status: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.EVENT_NOT_FOUND,
                                });
                            }
                            return [4 /*yield*/, this.prisma.booking.findFirst({
                                    where: { eventId: data.eventId, userId: userId },
                                })];
                        case 3:
                            booking = _a.sent();
                            if (booking) {
                                throw new common_1.BadRequestException({
                                    status: common_1.HttpStatus.BAD_REQUEST,
                                    message: booking_constants_1.bookingMessages.ALREADY_BOOKED,
                                });
                            }
                            if (event.availableSeats < data.ticketCount) {
                                throw new common_1.BadRequestException({
                                    status: common_1.HttpStatus.BAD_REQUEST,
                                    message: booking_constants_1.bookingMessages.NOT_ENOUGH_SEATS,
                                });
                            }
                            totalPrice = event.price * data.ticketCount;
                            if (!(totalPrice === data.amount)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.event.update({
                                    where: { id: data.eventId },
                                    data: { availableSeats: event.availableSeats - data.ticketCount },
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.booking.create({
                                    data: {
                                        userId: userId,
                                        eventId: data.eventId,
                                        ticketCount: data.ticketCount,
                                        amount: totalPrice,
                                    },
                                })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                        case 6: throw new common_1.BadRequestException(booking_constants_1.bookingMessages.AMOUNT_MISMATCH);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        BookingService_1.prototype.getBookings = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findMany()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        BookingService_1.prototype.deleteBooking = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, userId, user, event;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findFirst({
                                where: { id: data.bookingId },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException({
                                    status: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.NO_BOOKING_FOUND,
                                });
                            }
                            userId = booking.userId;
                            return [4 /*yield*/, this.prisma.booking.update({
                                    where: { id: data.bookingId },
                                    data: { status: client_1.BookingStatus.CANCELED },
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.cancellation.create({
                                    data: {
                                        userId: userId,
                                        eventId: booking.eventId,
                                        bookingId: booking.id,
                                        amount: booking.amount,
                                        status: enums_1.CancelStatus.PROCESSING,
                                    },
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                })];
                        case 4:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException({
                                    status: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.USER_NOT_FOUND,
                                });
                            }
                            return [4 /*yield*/, this.prisma.event.findUnique({
                                    where: { id: userId },
                                })];
                        case 5:
                            event = _a.sent();
                            if (!event) {
                                throw new common_1.NotFoundException({
                                    status: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.EVENT_NOT_FOUND,
                                });
                            }
                            return [4 /*yield*/, this.mailService.sendBookingCancellation({
                                    email: user.email,
                                    name: user.name,
                                    event: event.name,
                                })];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, { message: booking_constants_1.bookingMessages.REFUND_PROCESSED_SUCCESS }];
                    }
                });
            });
        };
        BookingService_1.prototype.getBookingByStatus = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                var bookings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findMany({
                                where: { status: status },
                            })];
                        case 1:
                            bookings = _a.sent();
                            if (!bookings || bookings.length === 0) {
                                return [2 /*return*/];
                            }
                            return [2 /*return*/, {
                                    message: booking_constants_1.bookingMessages.BOOKING_RETRIEVED_SUCCESS,
                                    data: bookings,
                                }];
                    }
                });
            });
        };
        BookingService_1.prototype.confirmBookingStatus = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var booking, eventId, event, userId, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findUnique({
                                where: { id: data.bookingId },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.NotFoundException({
                                    statusCode: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.NO_BOOKING_FOUND,
                                });
                            }
                            eventId = booking.eventId;
                            if (data.status === booking.status) {
                                throw new common_1.BadRequestException({
                                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                                    message: booking_constants_1.bookingMessages.SAME_BOOKING_STATUS,
                                });
                            }
                            return [4 /*yield*/, this.prisma.booking.update({
                                    where: { id: data.bookingId },
                                    data: { status: data.status },
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.event.findUnique({
                                    where: { id: eventId },
                                })];
                        case 3:
                            event = _a.sent();
                            userId = booking.userId;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                })];
                        case 4:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException({
                                    statusCode: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.USER_NOT_FOUND,
                                });
                            }
                            if (!event) {
                                throw new common_1.NotFoundException(booking_constants_1.bookingMessages.EVENT_NOT_FOUND);
                            }
                            return [4 /*yield*/, this.mailService.sendEventBookingConfirmation({
                                    email: user.email,
                                    name: user.name,
                                    event: event.name,
                                })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        BookingService_1.prototype.processRefund = function (cancellationId) {
            return __awaiter(this, void 0, void 0, function () {
                var cancellation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.cancellation.findUnique({
                                where: { id: cancellationId },
                            })];
                        case 1:
                            cancellation = _a.sent();
                            if (!cancellation) {
                                throw new common_1.NotFoundException({
                                    status: common_1.HttpStatus.NOT_FOUND,
                                    message: booking_constants_1.bookingMessages.CANCELLATION_NOT_FOUND,
                                });
                            }
                            if (cancellation.status === enums_1.CancelStatus.PENDING) {
                                throw new common_1.BadRequestException({
                                    status: common_1.HttpStatus.BAD_REQUEST,
                                    message: booking_constants_1.bookingMessages.STATUS_PENDING,
                                });
                            }
                            if (cancellation.status === enums_1.CancelStatus.COMPLETED) {
                                throw new common_1.BadRequestException({
                                    status: common_1.HttpStatus.BAD_REQUEST,
                                    message: booking_constants_1.bookingMessages.REFUND_PROCESS_ALREADY_COMPLETED,
                                });
                            }
                            return [4 /*yield*/, this.prisma.cancellation.update({
                                    where: { id: cancellationId },
                                    data: { status: enums_1.CancelStatus.COMPLETED },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return BookingService_1;
    }());
    __setFunctionName(_classThis, "BookingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingService = _classThis;
}();
exports.BookingService = BookingService;
