import { google } from "googleapis";

const SPREADSHEET_ID = "1h12U2HPSTgJb7eOirtYD2LX-8-XT1gdzIrksLvEUIWI";

export async function getAdminEmails() {
    const SHEET_NAME = "AdminList";
    return await getEmails(SHEET_NAME);
}

export async function getEmailWhitelist() {
    const SHEET_NAME = "EmailWhitelist";
    return await getEmails(SHEET_NAME);
}

async function getEmails(sheetName: string) {
    try {
        const RANGE = `${sheetName}!A:A`;
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SHEETS_SECRET as string),
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const rows = res.data.values;
        if (!rows || rows.length === 0) return [];
        return rows.map((row) => row[0]);
    } catch (error) {
        console.error("Error fetching emails from Google Sheets:", error);
        return [];
    }
}
