"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (req, res, next) => {
    if (req.decode.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({
            message: 'You are anonymous'
        });
    }
};
exports.checkRole = checkRole;
//# sourceMappingURL=checkRole.js.map