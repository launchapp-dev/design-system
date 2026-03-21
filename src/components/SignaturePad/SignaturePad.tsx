import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

const signaturePadVariants = cva(
  "rounded-md border bg-background overflow-hidden",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      error: {
        true: "border-destructive",
        false: "border-input",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export interface SignaturePadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof signaturePadVariants> {
  value?: string;
  onChange: (value: string) => void;
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  placeholder?: string;
  disabled?: boolean;
  showClear?: boolean;
  showUndo?: boolean;
  format?: "png" | "svg";
}

function SignaturePad(
  {
    value,
    onChange,
    width = 400,
    height = 200,
    strokeColor = "#000000",
    strokeWidth = 2,
    backgroundColor = "#ffffff",
    placeholder = "Sign here",
    disabled = false,
    showClear = true,
    showUndo = true,
    format = "png",
    size,
    error,
    className,
    ...props
  }: SignaturePadProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);
  const [history, setHistory] = React.useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);

  const saveState = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const undo = React.useCallback(() => {
    if (historyIndex <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newIndex = historyIndex - 1;
    ctx.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
    onChange(canvas.toDataURL(`image/${format}`));
    setHasSignature(newIndex > 0);
  }, [history, historyIndex, onChange, format]);

  const clear = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setHistory([]);
    setHistoryIndex(-1);
    onChange("");
  }, [backgroundColor, onChange]);

  const getCoordinates = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e) {
        const touch = e.touches[0];
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const startDrawing = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (disabled) return;
      e.preventDefault();

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const coords = getCoordinates(e);
      if (!coords) return;

      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      setIsDrawing(true);
      saveState();
    },
    [disabled, getCoordinates, strokeColor, strokeWidth, saveState]
  );

  const draw = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing || disabled) return;
      e.preventDefault();

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const coords = getCoordinates(e);
      if (!coords) return;

      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    },
    [isDrawing, disabled, getCoordinates]
  );

  const stopDrawing = React.useCallback(() => {
    if (!isDrawing) return;

    setIsDrawing(false);
    setHasSignature(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    onChange(canvas.toDataURL(`image/${format}`));
  }, [isDrawing, onChange, format]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (value && value.startsWith("data:image")) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = value;
    }
  }, [backgroundColor, value]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, 0, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={ref} className={cn(signaturePadVariants({ size, error }), className)} {...props}>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className={cn(
            "w-full cursor-crosshair touch-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
          style={{ backgroundColor }}
          aria-label="Signature pad"
          role="img"
        />
        {!hasSignature && !disabled && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-lg text-muted-foreground/50 italic">
              {placeholder}
            </span>
          </div>
        )}
      </div>

      {(showClear || showUndo) && (
        <div className="flex items-center justify-end gap-2 border-t bg-muted/40 px-3 py-2">
          {showUndo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={disabled || historyIndex <= 0}
            >
              <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Undo
            </Button>
          )}
          {showClear && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              disabled={disabled || !hasSignature}
            >
              <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

SignaturePad.displayName = "SignaturePad";

export { SignaturePad, signaturePadVariants };
