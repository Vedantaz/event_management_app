"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelStatus = exports.BookingStatus = exports.OrderBy = exports.ReviewSortBy = exports.SortBy = exports.STATUS = exports.ROLES = void 0;
var ROLES;
(function (ROLES) {
    ROLES["USER"] = "USER";
    ROLES["ADMIN"] = "ADMIN";
})(ROLES || (exports.ROLES = ROLES = {}));
var STATUS;
(function (STATUS) {
    STATUS["ACTIVE"] = "ACTIVE";
    STATUS["INACTIVE"] = "INACTIVE";
})(STATUS || (exports.STATUS = STATUS = {}));
var SortBy;
(function (SortBy) {
    SortBy["POPULARITY"] = "popularity";
    SortBy["DATE"] = "date";
    SortBy["PRICE"] = "price";
    SortBy["RATING"] = "rating";
})(SortBy || (exports.SortBy = SortBy = {}));
var ReviewSortBy;
(function (ReviewSortBy) {
    ReviewSortBy["RATING"] = "rating";
})(ReviewSortBy || (exports.ReviewSortBy = ReviewSortBy = {}));
var OrderBy;
(function (OrderBy) {
    OrderBy["ASC"] = "asc";
    OrderBy["DESC"] = "desc";
})(OrderBy || (exports.OrderBy = OrderBy = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "PENDING";
    BookingStatus["CONFIRMED"] = "CONFIRMED";
    BookingStatus["CANCELLED"] = "CANCELLED";
    BookingStatus["COMPLETED"] = "COMPLETED";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var CancelStatus;
(function (CancelStatus) {
    CancelStatus["PROCESSING"] = "PROCESSING";
    CancelStatus["PENDING"] = "PENDING";
    CancelStatus["COMPLETED"] = "COMPLETED";
})(CancelStatus || (exports.CancelStatus = CancelStatus = {}));
