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
exports.sendEmailDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var sendEmailDto = function () {
    var _a;
    var _recipients_decorators;
    var _recipients_initializers = [];
    var _recipients_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _body_decorators;
    var _body_initializers = [];
    var _body_extraInitializers = [];
    var _text_decorators;
    var _text_initializers = [];
    var _text_extraInitializers = [];
    var _scheduleTime_decorators;
    var _scheduleTime_initializers = [];
    var _scheduleTime_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    return _a = /** @class */ (function () {
            function sendEmailDto() {
                this.recipients = __runInitializers(this, _recipients_initializers, void 0);
                this.subject = (__runInitializers(this, _recipients_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
                this.body = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _body_initializers, void 0));
                this.text = (__runInitializers(this, _body_extraInitializers), __runInitializers(this, _text_initializers, void 0));
                this.scheduleTime = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _scheduleTime_initializers, void 0));
                this.date = (__runInitializers(this, _scheduleTime_extraInitializers), __runInitializers(this, _date_initializers, void 0));
                __runInitializers(this, _date_extraInitializers);
            }
            return sendEmailDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _recipients_decorators = [(0, class_validator_1.IsEmail)({}, { each: true }), (0, swagger_1.ApiProperty)()];
            _subject_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)()];
            _body_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)()];
            _text_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _scheduleTime_decorators = [(0, class_validator_1.IsString)()];
            _date_decorators = [(0, class_validator_1.IsDate)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _recipients_decorators, { kind: "field", name: "recipients", static: false, private: false, access: { has: function (obj) { return "recipients" in obj; }, get: function (obj) { return obj.recipients; }, set: function (obj, value) { obj.recipients = value; } }, metadata: _metadata }, _recipients_initializers, _recipients_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _body_decorators, { kind: "field", name: "body", static: false, private: false, access: { has: function (obj) { return "body" in obj; }, get: function (obj) { return obj.body; }, set: function (obj, value) { obj.body = value; } }, metadata: _metadata }, _body_initializers, _body_extraInitializers);
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: function (obj) { return "text" in obj; }, get: function (obj) { return obj.text; }, set: function (obj, value) { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _scheduleTime_decorators, { kind: "field", name: "scheduleTime", static: false, private: false, access: { has: function (obj) { return "scheduleTime" in obj; }, get: function (obj) { return obj.scheduleTime; }, set: function (obj, value) { obj.scheduleTime = value; } }, metadata: _metadata }, _scheduleTime_initializers, _scheduleTime_extraInitializers);
            __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.sendEmailDto = sendEmailDto;
