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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app.module");
var path_1 = require("path");
var fs_1 = require("fs");
var common_1 = require("@nestjs/common");
var exception_filters_1 = require("./common/filters/exception-filters");
var transformer_interceptor_1 = require("./common/interceptors/transformer.interceptor");
var cookieParser = require("cookie-parser");
var swagger_1 = require("./swagger");
var logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
var auth_constants_1 = require("./common/constants/auth.constants");
var config_1 = require("@nestjs/config");
var logger = new common_1.Logger("Main");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, configService, uploadDir, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _e.sent();
                    configService = app.get(config_1.ConfigService);
                    app.useGlobalFilters(new exception_filters_1.HttpExceptionFilter());
                    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
                    app.useGlobalInterceptors(new transformer_interceptor_1.TransformInterceptor());
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        transform: true,
                        whitelist: true,
                    }));
                    app.enableCors({
                        origin: auth_constants_1.auth.CORS_LINK,
                        credentials: true,
                        allowedHeaders: ["Content-Type", "Authorization"],
                    });
                    app.use(cookieParser());
                    (0, swagger_1.setupSwagger)(app);
                    uploadDir = (0, path_1.join)(process.cwd(), "uploads");
                    if (!(0, fs_1.existsSync)(uploadDir)) {
                        (0, fs_1.mkdirSync)(uploadDir);
                    }
                    return [4 /*yield*/, app.listen(configService.get("HTTP_PORT") || 3000)];
                case 2:
                    _e.sent();
                    _b = (_a = logger).log;
                    _d = (_c = "".concat(auth_constants_1.auth.SERVER_RUNNING_ON_URL)).concat;
                    return [4 /*yield*/, app.getUrl()];
                case 3:
                    _b.apply(_a, [_d.apply(_c, [_e.sent(), "/api"])]);
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
