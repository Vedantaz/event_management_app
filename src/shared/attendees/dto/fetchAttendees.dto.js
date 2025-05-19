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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInAttendeeResponseDto = exports.CheckInAttendeeDto = exports.FilterAttendeesDto = exports.FetchAttendeesDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var FetchAttendeesDto = function () {
    var _a;
    var _eventId_decorators;
    var _eventId_initializers = [];
    var _eventId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FetchAttendeesDto() {
                this.eventId = __runInitializers(this, _eventId_initializers, void 0);
                __runInitializers(this, _eventId_extraInitializers);
            }
            return FetchAttendeesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _eventId_decorators = [(0, class_transformer_1.Type)(function (value) { return Number; }), (0, class_validator_1.IsInt)(), (0, swagger_1.ApiProperty)({
                    required: true,
                })];
            __esDecorate(null, null, _eventId_decorators, { kind: "field", name: "eventId", static: false, private: false, access: { has: function (obj) { return "eventId" in obj; }, get: function (obj) { return obj.eventId; }, set: function (obj, value) { obj.eventId = value; } }, metadata: _metadata }, _eventId_initializers, _eventId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FetchAttendeesDto = FetchAttendeesDto;
var FilterAttendeesDto = function () {
    var _a;
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FilterAttendeesDto() {
                this.startDate = __runInitializers(this, _startDate_initializers, void 0);
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                __runInitializers(this, _endDate_extraInitializers);
            }
            return FilterAttendeesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _startDate_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsDateString)(), (0, swagger_1.ApiProperty)({
                    required: false,
                    description: "(YYYY-MM-DD)",
                })];
            _endDate_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsDateString)(), (0, swagger_1.ApiProperty)({
                    required: false,
                    description: "(YYYY-MM-DD)",
                })];
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FilterAttendeesDto = FilterAttendeesDto;
var CheckInAttendeeDto = function () {
    var _a;
    var _bookingId_decorators;
    var _bookingId_initializers = [];
    var _bookingId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CheckInAttendeeDto() {
                this.bookingId = __runInitializers(this, _bookingId_initializers, void 0);
                __runInitializers(this, _bookingId_extraInitializers);
            }
            return CheckInAttendeeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _bookingId_decorators = [(0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return parseInt(value);
                }), (0, swagger_1.ApiProperty)({
                    required: true,
                })];
            __esDecorate(null, null, _bookingId_decorators, { kind: "field", name: "bookingId", static: false, private: false, access: { has: function (obj) { return "bookingId" in obj; }, get: function (obj) { return obj.bookingId; }, set: function (obj, value) { obj.bookingId = value; } }, metadata: _metadata }, _bookingId_initializers, _bookingId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CheckInAttendeeDto = CheckInAttendeeDto;
var CheckInAttendeeResponseDto = /** @class */ (function () {
    function CheckInAttendeeResponseDto() {
    }
    return CheckInAttendeeResponseDto;
}());
exports.CheckInAttendeeResponseDto = CheckInAttendeeResponseDto;
