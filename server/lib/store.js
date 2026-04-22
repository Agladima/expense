import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.resolve("server", "data");
const dbPath = path.join(dataDir, "db.json");

const defaultDb = {
  expenses: [],
  forms: [],
};

async function ensureDb() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dbPath, "utf8");
  } catch {
    await writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
  }
}

export async function readDb() {
  await ensureDb();
  const raw = await readFile(dbPath, "utf8");
  return JSON.parse(raw);
}

export async function writeDb(nextDb) {
  await ensureDb();
  await writeFile(dbPath, JSON.stringify(nextDb, null, 2));
}

export function createId(prefix = "item") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
