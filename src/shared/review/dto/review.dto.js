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
exports.ReviewQueryDto = exports.getALlReviewsDto = exports.CreateReviewDto = void 0;
// create-review.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var event_constants_1 = require("../../../../../../../../../../../../src/common/constants/event.constants");
var enums_1 = require("../../../../../../../../../../../../src/common/enums/enums");
var CreateReviewDto = function () {
    var _a;
    var _eventId_decorators;
    var _eventId_initializers = [];
    var _eventId_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateReviewDto() {
                this.eventId = __runInitializers(this, _eventId_initializers, void 0);
                this.rating = (__runInitializers(this, _eventId_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
                this.message = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                __runInitializers(this, _message_extraInitializers);
            }
            return CreateReviewDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _eventId_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, swagger_1.ApiProperty)({
                    required: true,
                }), (0, class_transformer_1.Type)(function () { return Number; })];
            _rating_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5), (0, swagger_1.ApiProperty)({
                    required: true,
                })];
            _message_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({
                    required: true,
                })];
            __esDecorate(null, null, _eventId_decorators, { kind: "field", name: "eventId", static: false, private: false, access: { has: function (obj) { return "eventId" in obj; }, get: function (obj) { return obj.eventId; }, set: function (obj, value) { obj.eventId = value; } }, metadata: _metadata }, _eventId_initializers, _eventId_extraInitializers);
            __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateReviewDto = CreateReviewDto;
var getALlReviewsDto = function () {
    var _a;
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _order_decorators;
    var _order_initializers = [];
    var _order_extraInitializers = [];
    return _a = /** @class */ (function () {
            function getALlReviewsDto() {
                this.sortBy = __runInitializers(this, _sortBy_initializers, void 0);
                this.order = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _order_initializers, void 0));
                __runInitializers(this, _order_extraInitializers);
            }
            return getALlReviewsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sortBy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(enums_1.SortBy, {
                    message: event_constants_1.eventMessages.SORT_BY_REVIEW_PROPERTY,
                })];
            _order_decorators = [(0, swagger_1.ApiProperty)({
                    required: false,
                    enum: enums_1.OrderBy,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(enums_1.OrderBy, { message: event_constants_1.eventMessages.ORDER_SORT })];
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: function (obj) { return "order" in obj; }, get: function (obj) { return obj.order; }, set: function (obj, value) { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.getALlReviewsDto = getALlReviewsDto;
var ReviewQueryDto = function () {
    var _a;
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _orderBy_decorators;
    var _orderBy_initializers = [];
    var _orderBy_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ReviewQueryDto() {
                this.sortBy = __runInitializers(this, _sortBy_initializers, void 0);
                this.orderBy = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _orderBy_initializers, void 0));
                __runInitializers(this, _orderBy_extraInitializers);
            }
            return ReviewQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sortBy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(enums_1.ReviewSortBy), (0, swagger_1.ApiPropertyOptional)({
                    enum: enums_1.ReviewSortBy,
                    example: enums_1.ReviewSortBy.RATING,
                })];
            _orderBy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(enums_1.OrderBy), (0, swagger_1.ApiPropertyOptional)({
                    enum: enums_1.OrderBy,
                    example: enums_1.OrderBy.DESC,
                })];
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _orderBy_decorators, { kind: "field", name: "orderBy", static: false, private: false, access: { has: function (obj) { return "orderBy" in obj; }, get: function (obj) { return obj.orderBy; }, set: function (obj, value) { obj.orderBy = value; } }, metadata: _metadata }, _orderBy_initializers, _orderBy_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ReviewQueryDto = ReviewQueryDto;
