# 🤖 Chatbot Function (Groq LLM)

This Appwrite **Node.js Function** provides a chatbot endpoint that forwards a user's message to Groq and returns the assistant's reply. The chatbot can call separate tools for each portfolio section so the model can fetch only the data it needs.

---

## 🚀 Features

* 💬 Forwards user message to Groq Chat Completions
* 🔁 Supports optional `history` array to continue conversations
* 🧰 Separate tools for navigation, hero, about, projects, experience, skills, credentials, and contact data
* 🔧 Configurable model, temperature, token limits, and reasoning via env vars

---

## 🧰 Usage

Trigger this function when your frontend sends a user message to the chatbot.

#### 📥 Request Body (JSON)

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "message": "Hello — I'd like to work with you on a project.",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! How can I help?" }
  ]
}
```

#### 📤 Success Response (200)

```json
{
  "success": true,
  "reply": "Hi John — thanks for reaching out! ..."
}
```

#### ❌ Error Response (400 / 500)

```json
{
  "success": false,
  "error": "Message field is missing"
}
```

---

## 🛠️ Tech Stack

* **Runtime:** Node.js 18
* **LLM:** Groq (via `groq-sdk` npm package)
* **Platform:** Appwrite Functions

---

## ⚙️ Configuration

| Setting       | Value          |
| ------------- | -------------- |
| Runtime       | Node.js (18.0) |
| Entrypoint    | `src/main.js`  |
| Build Command | `npm install`  |
| Permissions   | `any`          |
| Timeout       | adjust as needed for LLM latency |

---

## 🔒 Environment Variables

Configure these variables in **Appwrite → Functions → Settings → Variables**

```env
GROQ_API_KEY=gsk_...
# Optional tuning
GROQ_MODEL=openai/gpt-oss-120b
GROQ_TEMPERATURE=1
GROQ_TOP_P=1
GROQ_MAX_COMPLETION_TOKENS=8192
GROQ_REASONING_EFFORT=medium
GROQ_MAX_TOOL_ROUNDS=4
```

---

## 📂 Project Structure

```txt
chatbot/
├─ src/
│  ├─ main.js
│  └─ Data/
│     └─ Data.jsx
├─ package.json
└─ README.md
```

---

## 🧠 Future Enhancements

* Conversation persistence and logging
* Rate limiting and abuse protection
* More specialized section tools if the site grows

---

## ❤️ Built For

**Tushar Portfolio** — Chat assistant endpoint for the portfolio site
