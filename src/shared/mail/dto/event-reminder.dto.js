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
exports.setEventReminderDto = exports.eventReminder = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var mail_constants_1 = require("../../../../../../../../../../../../src/common/constants/mail.constants");
var class_transformer_1 = require("class-transformer");
var eventReminder = function () {
    var _a;
    var _recipients_decorators;
    var _recipients_initializers = [];
    var _recipients_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    return _a = /** @class */ (function () {
            function eventReminder() {
                this.recipients = __runInitializers(this, _recipients_initializers, void 0);
                this.subject = (__runInitializers(this, _recipients_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
                this.date = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _date_initializers, void 0));
                __runInitializers(this, _date_extraInitializers);
            }
            return eventReminder;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _recipients_decorators = [(0, swagger_1.ApiProperty)({
                    required: true,
                    default: "",
                })];
            _subject_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({
                    required: true,
                    default: "",
                })];
            _date_decorators = [(0, class_validator_1.IsDate)({ message: mail_constants_1.Messages.INVALID_DATE }), (0, swagger_1.ApiProperty)({
                    example: "04-15-2025",
                })];
            __esDecorate(null, null, _recipients_decorators, { kind: "field", name: "recipients", static: false, private: false, access: { has: function (obj) { return "recipients" in obj; }, get: function (obj) { return obj.recipients; }, set: function (obj, value) { obj.recipients = value; } }, metadata: _metadata }, _recipients_initializers, _recipients_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.eventReminder = eventReminder;
var setEventReminderDto = function () {
    var _a;
    var _eventId_decorators;
    var _eventId_initializers = [];
    var _eventId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function setEventReminderDto() {
                this.eventId = __runInitializers(this, _eventId_initializers, void 0);
                __runInitializers(this, _eventId_extraInitializers);
            }
            return setEventReminderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _eventId_decorators = [(0, class_transformer_1.Transform)(function (value) { return Number; }), (0, class_validator_1.IsInt)(), (0, swagger_1.ApiProperty)({
                    required: true,
                })];
            __esDecorate(null, null, _eventId_decorators, { kind: "field", name: "eventId", static: false, private: false, access: { has: function (obj) { return "eventId" in obj; }, get: function (obj) { return obj.eventId; }, set: function (obj, value) { obj.eventId = value; } }, metadata: _metadata }, _eventId_initializers, _eventId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.setEventReminderDto = setEventReminderDto;
