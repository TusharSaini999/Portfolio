# 🤖 Chatbot Function (LLM)

This Appwrite **Node.js Function** provides a simple chatbot endpoint that forwards a user's message to an LLM (OpenAI) and returns the assistant's reply.

---

## 🚀 Features

* 💬 Forwards user message to OpenAI Chat API
* 🔁 Supports optional `history` array to continue conversations
* 🔧 Configurable model, temperature, and max tokens via env vars

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
* **LLM:** OpenAI (via `openai` npm package)
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
OPENAI_API_KEY=sk-...
# Optional tuning
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=600
```

---

## 📂 Project Structure

```txt
chatbot/
├─ src/
│  └─ main.js
├─ package.json
└─ README.md
```

---

## 🧠 Future Enhancements

* Conversation persistence and logging
* Rate limiting and abuse protection
* Role-based prompts for different assistant personas

---

## ❤️ Built For

**Tushar Portfolio** — Chat assistant endpoint for the portfolio site
