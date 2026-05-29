import { useEffect, useMemo, useRef, useState } from "react";
import { Client, Functions, ExecutionMethod } from "appwrite";
import { Bot, ChevronDown, CornerDownLeft, MessageCircle, Send, Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import env from "../Config/env.js";
import { DatabaseService } from "../Appwrite/Databases.Appwrite.js";

const initialMessages = [
  {
    role: "assistant",
    content: "Hi, I can answer questions about this portfolio. Ask me about skills, projects, experience, or contact details.",
  },
];

function buildHistory(messages) {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .slice(-5)
    .map((message) => ({ role: message.role, content: message.content }));
}

function parseExecutionResponse(execution) {
  const rawBody = execution?.responseBody ?? execution?.response ?? execution?.result ?? "";

  if (!rawBody) {
    return null;
  }

  if (typeof rawBody === "object") {
    return rawBody;
  }

  if (typeof rawBody === "string") {
    try {
      return JSON.parse(rawBody);
    } catch {
      return { success: true, reply: rawBody };
    }
  }

  return null;
}

function getFriendlyErrorMessage() {
  return "Something went wrong. Please try again.";
}

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  const appwriteClient = useMemo(() => {
    if (!env.APPWRITE_URL || !env.APPWRITE_PROJECT_ID) {
      return null;
    }

    return new Client()
      .setEndpoint(env.APPWRITE_URL)
      .setProject(env.APPWRITE_PROJECT_ID);
  }, []);

  const appwriteFunctions = useMemo(() => {
    if (!appwriteClient) {
      return null;
    }

    return new Functions(appwriteClient);
  }, [appwriteClient]);

  const databaseService = useMemo(() => {
    try {
      return new DatabaseService();
    } catch {
      return null;
    }
  }, []);

  const canSend = useMemo(() => {
    return Boolean(env.CHATBOT_FUNCTION_ID && appwriteFunctions) && input.trim().length > 0 && !isLoading;
  }, [appwriteFunctions, input, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen]);

  const sendMessage = async (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || !env.CHATBOT_FUNCTION_ID || !appwriteFunctions || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: trimmedInput }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const execution = await appwriteFunctions.createExecution({
        functionId: env.CHATBOT_FUNCTION_ID,
        body: JSON.stringify({
          message: trimmedInput,
          history: buildHistory(messages),
        }),
        async: false,
        method: ExecutionMethod.POST,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responsePayload = parseExecutionResponse(execution);

      if (!responsePayload) {
        throw new Error(getFriendlyErrorMessage());
      }

      if (!responsePayload?.success) {
        throw new Error(getFriendlyErrorMessage());
      }

      // Prefill UI with draft if present
      if (responsePayload.contactDraft?.draft) {
        window.dispatchEvent(
          new CustomEvent("portfolio:contact-draft", {
            detail: responsePayload.contactDraft,
          }),
        );
      }

      setMessages((current) => [...current, { role: "assistant", content: responsePayload.reply }]);

      // Auto-submit the contact draft to Appwrite when provided by the LLM
      if (responsePayload.contactDraft?.draft && databaseService) {
        const { fullName, email, message } = responsePayload.contactDraft.draft;
        try {
          const sendResp = await databaseService.connect({ fullName, email, message });

          if (sendResp?.status) {
            setMessages((current) => [
              ...current,
              { role: "assistant", content: "I've submitted your message — thanks! I'll follow up soon." },
            ]);
          } else {
            setMessages((current) => [
              ...current,
              { role: "assistant", content: "I tried to send your message but there was an error." },
            ]);
          }
        } catch (err) {
          setMessages((current) => [
            ...current,
            { role: "assistant", content: "I couldn't send your message due to a technical error." },
          ]);
        }
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: getFriendlyErrorMessage(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="fixed right-4 bottom-6 sm:right-6 sm:bottom-8 z-9999 pointer-events-none">
      <div className="relative flex flex-col items-end gap-3 pointer-events-auto">
        {isOpen ? (
          <div className="flex h-144 max-h-[calc(100vh-8rem)] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Portfolio Chat</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">Ask about the site or my work</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-hide">
              {!env.CHATBOT_FUNCTION_ID ? (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Chat is not connected yet.
                  </div>
                </div>
              ) : null}

              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed wrap-break-word shadow-sm ${message.role === "user"
                        ? "bg-linear-to-br from-slate-900 to-slate-700 text-white dark:from-purple-600 dark:to-blue-500"
                        : message.isError
                          ? "border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                          : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      }`}
                  >
                    {message.role === "assistant" && !message.isError ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="m-0 leading-relaxed wrap-break-word">{children}</p>,
                          ul: ({ children }) => <ul className="m-0 list-disc space-y-1 pl-5 wrap-break-word">{children}</ul>,
                          ol: ({ children }) => <ol className="m-0 list-decimal space-y-1 pl-5 wrap-break-word">{children}</ol>,
                          li: ({ children }) => <li className="leading-relaxed wrap-break-word">{children}</li>,
                          a: ({ children, href }) => (
                            <a href={href} target="_blank" rel="noreferrer" className="break-all underline underline-offset-4">
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[0.85em] text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                              {children}
                            </code>
                          ),
                          strong: ({ children }) => <strong className="font-bold text-inherit">{children}</strong>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      <span>{message.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    <Sparkles className="h-4 w-4 animate-pulse text-purple-600" />
                    Thinking...
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="border-t border-slate-200 dark:border-slate-800 p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something..."
                  className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-purple-600"
                  aria-label="Send message"
                >
                  {isLoading ? <CornerDownLeft className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-blue-500 text-white shadow-[0_18px_50px_rgba(99,102,241,0.35)] transition hover:scale-105"
            aria-label="Open chatbot"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        ) : null}
      </div>
    </div>
  );
}