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
exports.MailService = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var mail_constants_1 = require("../../../../../../../../../../../src/common/constants/mail.constants");
var MailService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleReminder_decorators;
    var MailService = _classThis = /** @class */ (function () {
        function MailService_1(mailerService, prisma) {
            this.mailerService = (__runInitializers(this, _instanceExtraInitializers), mailerService);
            this.prisma = prisma;
            this.logger = new common_1.Logger(MailService.name);
        }
        MailService_1.prototype.sendEventReminder = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var event, attendees, emailRecipients, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log(mail_constants_1.Messages.CHECK_UPCOMING_EVENTS);
                            return [4 /*yield*/, this.prisma.event.findUnique({
                                    where: { id: data.eventId },
                                })];
                        case 1:
                            event = _a.sent();
                            if (!event) {
                                this.logger.error("".concat(mail_constants_1.Messages.EVENT_NOT_FOUND_ID, " ").concat(data.eventId));
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.prisma.booking.findMany({
                                    where: { eventId: data.eventId },
                                    include: { user: true },
                                })];
                        case 2:
                            attendees = _a.sent();
                            if (!attendees.length) {
                                this.logger.warn("".concat(mail_constants_1.Messages.NO_ATTENDEES_FOUND_FOR_EVENT, " ").concat(event["name"]));
                                return [2 /*return*/];
                            }
                            emailRecipients = attendees.map(function (attendee) { return attendee.user.email; });
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: emailRecipients,
                                    subject: mail_constants_1.Messages.EVENT_REMINDER,
                                    text: "".concat(mail_constants_1.Messages.REMINDER_YOUR_EVENT, " ").concat(event.name, " ").concat(mail_constants_1.Messages.IS_SCHEDULED_ON, " ").concat(event.date, "."),
                                })];
                        case 4:
                            _a.sent();
                            this.logger.log("".concat(mail_constants_1.Messages.EVENT_REMINDER_SEND_TO).concat(emailRecipients.length, " ").concat(mail_constants_1.Messages.ATTENDEES_FOR, " ").concat(event.name));
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            this.logger.error(mail_constants_1.Messages.FAIL_EVENT_REMINDER, error_1.stack);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.handleReminder = function () {
            return __awaiter(this, void 0, void 0, function () {
                var upcomingEvents, _i, upcomingEvents_1, event_1, reminderErr_1, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            return [4 /*yield*/, this.prisma.event.findMany({
                                    where: {
                                        date: { gte: new Date() },
                                    },
                                })];
                        case 1:
                            upcomingEvents = _a.sent();
                            if (!upcomingEvents || upcomingEvents.length === 0) {
                                return [2 /*return*/];
                            }
                            _i = 0, upcomingEvents_1 = upcomingEvents;
                            _a.label = 2;
                        case 2:
                            if (!(_i < upcomingEvents_1.length)) return [3 /*break*/, 7];
                            event_1 = upcomingEvents_1[_i];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.sendEventReminder({ eventId: event_1.id })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            reminderErr_1 = _a.sent();
                            common_1.Logger.error("".concat(mail_constants_1.Messages.FAILED_TO_SENT_REMINDER, " ").concat(event_1.id, ":"), reminderErr_1);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            err_1 = _a.sent();
                            common_1.Logger.error(mail_constants_1.Messages.ERROR_HANDLE_REMINDER, err_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendRegistrationConfirmation = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var name, event, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = data.name, event = data.event;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: data.email,
                                    subject: mail_constants_1.Messages.REGISTRATION_SUCCESS,
                                    text: mail_constants_1.Messages.REGISTERING_THANKS,
                                    context: {
                                        name: name,
                                        event: event,
                                    },
                                })];
                        case 2:
                            _a.sent();
                            this.logger.log("".concat(mail_constants_1.Messages.REGISTRATION_EMAIL_SEND_TO, " ").concat(data.email));
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            this.logger.error("".concat(mail_constants_1.Messages.FAILED_TO_SENT_REGISTRATION_EMAIL, " ").concat(data.email), error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendEventBookingConfirmation = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: data.email,
                                    subject: mail_constants_1.Messages.EVENT_BOOKING_CONFIRMATION,
                                    text: "".concat(mail_constants_1.Messages.BOOKING_IS_CONFIRMED, " ").concat(data.event),
                                    context: { name: data.name, event: data.event },
                                })];
                        case 1:
                            _a.sent();
                            this.logger.log("".concat(mail_constants_1.Messages.EVENT_BOOKING_CONFIRMATION_SENDTO, " ").concat(data.email));
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("".concat(mail_constants_1.Messages.FAIL_TO_SEND_EMAIL_CONFIRMATION).concat(data.email), error_3.stack);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MailService_1.prototype.sendBookingCancellation = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: data.email,
                                    subject: mail_constants_1.Messages.BOOKING_CANCELLATION,
                                    text: "".concat(mail_constants_1.Messages.BOOKING_IS_CANCELLED, " ").concat(data.event),
                                    context: { name: data.name, event: data.event },
                                })];
                        case 1:
                            _a.sent();
                            this.logger.log("".concat(mail_constants_1.Messages.BOOKING_CANCELLATION_EMAIL, " ").concat(data.email));
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("".concat(mail_constants_1.Messages.BOOKING_CANCELLATION_EMAIL).concat(data.email), error_4.stack);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return MailService_1;
    }());
    __setFunctionName(_classThis, "MailService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleReminder_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_HOURS)];
        __esDecorate(_classThis, null, _handleReminder_decorators, { kind: "method", name: "handleReminder", static: false, private: false, access: { has: function (obj) { return "handleReminder" in obj; }, get: function (obj) { return obj.handleReminder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MailService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MailService = _classThis;
}();
exports.MailService = MailService;
