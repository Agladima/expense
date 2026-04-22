import http from "node:http";
import { readJsonBody, sendJson } from "./lib/http.js";
import { createId, readDb, writeDb } from "./lib/store.js";

const port = Number(process.env.PORT || 4000);

function notFound(response) {
  sendJson(response, 404, { message: "Route not found" });
}

function getPathname(requestUrl = "/") {
  return new URL(requestUrl, "http://localhost").pathname;
}

async function handleHealth(_request, response) {
  sendJson(response, 200, {
    status: "ok",
    service: "expense-backend",
    timestamp: new Date().toISOString(),
  });
}

async function handleGetExpenses(_request, response) {
  const db = await readDb();
  sendJson(response, 200, db.expenses);
}

async function handleCreateExpense(request, response) {
  const payload = await readJsonBody(request);

  const nextExpense = {
    id: createId("expense"),
    expenseType: payload.expenseType || "",
    expenseDate: payload.expenseDate || "",
    amount: payload.amount || "",
    project: payload.project || "",
    description: payload.description || "",
    details: payload.details || {},
    createdAt: new Date().toISOString(),
  };

  const db = await readDb();
  db.expenses.unshift(nextExpense);
  await writeDb(db);

  sendJson(response, 201, nextExpense);
}

async function handleGetForms(_request, response) {
  const db = await readDb();
  sendJson(response, 200, db.forms);
}

async function handleCreateForm(request, response) {
  const payload = await readJsonBody(request);

  const nextForm = {
    id: createId("form"),
    name: payload.name || "Untitled Form",
    description: payload.description || "",
    fields: Array.isArray(payload.fields) ? payload.fields : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const db = await readDb();
  db.forms.unshift(nextForm);
  await writeDb(db);

  sendJson(response, 201, nextForm);
}

async function handleUpdateForm(request, response, formId) {
  const payload = await readJsonBody(request);
  const db = await readDb();
  const formIndex = db.forms.findIndex((form) => form.id === formId);

  if (formIndex === -1) {
    sendJson(response, 404, { message: "Form not found" });
    return;
  }

  const existing = db.forms[formIndex];
  const updatedForm = {
    ...existing,
    name: payload.name ?? existing.name,
    description: payload.description ?? existing.description,
    fields: Array.isArray(payload.fields) ? payload.fields : existing.fields,
    updatedAt: new Date().toISOString(),
  };

  db.forms[formIndex] = updatedForm;
  await writeDb(db);

  sendJson(response, 200, updatedForm);
}

async function handleDeleteForm(_request, response, formId) {
  const db = await readDb();
  const nextForms = db.forms.filter((form) => form.id !== formId);

  if (nextForms.length === db.forms.length) {
    sendJson(response, 404, { message: "Form not found" });
    return;
  }

  db.forms = nextForms;
  await writeDb(db);

  sendJson(response, 200, { success: true });
}

const server = http.createServer(async (request, response) => {
  try {
    const pathname = getPathname(request.url);

    if (request.method === "OPTIONS") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "GET" && pathname === "/api/health") {
      await handleHealth(request, response);
      return;
    }

    if (request.method === "GET" && pathname === "/api/expenses") {
      await handleGetExpenses(request, response);
      return;
    }

    if (request.method === "POST" && pathname === "/api/expenses") {
      await handleCreateExpense(request, response);
      return;
    }

    if (request.method === "GET" && pathname === "/api/forms") {
      await handleGetForms(request, response);
      return;
    }

    if (request.method === "POST" && pathname === "/api/forms") {
      await handleCreateForm(request, response);
      return;
    }

    if (pathname.startsWith("/api/forms/")) {
      const formId = pathname.replace("/api/forms/", "");

      if (request.method === "PUT") {
        await handleUpdateForm(request, response, formId);
        return;
      }

      if (request.method === "DELETE") {
        await handleDeleteForm(request, response, formId);
        return;
      }
    }

    notFound(response);
  } catch (error) {
    sendJson(response, 500, {
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
