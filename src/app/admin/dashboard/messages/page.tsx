"use client";

import { useState } from "react";
import {
  Loader2,
  Mail,
  MailOpen,
  Trash2,
  Reply,
  Inbox,
  Search,
} from "lucide-react";
import {
  useGetMessagesQuery,
  useMarkReadMutation,
  useDeleteMessageMutation,
  Message,
} from "@/store/api/messagesApi";

export default function MessagesPage() {
  const { data: messages = [], isLoading, isError } = useGetMessagesQuery();
  const [markRead] = useMarkReadMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selected, setSelected] = useState<Message | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = messages.filter((m) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !m.read) ||
      (filter === "read" && m.read);
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleOpen = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      await markRead({ id: msg.id, read: true });
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    if (selected?.id === id) setSelected(null);
    await deleteMessage(id);
    setDeletingId(null);
  };

  const handleReply = (email: string, name: string) => {
    window.location.href = `mailto:${email}?subject=Re: Your message to Frances Ushedo Foundation&body=Dear ${name},%0D%0A%0D%0A`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-lilac" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load messages.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
              : "All messages read"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-lilac/20 shadow-sm flex flex-col">
          {/* Filters & Search */}
          <div className="p-4 border-b border-lilac/10 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-lilac"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "unread", "read"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                    filter === f
                      ? "bg-lilac text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                <Inbox className="w-10 h-10" />
                <p className="text-sm">No messages found</p>
              </div>
            ) : (
              filtered.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleOpen(msg)}
                  className={`w-full text-left p-4 hover:bg-lilac/5 transition-colors ${
                    selected?.id === msg.id ? "bg-lilac/10 border-l-2 border-lilac" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      {msg.read ? (
                        <MailOpen className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Mail className="w-4 h-4 text-lilac" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm truncate ${msg.read ? "text-gray-600" : "font-semibold text-gray-900"}`}>
                          {msg.name}
                        </p>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                      <p className="text-xs text-gray-400 truncate mt-1">{msg.message}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-lilac/20 shadow-sm flex flex-col">
          {selected ? (
            <>
              {/* Detail Header */}
              <div className="p-6 border-b border-lilac/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-sm text-lilac hover:underline"
                    >
                      {selected.email}
                    </a>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(selected.createdAt).toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(selected.createdAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => markRead({ id: selected.id, read: !selected.read })}
                      className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
                      title={selected.read ? "Mark as unread" : "Mark as read"}
                    >
                      {selected.read ? (
                        <><Mail className="w-3.5 h-3.5" /> Mark unread</>
                      ) : (
                        <><MailOpen className="w-3.5 h-3.5" /> Mark read</>
                      )}
                    </button>
                    <button
                      onClick={() => handleReply(selected.email, selected.name)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-lilac/10 text-darckLilac hover:bg-lilac/20 flex items-center gap-1.5 transition-colors"
                    >
                      <Reply className="w-3.5 h-3.5" /> Reply
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      disabled={deletingId === selected.id}
                      className="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {deletingId === selected.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </p>
                </div>
              </div>

              {/* Quick Reply Footer */}
              <div className="p-4 border-t border-lilac/10">
                <button
                  onClick={() => handleReply(selected.email, selected.name)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-lilac text-white rounded-xl hover:bg-darckLilac transition-colors text-sm font-medium"
                >
                  <Reply className="w-4 h-4" />
                  Reply via Email
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
              <Mail className="w-14 h-14 opacity-30" />
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}