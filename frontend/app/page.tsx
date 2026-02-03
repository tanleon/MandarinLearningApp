"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

// Type for a vocab word
type Vocab = {
  id: number;
  word: string;
  pinyin: string;
  meaning: string;
};

export default function Home() {
  const [quiz, setQuiz] = useState<Vocab | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [answered, setAnswered] = useState(false);

  // Load a new quiz word
  const loadWord = async () => {
    try {
      const res = await axios.get<Vocab>("http://localhost:5000/api/quiz");
      setQuiz(res.data);
      setAnswer("");
      setFeedback(null);
      setAnswered(false);
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error loading word");
    }
  };

  // Auto-load first question
  useEffect(() => {
    loadWord();
  }, []);

  const checkAnswer = async () => {
    if (!quiz || answered) return;

    const isCorrect = answer.trim().toLowerCase() === quiz.meaning.toLowerCase();
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Wrong! Correct: ${quiz.meaning}`);
    setAttempts((prev) => prev + 1);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setAnswered(true);

    try {
      await axios.post("http://localhost:5000/api/progress", {
        user_id: 1,
        vocab_id: quiz.id,
        correct: isCorrect,
      });
    } catch (err) {
      console.error("Error saving progress");
    }
  };

  return (
    <main className={styles.container}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Learn Mandarin Vocab</h1>

      <div className={styles.card}>
        {quiz && (
          <>
            <div className={styles.word}>{quiz.word}</div>
            <div className={styles.pinyin}>{quiz.pinyin}</div>

            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter English meaning"
              className={styles.input}
              disabled={answered} // disable input after checking
            />

            {!answered && (
              <button onClick={checkAnswer} className={styles.button}>
                Check Answer
              </button>
            )}

            {answered && (
              <button onClick={loadWord} className={styles.button}>
                Next Question
              </button>
            )}

            {feedback && <div className={styles.feedback}>{feedback}</div>}
          </>
        )}

        {attempts > 0 && (
          <div className={styles.progress}>
            Progress: {correctCount}/{attempts} correct
          </div>
        )}
      </div>
    </main>
  );
}
