"use strict";
exports.__esModule = true;
exports.hasRoles = void 0;
var common_1 = require("@nestjs/common");
var hasRoles = function () {
    var hasRoles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        hasRoles[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)('roles', hasRoles);
};
exports.hasRoles = hasRoles;
