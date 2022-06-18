"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserIsAuthorGuard = void 0;
var common_1 = require("@nestjs/common");
var user_service_1 = require("../../user/services/user.service");
var comment_service_1 = require("../services/comment.service");
var operators_1 = require("rxjs/operators");
var UserIsAuthorGuard = /** @class */ (function () {
    function UserIsAuthorGuard(userService, commentService) {
        this.userService = userService;
        this.commentService = commentService;
    }
    UserIsAuthorGuard.prototype.canActivate = function (context) {
        var _this = this;
        var request = context.switchToHttp().getRequest();
        var params = request.params;
        var commentId = Number(params.id);
        var user = request.user.user;
        return this.userService.findUser(user.id).pipe((0, operators_1.switchMap)(function (user) { return _this.commentService.findById(commentId).pipe((0, operators_1.map)(function (comment) {
            var hasPermission = false;
            if (user.id === comment.user.id) {
                hasPermission = true;
            }
            return user && hasPermission;
        })); }));
    };
    UserIsAuthorGuard = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return user_service_1.UserService; }))),
        __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return comment_service_1.CommentService; })))
    ], UserIsAuthorGuard);
    return UserIsAuthorGuard;
}());
exports.UserIsAuthorGuard = UserIsAuthorGuard;
