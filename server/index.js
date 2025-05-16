const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// DB 연결
const db = new sqlite3.Database('./db/db.sqlite3');

// 사용자 테이블 생성
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

// 1️⃣ 회원가입
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log(JSON.stringify({ error: '이메일과 비밀번호를 입력해주세요.' }));
    return res.status(400).json({ error: '이메일과 비밀번호를 입력해주세요.' });
  }

  const hashed = await bcrypt.hash(password, 10);

  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  stmt.run(email, hashed, function (err) {
    if (err) return res.status(400).json({ error: '이미 등록된 이메일입니다.' });
    res.json({ id: this.lastID, email });
  });
});

// 2️⃣ 로그인
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err || !row) return res.status(400).json({ error: '계정을 찾을 수 없습니다.' });

    const isValid = await bcrypt.compare(password, row.password);
    if (!isValid) return res.status(401).json({ error: '비밀번호가 올바르지 않습니다.' });

    res.json({ message: '로그인 성공', email: row.email });
  });
});

// 3️⃣ 비밀번호 변경
app.post('/api/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err || !row) return res.status(404).json({ error: '계정을 찾을 수 없습니다.' });

    const isValid = await bcrypt.compare(oldPassword, row.password);
    if (!isValid) return res.status(401).json({ error: '기존 비밀번호가 일치하지 않습니다.' });

    const hashed = await bcrypt.hash(newPassword, 10);
    db.run('UPDATE users SET password = ? WHERE email = ?', [hashed, email], (err) => {
      if (err) return res.status(500).json({ error: '비밀번호 변경 실패' });
      res.json({ message: '비밀번호 변경 성공' });
    });
  });
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
