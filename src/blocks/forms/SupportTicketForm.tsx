import type * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Textarea } from "../../components/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { Badge } from "../../components/Badge";

// ── Icons (inline SVG to avoid lucide-react dep) ─────────────────────────────
function LifeBuoyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 4.24 4.24" />
      <path d="m14.83 9.17 4.24-4.24" />
      <path d="m14.83 14.83 4.24 4.24" />
      <path d="m9.17 14.83-4.24 4.24" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = "general" | "billing" | "technical" | "feature" | "bug" | "account";

export interface SupportTicketFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit: (data: {
    subject: string;
    description: string;
    priority: TicketPriority;
    category: TicketCategory;
    attachments?: File[];
  }) => void;
  title?: string;
  description?: string;
  categories?: { value: TicketCategory; label: string }[];
  maxAttachments?: number;
  isSubmitting?: boolean;
}

const priorityConfig: Record<TicketPriority, { label: string; color: string; badge: "default" | "secondary" | "destructive" | "outline" }> = {
  low: { label: "Low", color: "text-blue-600", badge: "outline" },
  medium: { label: "Medium", color: "text-amber-600", badge: "secondary" },
  high: { label: "High", color: "text-orange-600", badge: "destructive" },
  urgent: { label: "Urgent", color: "text-red-600", badge: "destructive" },
};

const defaultCategories: { value: TicketCategory; label: string }[] = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "billing", label: "Billing & Payments" },
  { value: "feature", label: "Feature Request" },
  { value: "bug", label: "Bug Report" },
  { value: "account", label: "Account Issues" },
];

function SupportTicketForm({
  onSubmit,
  title = "Submit a Support Ticket",
  description: descriptionText = "We're here to help. Describe your issue and we'll get back to you as soon as possible.",
  categories = defaultCategories,
  maxAttachments = 5,
  isSubmitting = false,
  className,
  ...props
}: SupportTicketFormProps) {
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState<TicketPriority>("medium");
  const [category, setCategory] = React.useState<TicketCategory>("general");
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (attachments.length + files.length > maxAttachments) {
      setErrors({ ...errors, attachments: `Maximum ${maxAttachments} files allowed` });
      return;
    }
    setAttachments([...attachments, ...files]);
    setErrors({ ...errors, attachments: "" });
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (subject.length > 200) newErrors.subject = "Subject must be under 200 characters";
    if (!description.trim()) newErrors.description = "Description is required";
    if (description.length < 10) newErrors.description = "Description must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ subject, description, priority, category, attachments });
  };

  const isFormValid = subject.trim() && description.trim().length >= 10;

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <LifeBuoyIcon className="h-6 w-6 text-muted-foreground" />
          <div>
            <CardTitle>{title}</CardTitle>
            {descriptionText && <CardDescription>{descriptionText}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category & Priority */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as TicketCategory)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TicketPriority)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(priorityConfig) as TicketPriority[]).map((p) => (
                    <SelectItem key={p} value={p}>
                      <div className="flex items-center gap-2">
                        <Badge variant={priorityConfig[p].badge} className="text-xs">
                          {priorityConfig[p].label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="subject"
              placeholder="Brief summary of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={200}
              aria-invalid={!!errors.subject}
            />
            <div className="flex items-center justify-between">
              {errors.subject ? (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="h-4 w-4" />
                  {errors.subject}
                </p>
              ) : (
                <span />
              )}
              <span className="text-xs text-muted-foreground">{subject.length}/200</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircleIcon className="h-4 w-4" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments ({attachments.length}/{maxAttachments})</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={attachments.length >= maxAttachments}
              >
                <PaperclipIcon className="mr-2 h-4 w-4" />
                Add Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
              />
            </div>
            {errors.attachments && (
              <p className="text-sm text-destructive">{errors.attachments}</p>
            )}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((file, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {file.name}
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Typical response time: {priority === "urgent" ? "< 1 hour" : priority === "high" ? "< 4 hours" : "< 24 hours"}
            </p>
            <Button type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <CheckCircleIcon className="mr-2 h-4 w-4" />
                  Submit Ticket
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

SupportTicketForm.displayName = "SupportTicketForm";

export { SupportTicketForm };
