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
// ======================= CONFIGURATION =======================
var JIRA_BASE_URL = 'https://depthcon1.atlassian.net'; // <--- URL ของ Jira คุณ
var JIRA_EMAIL = 'manuchet@cardx.co.th'; // <--- Email ที่คุณใช้ล็อกอิน Jira
var JIRA_API_TOKEN = 'ATATT3xFfGF05yhS9BF-AZbO2-VNowglXf-pc-pR8_iEgMbuL67SsqzlD2gx_YHP6rkFOGaxRPeTnVcCWUDP_NbtHehRJqRVjHxe9Tz2Zcrvj4zs8OcQE67BV5wXRpp9a4f6uoOys2f9Cqz5pyvOdyoYGwwO2M3k44AEcSW_qwf7GWvK7phyb_I=0EF3DDB9'; // <--- Token ที่สร้างในขั้นตอนที่ 1
var JIRA_PROJECT_KEY = 'CXUAT'; // <--- Project Key ของคุณ
// =============================================================
/**
 * ฟังก์ชันสำหรับสร้าง Authorization Header แบบ Basic Auth
 * @param email
 * @param token
 * @returns Base64 encoded string
 */
function createAuthHeader(email, token) {
    var buffer = Buffer.from("".concat(email, ":").concat(token));
    return "Basic ".concat(buffer.toString('base64'));
}
// ... (ส่วน import และ config เหมือนเดิมทั้งหมด) ...
function fetchAllTestsInProject() {
    return __awaiter(this, void 0, void 0, function () {
        var jqlQuery, authHeader, response, issues, error_1, axiosError;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Test Case \u0E08\u0E32\u0E01\u0E42\u0E1B\u0E23\u0E40\u0E08\u0E01\u0E15\u0E4C: ".concat(JIRA_PROJECT_KEY, " \u0E42\u0E14\u0E22\u0E43\u0E0A\u0E49 Jira API..."));
                    jqlQuery = "project = \"".concat(JIRA_PROJECT_KEY, "\" AND issuetype = Test ORDER BY created DESC");
                    authHeader = createAuthHeader(JIRA_EMAIL, JIRA_API_TOKEN);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("".concat(JIRA_BASE_URL, "/rest/api/3/search"), {
                            jql: jqlQuery,
                            // --- จุดแก้ไขที่ 1: เพิ่ม 'assignee' และ 'reporter' เข้าไปใน fields ---
                            fields: ["summary", "status", "assignee", "reporter"], // <<< เพิ่มที่นี่
                            maxResults: 100,
                        }, {
                            headers: {
                                'Authorization': authHeader,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })];
                case 2:
                    response = _c.sent();
                    issues = response.data.issues;
                    console.log("\u2705 \u0E14\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08! \u0E1E\u0E1A Test Case \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ".concat(issues.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23.\n"));
                    issues.forEach(function (issue, index) {
                        var _a, _b, _c, _d;
                        // --- จุดแก้ไขที่ 2: ดึงข้อมูลใหม่มาใส่ในตัวแปร ---
                        var issueKey = issue.key;
                        var summary = issue.fields.summary;
                        var status = issue.fields.status.name;
                        // ใช้ ?. และ ?? เพื่อป้องกัน error หากไม่มีข้อมูล assignee หรือ reporter
                        var assignee = (_b = (_a = issue.fields.assignee) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : 'Unassigned';
                        var reporter = (_d = (_c = issue.fields.reporter) === null || _c === void 0 ? void 0 : _c.displayName) !== null && _d !== void 0 ? _d : 'N/A';
                        // --- จุดแก้ไขที่ 3: เพิ่มข้อมูลใหม่ลงใน console.log ---
                        console.log("".concat(index + 1, ". Key: ").concat(issueKey, " | Status: ").concat(status, " | Assignee: ").concat(assignee, " | Reporter: ").concat(reporter, " | Summary: ").concat(summary));
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    // ... (ส่วน catch error เหมือนเดิม) ...
                    // ผมเพิ่มการแสดงผล error ให้ละเอียดขึ้นเล็กน้อย
                    console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล:');
                    if (axios_1.default.isAxiosError(error_1)) {
                        axiosError = error_1;
                        console.error("  - Status: ".concat((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status));
                        console.error("  - Data: ".concat(JSON.stringify((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data, null, 2)));
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
// --- ส่วนสำหรับสั่งให้ฟังก์ชันทำงาน ---
console.log("Script is starting..."); // log เพื่อให้แน่ใจว่าไฟล์ถูกรัน
fetchAllTestsInProject();
