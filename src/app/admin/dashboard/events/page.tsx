"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  X,
  Loader2,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Upload,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExt from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  Event,
  Speaker,
  AgendaItem,
} from "@/store/api/eventsApi";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt12(timeStr: string) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

function buildTimeString(startTime: string, endTime: string) {
  if (!startTime && !endTime) return "";
  if (!endTime) return fmt12(startTime);
  return `${fmt12(startTime)} \u2013 ${fmt12(endTime)}`;
}

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function buildDateString(
  startDate: string,
  isMultiDay: boolean,
  endDate: string,
) {
  if (!startDate) return "";
  if (!isMultiDay || !endDate) return formatDisplayDate(startDate);
  return `${formatDisplayDate(startDate)} \u2013 ${formatDisplayDate(endDate)}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  title: string;
  category: string;
  startDate: string;
  startTime: string;
  endTime: string;
  isMultiDay: boolean;
  endDate: string;
  location: string;
  featured: boolean;
  image: string;
  description: string;
  longDescription: string;
  registrationLink: string;
  speakers: Speaker[];
  agenda: AgendaItem[];
  goals: string[];
}

const EMPTY_FORM: FormData = {
  title: "",
  category: "",
  startDate: new Date().toISOString().split("T")[0],
  startTime: "",
  endTime: "",
  isMultiDay: false,
  endDate: "",
  location: "",
  featured: false,
  image: "",
  description: "",
  longDescription: "",
  registrationLink: "/donate",
  speakers: [],
  agenda: [],
  goals: [],
};

const CATEGORIES = [
  "Fundraising",
  "Volunteering",
  "Workshop",
  "Outreach",
  "Health",
  "Education",
  "Community",
];

// ─── Rich-text editor ─────────────────────────────────────────────────────────

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      UnderlineExt,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] px-4 py-3 text-sm text-gray-800 focus:outline-none leading-relaxed prose max-w-none",
      },
    },
  });

  if (!editor) return null;

  const TB = ({
    active,
    onClick,
    title,
    children,
  }: {
    active?: boolean;
    onClick: () => void;
    title?: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-1.5 rounded transition-colors ${active ? "bg-darckLilac text-white" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-lilac/40">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-100">
        <TB
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-3.5 h-3.5" />
        </TB>
        <TB
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-3.5 h-3.5" />
        </TB>
        <TB
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </TB>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <TB
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="w-3.5 h-3.5" />
        </TB>
        <TB
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="w-3.5 h-3.5" />
        </TB>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <TB
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-3.5 h-3.5" />
        </TB>
        <TB
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </TB>
        <TB
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="w-3.5 h-3.5" />
        </TB>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <TB
          title="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </TB>
        <TB
          title="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </TB>
        <TB
          title="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="w-3.5 h-3.5" />
        </TB>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

// ─── Image upload zone ────────────────────────────────────────────────────────

function ImageUploadZone({
  value,
  onChange,
  onRemove,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return value ? (
    <div className="relative group h-40 w-full rounded-xl overflow-hidden bg-gray-100">
      <Image src={value} alt="Event" fill className="object-cover" />
      <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <Upload className="w-5 h-5 text-white" />
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  ) : (
    <label className="flex flex-col items-center justify-center gap-2 h-40 w-full border-2 border-dashed border-lilac/30 bg-lilac/5 hover:bg-lilac/10 hover:border-lilac/50 transition-colors rounded-xl cursor-pointer">
      <div className="p-2 bg-lilac/10 rounded-lg">
        <ImageIcon className="w-5 h-5 text-darckLilac" />
      </div>
      <p className="text-sm font-medium text-gray-600">Click to upload image</p>
      <p className="text-xs text-gray-400">PNG, JPG, WEBP</p>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

// ─── Speaker avatar upload ────────────────────────────────────────────────────

function SpeakerAvatarUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <label className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-lilac/30 hover:border-lilac/60 cursor-pointer flex items-center justify-center shrink-0 group">
      {value ? (
        <>
          <Image src={value} alt="Speaker" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
            <Upload className="w-3.5 h-3.5 text-white" />
          </div>
        </>
      ) : (
        <Upload className="w-4 h-4 text-lilac/50 group-hover:text-darckLilac transition-colors" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </label>
  );
}

// ─── Event form ───────────────────────────────────────────────────────────────

function EventForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial: FormData;
  onSave: (data: FormData) => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<FormData>(initial);
  const [newSpeaker, setNewSpeaker] = useState<Speaker>({
    name: "",
    title: "",
    image: "",
  });
  const [newAgenda, setNewAgenda] = useState<AgendaItem>({
    time: "",
    activity: "",
  });
  const [newGoal, setNewGoal] = useState("");

  const set = (patch: Partial<FormData>) =>
    setForm((f) => ({ ...f, ...patch }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => set({ image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleLongDesc = useCallback((html: string) => {
    setForm((f) => ({ ...f, longDescription: html }));
  }, []);

  const addSpeaker = () => {
    if (newSpeaker.name.trim() && newSpeaker.title.trim()) {
      set({ speakers: [...form.speakers, newSpeaker] });
      setNewSpeaker({ name: "", title: "", image: "" });
    }
  };
  const addAgenda = () => {
    if (newAgenda.time.trim() && newAgenda.activity.trim()) {
      set({ agenda: [...form.agenda, newAgenda] });
      setNewAgenda({ time: "", activity: "" });
    }
  };
  const addGoal = () => {
    if (newGoal.trim()) {
      set({ goals: [...form.goals, newGoal.trim()] });
      setNewGoal("");
    }
  };

  const datePreview = buildDateString(
    form.startDate,
    form.isMultiDay,
    form.endDate,
  );
  const timePreview = buildTimeString(form.startTime, form.endTime);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onCancel} />
      <div className="w-full max-w-2xl bg-white h-full overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {initial.title ? "Edit Event" : "Create Event"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image
            </label>
            <ImageUploadZone
              value={form.image}
              onChange={handleImageUpload}
              onRemove={() => set({ image: "" })}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Title *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => set({ title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
              placeholder="Event title"
            />
          </div>

          {/* Category + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category *
              </label>
              <select
                required
                value={form.category}
                onChange={(e) => set({ category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 bg-white"
              >
                <option value="">Select...</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Location *
              </label>
              <input
                required
                value={form.location}
                onChange={(e) => set({ location: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                placeholder="e.g. Lagos, Virtual"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="border border-gray-100 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">
                Date &amp; Time
              </h3>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="text-xs text-gray-500">Multi-day</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.isMultiDay}
                    onChange={(e) =>
                      set({ isMultiDay: e.target.checked, endDate: "" })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-8 h-5 bg-gray-200 peer-checked:bg-darckLilac rounded-full transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-3" />
                </div>
              </label>
            </div>

            {!form.isMultiDay ? (
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-3 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) => set({ startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Start time *
                  </label>
                  <input
                    type="time"
                    required
                    value={form.startTime}
                    onChange={(e) => set({ startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    End time
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => set({ endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Start date *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.startDate}
                      onChange={(e) => set({ startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      End date *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.endDate}
                      onChange={(e) => set({ endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Start time
                    </label>
                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(e) => set({ startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      End time
                    </label>
                    <input
                      type="time"
                      value={form.endTime}
                      onChange={(e) => set({ endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                    />
                  </div>
                </div>
              </div>
            )}

            {form.startDate && (
              <p className="text-xs bg-gray-50 rounded-lg px-3 py-2 text-gray-400">
                {"Displays as: "}
                <span className="font-medium text-gray-600">
                  {datePreview}
                  {timePreview ? ` \u00b7 ${timePreview}` : ""}
                </span>
              </p>
            )}
          </div>

          {/* Short description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Short Description *
            </label>
            <textarea
              required
              rows={2}
              value={form.description}
              onChange={(e) => set({ description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 resize-none"
              placeholder="Brief summary shown on the events list"
            />
          </div>

          {/* Full description — rich text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Description *
            </label>
            <RichTextEditor
              value={form.longDescription}
              onChange={handleLongDesc}
            />
          </div>

          {/* Registration link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Registration / Donate Link
            </label>
            <input
              value={form.registrationLink}
              onChange={(e) => set({ registrationLink: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
              placeholder="/donate"
            />
          </div>

          {/* Featured toggle */}
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-lilac/5 transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Featured event
              </p>
              <p className="text-xs text-gray-400">
                Shown prominently on the events page
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set({ featured: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 peer-checked:bg-darckLilac rounded-full transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
          </label>

          {/* Agenda */}
          <div className="border border-gray-100 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Agenda</h3>
            <div className="flex gap-2">
              <input
                value={newAgenda.time}
                onChange={(e) =>
                  setNewAgenda((a) => ({ ...a, time: e.target.value }))
                }
                className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                placeholder="Time"
              />
              <input
                value={newAgenda.activity}
                onChange={(e) =>
                  setNewAgenda((a) => ({ ...a, activity: e.target.value }))
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addAgenda())
                }
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                placeholder="Activity"
              />
              <button
                type="button"
                onClick={addAgenda}
                className="px-3 py-2 bg-darckLilac text-white text-sm rounded-lg hover:opacity-90"
              >
                Add
              </button>
            </div>
            {form.agenda.length > 0 && (
              <div className="space-y-2">
                {form.agenda.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <span className="text-xs font-medium text-darckLilac w-20 shrink-0">
                      {item.time}
                    </span>
                    <span className="flex-1 text-sm text-gray-700">
                      {item.activity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        set({ agenda: form.agenda.filter((_, j) => j !== i) })
                      }
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Goals */}
          <div className="border border-gray-100 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Goals</h3>
            <div className="flex gap-2">
              <input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addGoal())
                }
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                placeholder="e.g. Raise 500,000 for outreach"
              />
              <button
                type="button"
                onClick={addGoal}
                className="px-3 py-2 bg-darckLilac text-white text-sm rounded-lg hover:opacity-90"
              >
                Add
              </button>
            </div>
            {form.goals.length > 0 && (
              <div className="space-y-2">
                {form.goals.map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <span className="text-darckLilac font-bold text-sm w-5 shrink-0">
                      #{i + 1}
                    </span>
                    <span className="flex-1 text-sm text-gray-700">{g}</span>
                    <button
                      type="button"
                      onClick={() =>
                        set({ goals: form.goals.filter((_, j) => j !== i) })
                      }
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Speakers */}
          <div className="border border-gray-100 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">Speakers</h3>
            <div className="flex gap-3 items-start">
              <SpeakerAvatarUpload
                value={newSpeaker.image}
                onChange={(url) => setNewSpeaker((s) => ({ ...s, image: url }))}
              />
              <div className="flex-1 space-y-2">
                <input
                  value={newSpeaker.name}
                  onChange={(e) =>
                    setNewSpeaker((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                  placeholder="Name"
                />
                <input
                  value={newSpeaker.title}
                  onChange={(e) =>
                    setNewSpeaker((s) => ({ ...s, title: e.target.value }))
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSpeaker())
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40"
                  placeholder="Title / Role"
                />
              </div>
              <button
                type="button"
                onClick={addSpeaker}
                className="px-3 py-2 bg-darckLilac text-white text-sm rounded-lg hover:opacity-90 self-end"
              >
                Add
              </button>
            </div>
            {form.speakers.length > 0 && (
              <div className="space-y-2">
                {form.speakers.map((sp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div className="w-9 h-9 rounded-full bg-lilac/20 overflow-hidden shrink-0">
                      {sp.image && (
                        <Image
                          src={sp.image}
                          alt={sp.name}
                          width={36}
                          height={36}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {sp.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {sp.title}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        set({
                          speakers: form.speakers.filter((_, j) => j !== i),
                        })
                      }
                      className="text-red-400 hover:text-red-600 shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={isSaving}
            className="px-5 py-2.5 bg-gradient-to-r from-lilac to-darckLilac text-white text-sm font-medium rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Preview modal ────────────────────────────────────────────────────────────

function PreviewModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="relative bg-white max-w-4xl mx-auto rounded-xl shadow-xl">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between rounded-t-xl z-10">
            <h2 className="text-lg font-bold">Event Preview</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {event.image && (
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <span className="bg-lilac/10 text-darckLilac px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
              {event.featured && (
                <span className="bg-lilac text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-lilac" />
                {event.date}
              </span>
              {event.time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-lilac" />
                  {event.time}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-lilac" />
                {event.location}
              </span>
            </div>
            <p className="text-gray-600 mb-6 italic">{event.description}</p>
            <div
              className="prose max-w-none mb-8 text-gray-700"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
            />
            {event.agenda.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Event Agenda
                </h2>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {event.agenda.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-lilac text-white rounded-lg px-3 py-1.5 text-sm min-w-[90px] text-center shrink-0">
                        {item.time}
                      </div>
                      <div className="flex-1 border-l-2 border-lilac pl-4 py-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {event.goals.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Event Goals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.goals.map((goal, i) => (
                    <div
                      key={i}
                      className="bg-white border border-lilac/20 rounded-lg p-5 text-center"
                    >
                      <p className="text-2xl font-bold text-lilac mb-2">
                        #{i + 1}
                      </p>
                      <p className="text-sm text-gray-700">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {event.speakers.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Featured Speakers
                </h2>
                <div className="flex flex-wrap gap-4">
                  {event.speakers.map((sp, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 min-w-[180px]"
                    >
                      <div className="w-10 h-10 rounded-full bg-lilac/20 overflow-hidden shrink-0">
                        {sp.image && (
                          <Image
                            src={sp.image}
                            alt={sp.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {sp.name}
                        </p>
                        <p className="text-xs text-gray-500">{sp.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete confirm ───────────────────────────────────────────────────────────

function DeleteModal({
  event,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  event: Event;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
          Delete Event?
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          <span className="font-medium text-gray-700">{event.title}</span> will
          be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Event card ───────────────────────────────────────────────────────────────

function EventCard({
  event,
  onEdit,
  onDelete,
  onPreview,
}: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onPreview: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden ${event.featured ? "border-lilac border-2" : "border-gray-100"}`}
    >
      <div className="flex">
        <div className="relative w-32 shrink-0 bg-gray-100">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-gray-300" />
            </div>
          )}
        </div>
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start gap-2 justify-between mb-1">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="bg-lilac/10 text-darckLilac px-2.5 py-0.5 rounded-full text-xs font-medium">
                {event.category}
              </span>
              {event.featured && (
                <span className="bg-lilac text-white px-2.5 py-0.5 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onPreview}
                title="Preview"
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-darckLilac"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={onEdit}
                title="Edit"
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-darckLilac"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                title="Delete"
                className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {event.date}
            </span>
            {event.time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {event.time}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
          </div>
          <p
            className={`text-xs text-gray-500 ${expanded ? "" : "line-clamp-2"}`}
          >
            {event.description}
          </p>
          {event.description.length > 100 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 text-xs text-darckLilac flex items-center gap-0.5 hover:underline"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  More
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Conversions ──────────────────────────────────────────────────────────────

function eventToFormData(e: Event): FormData {
  return {
    title: e.title,
    category: e.category,
    startDate: e.date,
    startTime: "",
    endTime: "",
    isMultiDay: false,
    endDate: "",
    location: e.location,
    featured: e.featured,
    image: e.image,
    description: e.description,
    longDescription: e.longDescription,
    registrationLink: e.registrationLink,
    speakers: e.speakers,
    agenda: e.agenda,
    goals: e.goals,
  };
}

function formDataToPayload(data: FormData) {
  return {
    title: data.title,
    category: data.category,
    date: buildDateString(data.startDate, data.isMultiDay, data.endDate),
    time: buildTimeString(data.startTime, data.endTime),
    location: data.location,
    featured: data.featured,
    image: data.image,
    description: data.description,
    longDescription: data.longDescription,
    registrationLink: data.registrationLink,
    speakers: data.speakers,
    agenda: data.agenda,
    goals: data.goals,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminEventsPage() {
  const { data: events = [], isLoading, isError } = useGetEventsQuery();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [previewEvent, setPreviewEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [formError, setFormError] = useState("");

  const formInitial = editingEvent ? eventToFormData(editingEvent) : EMPTY_FORM;

  const handleSave = async (data: FormData) => {
    setFormError("");
    try {
      const payload = formDataToPayload(data);
      if (editingEvent) {
        await updateEvent({ id: editingEvent.id, ...payload }).unwrap();
      } else {
        await createEvent(payload).unwrap();
      }
      setShowForm(false);
      setEditingEvent(null);
    } catch {
      setFormError("Failed to save event. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!deletingEvent) return;
    try {
      await deleteEvent(deletingEvent.id).unwrap();
      setDeletingEvent(null);
    } catch {
      /* swallow */
    }
  };

  const openCreate = () => {
    setEditingEvent(null);
    setShowForm(true);
  };
  const openEdit = (e: Event) => {
    setEditingEvent(e);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setFormError("");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {events.length} event{events.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-lilac to-darckLilac text-white text-sm font-medium rounded-xl hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            New Event
          </button>
        </div>

        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {formError}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-lilac" />
          </div>
        )}
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            Failed to load events.
          </div>
        )}

        {!isLoading && !isError && events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-lilac/10 rounded-2xl flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-darckLilac" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No events yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Create your first event to get started.
            </p>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-lilac to-darckLilac text-white text-sm font-medium rounded-xl hover:opacity-90"
            >
              <Plus className="w-4 h-4" />
              New Event
            </button>
          </div>
        )}

        {!isLoading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => openEdit(event)}
                onDelete={() => setDeletingEvent(event)}
                onPreview={() => setPreviewEvent(event)}
              />
            ))}
          </div>
        )}
      </div>

      {(showForm || editingEvent) && (
        <EventForm
          initial={formInitial}
          onSave={handleSave}
          onCancel={closeForm}
          isSaving={isCreating || isUpdating}
        />
      )}
      {previewEvent && (
        <PreviewModal
          event={previewEvent}
          onClose={() => setPreviewEvent(null)}
        />
      )}
      {deletingEvent && (
        <DeleteModal
          event={deletingEvent}
          onConfirm={handleDelete}
          onCancel={() => setDeletingEvent(null)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
