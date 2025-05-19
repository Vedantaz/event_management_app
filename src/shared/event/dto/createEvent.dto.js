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
exports.CreateEventDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var mail_constants_1 = require("../../../../../../../../../../../../src/common/constants/mail.constants");
var CreateEventDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _maxAttendees_decorators;
    var _maxAttendees_initializers = [];
    var _maxAttendees_extraInitializers = [];
    var _availableSeats_decorators;
    var _availableSeats_initializers = [];
    var _availableSeats_extraInitializers = [];
    var _imageURL_decorators;
    var _imageURL_initializers = [];
    var _imageURL_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateEventDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.date = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _date_initializers, void 0));
                this.location = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.category = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.price = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.maxAttendees = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _maxAttendees_initializers, void 0));
                this.availableSeats = (__runInitializers(this, _maxAttendees_extraInitializers), __runInitializers(this, _availableSeats_initializers, void 0));
                this.imageURL = (__runInitializers(this, _availableSeats_extraInitializers), __runInitializers(this, _imageURL_initializers, void 0));
                __runInitializers(this, _imageURL_extraInitializers);
            }
            return CreateEventDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({ example: "Tech Conference 2025" })];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({
                    description: "description",
                    required: true,
                })];
            _date_decorators = [(0, class_validator_1.IsDate)({ message: mail_constants_1.Messages.INVALID_DATE }), (0, class_transformer_1.Type)(function () { return Date; }), (0, swagger_1.ApiProperty)({
                    example: "2025-09-09",
                })];
            _location_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({
                    description: "location",
                    required: true,
                })];
            _category_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({
                    description: "category",
                    required: true,
                })];
            _price_decorators = [(0, class_validator_1.IsNumber)(), (0, swagger_1.ApiProperty)({
                    description: "price",
                    required: true,
                }), (0, class_transformer_1.Type)(function () { return Number; })];
            _maxAttendees_decorators = [(0, swagger_1.ApiProperty)({
                    description: "maxAttendees",
                    required: true,
                }), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            _availableSeats_decorators = [(0, class_validator_1.IsNumber)(), (0, swagger_1.ApiProperty)({
                    description: "availableSeats",
                    required: true,
                }), (0, class_transformer_1.Type)(function () { return Number; })];
            _imageURL_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: "string", format: "binary" }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _maxAttendees_decorators, { kind: "field", name: "maxAttendees", static: false, private: false, access: { has: function (obj) { return "maxAttendees" in obj; }, get: function (obj) { return obj.maxAttendees; }, set: function (obj, value) { obj.maxAttendees = value; } }, metadata: _metadata }, _maxAttendees_initializers, _maxAttendees_extraInitializers);
            __esDecorate(null, null, _availableSeats_decorators, { kind: "field", name: "availableSeats", static: false, private: false, access: { has: function (obj) { return "availableSeats" in obj; }, get: function (obj) { return obj.availableSeats; }, set: function (obj, value) { obj.availableSeats = value; } }, metadata: _metadata }, _availableSeats_initializers, _availableSeats_extraInitializers);
            __esDecorate(null, null, _imageURL_decorators, { kind: "field", name: "imageURL", static: false, private: false, access: { has: function (obj) { return "imageURL" in obj; }, get: function (obj) { return obj.imageURL; }, set: function (obj, value) { obj.imageURL = value; } }, metadata: _metadata }, _imageURL_initializers, _imageURL_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateEventDto = CreateEventDto;
