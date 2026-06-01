# 🤖 Chatbot Function (Groq LLM)

This Appwrite **Node.js Function** powers the portfolio chatbot. It sends the user's message to Groq, uses portfolio tools when needed, and returns the assistant reply. When the model prepares a contact draft, the function returns that draft so the frontend can prefill the contact form.

---

## 🚀 Features

* 💬 Forwards user messages to Groq Chat Completions
* 🔁 Supports optional `history` to keep the conversation context
* 🧰 Portfolio tools for navigation, hero, about, projects, experience, skills, credentials, and contact data
* 📝 Optional `contactDraft` response for contact-form prefill in the UI
* 🔧 Configurable model, temperature, token limits, and top-p via env vars

---

## 🧰 Usage

Send a user message and optional conversation history to this function.

#### 📥 Request Body (JSON)

```json
{
  "message": "I want to do a project with you",
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
  "reply": "Thanks for reaching out. The contact form has been prepared.",
  "contactDraft": {
    "draft": {
      "fullName": "Tushar Saini",
      "email": "tusharsaini.in@gmail.com",
      "message": "I want to do a project with you"
    },
    "missingFields": []
  }
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

## 🔌 Frontend Integration

The frontend listens for the `portfolio:contact-draft` event and fills the contact form automatically. The chatbot does **not** submit the form itself.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js 18
* **LLM:** Groq via `groq-sdk`
* **Platform:** Appwrite Functions

---

## ⚙️ Configuration

| Setting       | Value                      |
| ------------- | -------------------------- |
| Runtime       | Node.js (18.0)             |
| Entrypoint    | `src/main.js`              |
| Build Command | `npm install`              |
| Permissions   | `any`                      |
| Timeout       | adjust as needed for LLM latency |

---

## 🔒 Environment Variables

Configure these variables in **Appwrite → Functions → Settings → Variables**

```env
GROQ_API_KEY=gsk_...
# Optional tuning
GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
GROQ_TEMPERATURE=0.2
GROQ_TOP_P=0.8
GROQ_MAX_COMPLETION_TOKENS=1012
```

---

## 📂 Project Structure

```txt
chatbot/
├─ src/
│  ├─ main.js
│  └─ Data/
│     └─ Data.js
├─ package.json
└─ README.md
```

---

## 🧠 Notes

* Conversation history is limited to the latest five user/assistant messages.
* Contact drafts are returned for prefill only; the frontend handles form submission.
* If the model cannot collect all contact details, it should ask a short follow-up question.

---

## ❤️ Built For

**Tushar Portfolio** — chatbot endpoint for the portfolio site
