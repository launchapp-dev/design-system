import * as React from "react";
import { Button } from "../../../components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/Card";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../../components/AlertDialog";
import { cn } from "../../../lib/utils";

export interface AccountDeletionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onDelete?: () => void | Promise<void>;
  deleteLabel?: string;
}

function AccountDeletionCard({
  title = "Delete Account",
  description = "Permanently delete your account and all associated data. This action cannot be undone.",
  onDelete,
  deleteLabel = "Delete Account",
  className,
  ref,
  ...props
}: AccountDeletionCardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete?.();
      setDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card ref={ref} className={cn("max-w-xl border-destructive/50", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-destructive">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Consider exporting your data before proceeding. Once deleted, all personal information,
          settings, and history will be permanently removed.
        </p>
      </CardContent>
      <CardFooter>
        <AlertDialogRoot open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">{deleteLabel}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account and all of your data. This action cannot
                be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Yes, delete my account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogRoot>
      </CardFooter>
    </Card>
  );
}

AccountDeletionCard.displayName = "AccountDeletionCard";

export { AccountDeletionCard };
