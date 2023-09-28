"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./config/database"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
// MIDDLEWARES
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(process.cwd() + "/uploads"));
app.use(body_parser_1.default.json());
// CONNECT TO THE DATABASE
(0, database_1.default)();
// API ROUTES
app.use("/api", api_routes_1.default);
exports.default = app;
