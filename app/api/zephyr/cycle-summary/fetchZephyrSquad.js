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
var axios_1 = require("axios");
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
// ======================= CONFIGURATION =======================
// 1. กรอกข้อมูลของคุณที่นี่
var JIRA_BASE_URL = 'https://prod-play.zephyr4jiracloud.com/connect';
var JIRA_ACCOUNT_ID = '712020:ebc6b70a-d0ed-46cc-ad65-75eaf06de123';
var ZEPHYR_ACCESS_KEY = 'MDNhM2U0OGQtMTVjMy0zNWVlLTg1OTctZDQ0MWFkYjYzMWQwIDcxMjAyMCUzQWViYzZiNzBhLWQwZWQtNDZjYy1hZDY1LTc1ZWFmMDZkZTEyMyBVU0VSX0RFRkFVTFRfTkFNRQ';
var ZEPHYR_SECRET_KEY = '1CGVXnCLhlaiJ7UZxx5YaG9uoLaDoGojZvYxQcbntxg'; // <<< ❗ กรอก SECRET KEY ของคุณที่นี่
// 2. กำหนด Endpoint และ Parameters ที่ต้องการจะเรียกใช้
var API_METHOD = 'GET';
var API_URI = '/rest/zapi/latest/cycle'; // Endpoint สำหรับดึง Test Cycle
var queryParams = {
    projectId: '10085',
    versionId: '-1', // -1 หมายถึงทุกเวอร์ชัน
};
// =============================================================
function generateZephyrJwtToken(sortedQueryString) {
    if (ZEPHYR_SECRET_KEY.startsWith('YOUR_')) {
        console.error("!!! กรุณากรอก ZEPHYR_SECRET_KEY ในสคริปต์ก่อนรัน");
        return null;
    }
    var nowInSeconds = Math.floor(Date.now() / 1000);
    var tokenExpiration = nowInSeconds + 3600;
    var canonicalPath = "".concat(API_METHOD, "&").concat(API_URI, "&").concat(sortedQueryString);
    var qsh = crypto.createHash('sha256').update(canonicalPath).digest('hex');
    var payload = {
        sub: JIRA_ACCOUNT_ID,
        qsh: qsh,
        iss: ZEPHYR_ACCESS_KEY,
        iat: nowInSeconds,
        exp: tokenExpiration,
    };
    return jwt.sign(payload, ZEPHYR_SECRET_KEY, { algorithm: 'HS256' });
}
function fetchZephyrData() {
    return __awaiter(this, void 0, void 0, function () {
        var sortedKeys, sortedQueryString, generatedToken, fullUrl, response, error_1, axiosError;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("--- 1. \u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07 Token \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Endpoint: ".concat(API_URI, " ---"));
                    sortedKeys = Object.keys(queryParams).sort();
                    sortedQueryString = sortedKeys
                        .map(function (key) { return "".concat(key, "=").concat(queryParams[key]); })
                        .join('&');
                    generatedToken = generateZephyrJwtToken(sortedQueryString);
                    if (!generatedToken) {
                        return [2 /*return*/];
                    }
                    console.log("สร้าง JWT Token สำเร็จแล้ว");
                    console.log("\n--- 2. กำลังยิง API เพื่อดึงข้อมูล ---");
                    fullUrl = "".concat(JIRA_BASE_URL).concat(API_URI);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(fullUrl, {
                            params: queryParams,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "JWT ".concat(generatedToken),
                                'zapiAccessKey': ZEPHYR_ACCESS_KEY,
                            }
                        })];
                case 2:
                    response = _c.sent();
                    console.log("\u2705 \u0E22\u0E34\u0E07 API \u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08! Status: ".concat(response.status));
                    console.log("--- ข้อมูล Test Cycles ที่ได้รับ ---");
                    console.log(JSON.stringify(response.data, null, 2));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.error('❌ เกิดข้อผิดพลาดในการยิง API:');
                    if (axios_1.default.isAxiosError(error_1)) {
                        axiosError = error_1;
                        console.error("  - Status: ".concat((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status));
                        console.error("  - Data: ".concat(JSON.stringify((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data)));
                    }
                    else {
                        console.error(error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// สั่งให้ main function ทำงาน
fetchZephyrData();
