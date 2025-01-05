"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    secret: process.env.JWT_SECRET || 'defaultSecret',
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
});
//# sourceMappingURL=jwt.config.js.map