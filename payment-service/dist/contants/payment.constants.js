"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFIED_ORDER_EVENT = exports.CREATED_ORDER_EVENT = exports.TOKEN = exports.PAYMENT_STATE = void 0;
var PAYMENT_STATE;
(function (PAYMENT_STATE) {
    PAYMENT_STATE[PAYMENT_STATE["DECLINED"] = 0] = "DECLINED";
    PAYMENT_STATE[PAYMENT_STATE["CONFIRMED"] = 1] = "CONFIRMED";
})(PAYMENT_STATE = exports.PAYMENT_STATE || (exports.PAYMENT_STATE = {}));
exports.TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
exports.CREATED_ORDER_EVENT = 'created-order-event';
exports.VERIFIED_ORDER_EVENT = 'verified-order-event';
//# sourceMappingURL=payment.constants.js.map