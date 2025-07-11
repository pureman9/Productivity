// config.ts

// ใช้ `export` เพื่อให้ไฟล์อื่นสามารถนำค่าเหล่านี้ไปใช้ได้
export const JIRA_BASE_URL = 'https://depthcon1.atlassian.net';
export const JIRA_ACCOUNT_ID = '712020:ebc6b70a-d0ed-46cc-ad65-75eaf06de123';
export const ZEPHYR_ACCESS_KEY = 'MDNhM2U0OGQtMTVjMy0zNWVlLTg1OTctZDQ0MWFkYjYzMWQwIDcxMjAyMCUzQWViYzZiNzBhLWQwZWQtNDZjYy1hZDY1LTc1ZWFmMDZkZTEyMyBVU0VSX0RFRkFVTFRfTkFNRQ';
export const ZEPHYR_SECRET_KEY = 'HMuzgQH2Z2SVZ_0jbdSG0eogPpXCqOERwNy9XoM7Gto'; // 👈 จัดการข้อมูลลับของคุณที่ไฟล์นี้ที่เดียว

export const API_METHOD = 'GET';
export const API_URI = '/rest/zapi/latest/cycle';
export const queryParams = {
    projectId: '10085',
    versionId: '-1',
};