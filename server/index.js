import "dotenv/config";
import Fastify from "fastify";
import { prisma } from "./lib/prisma.js";

const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || "0.0.0.0";

const app = Fastify({
  logger: true,
});

app.addHook("onRequest", async (request, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  reply.header("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    reply.code(204).send();
  }
});

function normalizeFormPayload(payload = {}) {
  return {
    name: payload.name?.trim() || "Untitled Form",
    description: payload.description?.trim() || "",
    fields: Array.isArray(payload.fields) ? payload.fields : [],
  };
}

function normalizeExpensePayload(payload = {}) {
  return {
    expenseType: payload.expenseType?.trim() || "",
    expenseDate: payload.expenseDate?.trim() || "",
    amount: String(payload.amount ?? ""),
    project: payload.project?.trim() || "",
    description: payload.description?.trim() || "",
    details: payload.details && typeof payload.details === "object" ? payload.details : {},
  };
}

app.get("/api/health", async () => ({
  status: "ok",
  service: "expense-backend",
  database: "postgresql",
  timestamp: new Date().toISOString(),
}));

app.get("/api/expenses", async (_request, reply) => {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  reply.send(expenses);
});

app.post("/api/expenses", async (request, reply) => {
  const nextExpense = normalizeExpensePayload(request.body);

  const createdExpense = await prisma.expense.create({
    data: nextExpense,
  });

  reply.code(201).send(createdExpense);
});

app.get("/api/forms", async (_request, reply) => {
  const forms = await prisma.form.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  reply.send(forms);
});

app.post("/api/forms", async (request, reply) => {
  const nextForm = normalizeFormPayload(request.body);

  const createdForm = await prisma.form.create({
    data: nextForm,
  });

  reply.code(201).send(createdForm);
});

app.put("/api/forms/:id", async (request, reply) => {
  const nextForm = normalizeFormPayload(request.body);

  try {
    const updatedForm = await prisma.form.update({
      where: {
        id: request.params.id,
      },
      data: nextForm,
    });

    reply.send(updatedForm);
  } catch (error) {
    if (error?.code === "P2025") {
      reply.code(404).send({ message: "Form not found" });
      return;
    }

    throw error;
  }
});

app.delete("/api/forms/:id", async (request, reply) => {
  try {
    await prisma.form.delete({
      where: {
        id: request.params.id,
      },
    });

    reply.send({ success: true });
  } catch (error) {
    if (error?.code === "P2025") {
      reply.code(404).send({ message: "Form not found" });
      return;
    }

    throw error;
  }
});

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.code(500).send({
    message: "Internal server error",
    error: error.message,
  });
});

async function start() {
  try {
    await app.listen({ port, host });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

const shutdown = async () => {
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
