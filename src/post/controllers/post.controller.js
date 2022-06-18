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
exports.PostController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../../auth/guards/jwt.auth.guard");
var user_author_1 = require("../guards/user.author");
var PostController = /** @class */ (function () {
    function PostController(PostService) {
        this.PostService = PostService;
    }
    PostController.prototype.createPost = function (post, req) {
        var user = req.user.user;
        return this.PostService.createPost(user, post);
    };
    PostController.prototype.findAllposts = function () {
        return this.PostService.findAllPosts();
    };
    PostController.prototype.findPost = function (id) {
        return this.PostService.findById(id);
    };
    PostController.prototype.findBlogEntries = function (id) {
        return this.PostService.findByUser(id);
    };
    PostController.prototype.updatePost = function (id, post) {
        return this.PostService.updatePost(id, post);
    };
    PostController.prototype.deletePost = function (id) {
        return this.PostService.deletePost(id);
    };
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Request)())
    ], PostController.prototype, "createPost");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)()
    ], PostController.prototype, "findAllposts");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], PostController.prototype, "findPost");
    __decorate([
        (0, common_1.Get)('find-by-user/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], PostController.prototype, "findBlogEntries");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_author_1.UserIsAuthorGuard),
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], PostController.prototype, "updatePost");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_author_1.UserIsAuthorGuard),
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], PostController.prototype, "deletePost");
    PostController = __decorate([
        (0, common_1.Controller)('post')
    ], PostController);
    return PostController;
}());
exports.PostController = PostController;
