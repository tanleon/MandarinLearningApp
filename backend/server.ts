import express from "express";
import cors from "cors";
import { pool } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

// Type for a vocab word
type Vocab = {
  id: number;
  word: string;
  pinyin: string;
  meaning: string;
};

// GET all vocab
app.get("/api/vocab", async (_req, res) => { // rename req → _req
  try {
    const [rows] = await pool.query("SELECT * FROM vocab");
    res.json(rows as Vocab[]); // annotate type
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET a random quiz word
app.get("/api/quiz", async (_req, res) => { // rename req → _req
  try {
    // Get max id
    const [[{ maxId }]]: any = await pool.query(
      "SELECT MAX(id) AS maxId FROM vocab"
    );

    // Pick random id
    const randomId = Math.floor(Math.random() * maxId) + 1;

    // Select nearest row
    const [rows]: any = await pool.query(
      "SELECT * FROM vocab WHERE id >= ? ORDER BY id LIMIT 1",
      [randomId]
    );

    res.json(rows[0] as Vocab); // annotate type
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST user progress
app.post("/api/progress", async (req, res) => {
  const { user_id, vocab_id, correct } = req.body;

  if (!user_id || !vocab_id || correct === undefined) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await pool.query(
      "INSERT INTO progress (user_id, vocab_id, correct) VALUES (?, ?, ?)",
      [user_id, vocab_id, correct]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
