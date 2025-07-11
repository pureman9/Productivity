import axios, { AxiosError } from 'axios';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

// <<<--- จุดแก้ไข: ลบ Configuration เดิมออก แล้ว import มาแทน ---<<<
import {
    JIRA_BASE_URL,
    JIRA_ACCOUNT_ID,
    ZEPHYR_ACCESS_KEY,
    ZEPHYR_SECRET_KEY,
    API_METHOD,
    API_URI,
    queryParams
} from './config';
// =============================================================

function generateZephyrJwtToken(sortedQueryString: string): string | null {
    if (ZEPHYR_SECRET_KEY.startsWith('YOUR_')) {
        console.error("!!! กรุณากรอก ZEPHYR_SECRET_KEY ในสคริปต์ก่อนรัน");
        return null;
    }
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const tokenExpiration = nowInSeconds + 3600;

    const canonicalPath = `${API_METHOD}&${API_URI}&${sortedQueryString}`;
    const qsh = crypto.createHash('sha256').update(canonicalPath).digest('hex');

    const payload = {
        sub: JIRA_ACCOUNT_ID,
        qsh: qsh,
        iss: ZEPHYR_ACCESS_KEY,
        iat: nowInSeconds,
        exp: tokenExpiration,
    };
    return jwt.sign(payload, ZEPHYR_SECRET_KEY, { algorithm: 'HS256' });
}

async function fetchZephyrData() {
    console.log(`--- 1. กำลังสร้าง Token สำหรับ Endpoint: ${API_URI} ---`);
    
    const sortedKeys = Object.keys(queryParams).sort();
    const sortedQueryString = sortedKeys
        .map(key => `${key}=${queryParams[key as keyof typeof queryParams]}`)
        .join('&');

    const generatedToken = generateZephyrJwtToken(sortedQueryString);

    if (!generatedToken) {
        return;
    }
    console.log("สร้าง JWT Token สำเร็จแล้ว");

    console.log("\n--- 2. กำลังยิง API เพื่อดึงข้อมูล ---");
    const fullUrl = `${JIRA_BASE_URL}${API_URI}`;

    try {
        const response = await axios.get(fullUrl, {
            params: queryParams,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${generatedToken}`,
                'zapiAccessKey': ZEPHYR_ACCESS_KEY,
            }
        });
        console.log(`✅ ยิง API สำเร็จ! Status: ${response.status}`);
        console.log("--- ข้อมูล Test Cycles ที่ได้รับ ---");
        console.log(JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาดในการยิง API:');
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(`  - Status: ${axiosError.response?.status}`);
            console.error(`  - Data: ${JSON.stringify(axiosError.response?.data)}`);
        } else {
            console.error(error);
        }
    }
}

// สั่งให้ main function ทำงาน
fetchZephyrData();