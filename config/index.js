import dotenv from "dotenv";
import fs from "fs";

// .envの読み込み
dotenv.config();

export const {
    APP_ID,
    WEBHOOK_SECRET,
} = process.env;

const {
    PRIVATE_KEY_PATH: privateKeyPath,
} = process.env;

export const PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf8");

// オフィスナビ開発プロジェクトのID
export const DEV_PROJECT_ID = "PVT_kwDODKLWTc4A5K87";