"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user_model"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authorization.split(" ")[1];
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = yield user_model_1.default.findOne({ _id: _id }).select("_id");
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request not authorized, token not valid" });
    }
});
exports.requireAuth = requireAuth;
