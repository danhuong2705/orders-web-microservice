"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return {
        port: parseInt(process.env.PAYMENT_SERVICE_PORT) || 9001,
        host: process.env.PAYMENT_SERVICE_HOST || '0.0.0.0',
    };
};
//# sourceMappingURL=configuration.js.map