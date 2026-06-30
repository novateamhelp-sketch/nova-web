import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage = ({
  title = "Something went wrong",
  message,
  onRetry,
  className = "",
}: ErrorMessageProps) => (
  <div
    className={`card-surface flex flex-col items-center gap-4 p-8 text-center sm:p-10 ${className}`}
    role="alert"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
      <AlertCircle size={22} strokeWidth={1.75} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-forest-dark">{title}</h3>
      <p className="mt-2 text-sm text-sage">{message}</p>
    </div>
    {onRetry ? (
      <Button type="button" variant="outline" onClick={onRetry}>
        Try again
      </Button>
    ) : null}
  </div>
);

interface PageErrorProps {
  message: string;
  onRetry?: () => void;
}

export const PageError = ({ message, onRetry }: PageErrorProps) => (
  <div className="layout-x flex min-h-[40vh] items-center py-12">
    <div className="mx-auto w-full max-w-lg">
      <ErrorMessage message={message} onRetry={onRetry} />
    </div>
  </div>
);
