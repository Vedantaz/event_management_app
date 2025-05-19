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
exports.SearchFilterDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var event_constants_1 = require("../../../../../../../../../../../../src/common/constants/event.constants");
var swagger_1 = require("@nestjs/swagger");
var enums_1 = require("../../../../../../../../../../../../src/common/enums/enums");
var SearchFilterDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _availableSeats_decorators;
    var _availableSeats_initializers = [];
    var _availableSeats_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SearchFilterDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.location = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.category = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.startDate = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.availableSeats = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _availableSeats_initializers, void 0));
                this.sortBy = (__runInitializers(this, _availableSeats_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
                this.order = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _order_initializers, void 0));
                this.page = (__runInitializers(this, _order_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 4));
                __runInitializers(this, _limit_extraInitializers);
            }
            return SearchFilterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, swagger_1.ApiProperty)({
                    required: false,
                }), (0, class_validator_1.IsString)()];
            _location_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({
                    required: false,
                }), (0, class_validator_1.IsOptional)()];
            _category_decorators = [(0, swagger_1.ApiProperty)({
                    required: false,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _startDate_decorators = [(0, swagger_1.ApiProperty)({
                    required: false,
                    description: "(YYYY-MM-DD)",
                    example: "2025-04-01",
                }), (0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _endDate_decorators = [(0, swagger_1.ApiProperty)({
                    required: false,
                    description: "(YYYY-MM-DD)",
                    example: "2025-04-16",
                }), (0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _availableSeats_decorators = [(0, swagger_1.ApiProperty)({
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return Number(value);
                })];
            _sortBy_decorators = [(0, swagger_1.ApiProperty)({
                    required: false,
                    enum: enums_1.SortBy,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(enums_1.SortBy, {
                    message: event_constants_1.eventMessages.SORT_BY_PROPERTY,
                })];
            _order_decorators = [(0, swagger_1.ApiProperty)({
                    required: false,
                    enum: enums_1.OrderBy,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(enums_1.OrderBy, { message: event_constants_1.eventMessages.ORDER_SORT })];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _availableSeats_decorators, { kind: "field", name: "availableSeats", static: false, private: false, access: { has: function (obj) { return "availableSeats" in obj; }, get: function (obj) { return obj.availableSeats; }, set: function (obj, value) { obj.availableSeats = value; } }, metadata: _metadata }, _availableSeats_initializers, _availableSeats_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SearchFilterDto = SearchFilterDto;
