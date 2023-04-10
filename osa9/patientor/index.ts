import express from "express";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use((_req, res) => res.status(404).end());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});