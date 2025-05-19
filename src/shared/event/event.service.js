"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.EventService = void 0;
var common_1 = require("@nestjs/common");
var fs = require("fs");
var path = require("path");
var mail_constants_1 = require("../../../../../../../../../../../src/common/constants/mail.constants");
var event_constants_1 = require("../../../../../../../../../../../src/common/constants/event.constants");
var enums_1 = require("../../../../../../../../../../../src/common/enums/enums");
var uuid_1 = require("uuid");
var EventService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EventService = _classThis = /** @class */ (function () {
        function EventService_1(prisma) {
            this.prisma = prisma;
            this.uploadDir = path.join(__dirname, "../../uploads/events");
            this.ensureUploadImg();
        }
        EventService_1.prototype.ensureUploadImg = function () {
            if (!fs.existsSync(this.uploadDir)) {
                fs.mkdirSync(this.uploadDir, { recursive: true });
            }
        };
        EventService_1.prototype.createEvent = function (data, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var imageURL, date, fileName, ext, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            imageURL = data.imageURL, date = data.date;
                            fileName = null;
                            if (imageURL) {
                                ext = path.extname(imageURL.originalname);
                                fileName = "".concat(userId, "-").concat((0, uuid_1.v4)()).concat(ext);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.prisma.event.create({
                                    data: __assign(__assign({}, data), { date: new Date(date), imageURL: fileName ? "".concat(mail_constants_1.Messages.FILE_IMAGE_URL).concat(fileName) : null, userId: userId }),
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            error_1 = _a.sent();
                            throw new common_1.BadRequestException(mail_constants_1.Messages.EVENT_CREATION_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        EventService_1.prototype.getAllEvents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var events;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findMany()];
                        case 1:
                            events = _a.sent();
                            return [2 /*return*/, { data: events }];
                    }
                });
            });
        };
        EventService_1.prototype.getEventById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findUnique({ where: { id: id } })];
                        case 1:
                            event = _a.sent();
                            if (!event)
                                throw new common_1.NotFoundException(mail_constants_1.Messages.EVENT_NOT_FOUND);
                            return [2 /*return*/, { data: event }];
                    }
                });
            });
        };
        EventService_1.prototype.updateEvent = function (eventId, data, newfile) {
            return __awaiter(this, void 0, void 0, function () {
                var existingEvent, updatedData, oldFilePath, updatedEvent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findUnique({
                                where: { id: eventId },
                            })];
                        case 1:
                            existingEvent = _a.sent();
                            if (!existingEvent) {
                                throw new common_1.NotFoundException();
                            }
                            if (!newfile ||
                                !data.availableSeats ||
                                !data.category ||
                                !data.date ||
                                !data.description ||
                                !data.location ||
                                !data.maxAttendees ||
                                !data.name ||
                                !data.price) {
                                throw new common_1.BadRequestException(event_constants_1.eventMessages.NO_DATA_PROVIDED);
                            }
                            return [4 /*yield*/, this.prisma.event.update({
                                    where: { id: eventId },
                                    data: __assign({}, data),
                                })];
                        case 2:
                            updatedData = _a.sent();
                            if (newfile) {
                                if (existingEvent.imageURL) {
                                    oldFilePath = path.join(this.uploadDir, existingEvent.imageURL);
                                    if (fs.existsSync(oldFilePath)) {
                                        fs.unlinkSync(oldFilePath);
                                    }
                                }
                                updatedData.imageURL = newfile.filename;
                            }
                            return [4 /*yield*/, this.prisma.event.update({
                                    where: { id: eventId },
                                    data: updatedData,
                                })];
                        case 3:
                            updatedEvent = _a.sent();
                            return [2 /*return*/, {
                                    statusCode: common_1.HttpStatus.OK,
                                    message: event_constants_1.eventMessages.EVENT_DATA_UPDATED,
                                    event: updatedEvent,
                                    imageUrl: newfile
                                        ? "".concat(mail_constants_1.Messages.GETEVENT_IMAGEURL).concat(newfile.filename)
                                        : existingEvent.imageURL,
                                }];
                    }
                });
            });
        };
        EventService_1.prototype.deleteEvent = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.event.delete({ where: { id: id } })];
                });
            });
        };
        EventService_1.prototype.getAttendeesForEvent = function (eventId) {
            return __awaiter(this, void 0, void 0, function () {
                var attendees;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findMany({
                                where: { eventId: eventId },
                                include: { user: true },
                            })];
                        case 1:
                            attendees = _a.sent();
                            return [2 /*return*/, attendees.map(function (_a) {
                                    var user = _a.user;
                                    return user;
                                })];
                    }
                });
            });
        };
        EventService_1.prototype.searchAndFilterEvents = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, skip, total, filters, start, end, orderBy, result;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = data.page, page = _a === void 0 ? 1 : _a, _b = data.limit, limit = _b === void 0 ? 3 : _b;
                            skip = (page - 1) * limit;
                            if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
                                throw new common_1.BadRequestException(event_constants_1.eventMessages.PAGE_LIMIT_MUST_BE_POSITIVE);
                            }
                            return [4 /*yield*/, this.prisma.event.count()];
                        case 1:
                            total = _c.sent();
                            filters = {};
                            if (data.name)
                                filters.name = { equals: data.name };
                            if (data.location)
                                filters.location = { equals: data.location };
                            if (data.category)
                                filters.category = { equals: data.category };
                            if (data.availableSeats) {
                                filters.availableSeats = { equals: Number(data.availableSeats) };
                                if (isNaN(data.availableSeats))
                                    throw new common_1.BadRequestException(event_constants_1.eventMessages.AVAILABLE_SEATS_MUST_BE_NUMBER);
                                filters.availableSeats = { equals: data.availableSeats };
                            }
                            if (data.startDate && data.endDate) {
                                start = new Date(data.startDate);
                                end = new Date(data.endDate);
                                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                                    throw new common_1.BadRequestException(event_constants_1.eventMessages.INVALID_START_END_DATE);
                                }
                                filters.date = {
                                    gte: start,
                                    lte: end,
                                };
                            }
                            orderBy = { date: "asc" };
                            if (data.sortBy === enums_1.SortBy.POPULARITY)
                                orderBy = {
                                    availableSeats: data.order === enums_1.OrderBy.DESC ? enums_1.OrderBy.DESC : enums_1.OrderBy.ASC,
                                };
                            else if (data.sortBy === enums_1.SortBy.DATE)
                                orderBy = {
                                    date: data.order === enums_1.OrderBy.DESC ? enums_1.OrderBy.DESC : enums_1.OrderBy.ASC,
                                };
                            else if (data.sortBy === enums_1.SortBy.PRICE)
                                orderBy = {
                                    price: data.order === enums_1.OrderBy.DESC ? enums_1.OrderBy.DESC : enums_1.OrderBy.ASC,
                                };
                            return [4 /*yield*/, this.prisma.event.findMany({
                                    where: filters,
                                    orderBy: orderBy,
                                    skip: skip,
                                    take: limit,
                                })];
                        case 2:
                            result = _c.sent();
                            if (!(result.length > 0)) return [3 /*break*/, 3];
                            return [2 /*return*/, {
                                    totalEvents: total,
                                    page: page,
                                    limit: limit,
                                    totalPages: Math.ceil(total / limit),
                                    data: result,
                                }];
                        case 3: return [4 /*yield*/, this.prisma.event.findMany()];
                        case 4: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        return EventService_1;
    }());
    __setFunctionName(_classThis, "EventService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventService = _classThis;
}();
exports.EventService = EventService;
