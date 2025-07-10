import axios, { AxiosError } from 'axios';

// ======================= CONFIGURATION =======================
const JIRA_BASE_URL = 'https://depthcon1.atlassian.net';  // <--- URL ของ Jira คุณ
const JIRA_EMAIL = 'manuchet@cardx.co.th'; // <--- Email ที่คุณใช้ล็อกอิน Jira
const JIRA_API_TOKEN = 'ATATT3xFfGF05yhS9BF-AZbO2-VNowglXf-pc-pR8_iEgMbuL67SsqzlD2gx_YHP6rkFOGaxRPeTnVcCWUDP_NbtHehRJqRVjHxe9Tz2Zcrvj4zs8OcQE67BV5wXRpp9a4f6uoOys2f9Cqz5pyvOdyoYGwwO2M3k44AEcSW_qwf7GWvK7phyb_I=0EF3DDB9';          // <--- Token ที่สร้างในขั้นตอนที่ 1

const JIRA_PROJECT_KEY = 'CXUAT'; // <--- Project Key ของคุณ
// =============================================================

/**
 * ฟังก์ชันสำหรับสร้าง Authorization Header แบบ Basic Auth
 * @param email 
 * @param token 
 * @returns Base64 encoded string
 */
function createAuthHeader(email: string, token: string): string {
    const buffer = Buffer.from(`${email}:${token}`);
    return `Basic ${buffer.toString('base64')}`;
}

// ... (ส่วน import และ config เหมือนเดิมทั้งหมด) ...

async function fetchAllTestsInProject() {
    console.log(`กำลังดึงข้อมูล Test Case จากโปรเจกต์: ${JIRA_PROJECT_KEY} โดยใช้ Jira API...`);

    const jqlQuery = `project = "${JIRA_PROJECT_KEY}" AND issuetype = Test ORDER BY created DESC`;
    const authHeader = createAuthHeader(JIRA_EMAIL, JIRA_API_TOKEN);

    try {
        const response = await axios.post(
            `${JIRA_BASE_URL}/rest/api/3/search`,
            {
                jql: jqlQuery,
                // --- จุดแก้ไขที่ 1: เพิ่ม 'assignee' และ 'reporter' เข้าไปใน fields ---
                fields: ["summary", "status", "assignee", "reporter"], // <<< เพิ่มที่นี่
                maxResults: 100,
            },
            {
                headers: {
                    'Authorization': authHeader,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        const issues = response.data.issues;
        console.log(`✅ ดึงข้อมูลสำเร็จ! พบ Test Case ทั้งหมด ${issues.length} รายการ.\n`);

        issues.forEach((issue: any, index: number) => {
            // --- จุดแก้ไขที่ 2: ดึงข้อมูลใหม่มาใส่ในตัวแปร ---
            const issueKey = issue.key;
            const summary = issue.fields.summary;
            const status = issue.fields.status.name;
            // ใช้ ?. และ ?? เพื่อป้องกัน error หากไม่มีข้อมูล assignee หรือ reporter
            const assignee = issue.fields.assignee?.displayName ?? 'Unassigned';
            const reporter = issue.fields.reporter?.displayName ?? 'N/A';

            // --- จุดแก้ไขที่ 3: เพิ่มข้อมูลใหม่ลงใน console.log ---
            console.log(
              `${index + 1}. Key: ${issueKey} | Status: ${status} | Assignee: ${assignee} | Reporter: ${reporter} | Summary: ${summary}`
            );
        });

    } catch (error) {
        // ... (ส่วน catch error เหมือนเดิม) ...
        // ผมเพิ่มการแสดงผล error ให้ละเอียดขึ้นเล็กน้อย
        console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล:');
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(`  - Status: ${axiosError.response?.status}`);
            console.error(`  - Data: ${JSON.stringify(axiosError.response?.data, null, 2)}`);
        } else {
            console.error(error);
        }
    }
}

// --- ส่วนสำหรับสั่งให้ฟังก์ชันทำงาน ---
console.log("Script is starting..."); // log เพื่อให้แน่ใจว่าไฟล์ถูกรัน
fetchAllTestsInProject();