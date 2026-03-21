import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const signaturePadVariants = cva(
  "relative rounded-md border bg-[hsl(var(--la-background))] overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-24",
        md: "h-32",
        lg: "h-40",
      },
      error: {
        true: "border-[hsl(var(--la-destructive))]",
        false: "border-[hsl(var(--la-input))]",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export interface SignaturePadProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof signaturePadVariants> {
  value?: string;
  onChange?: (dataUrl: string | null) => void;
  disabled?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  format?: "png" | "jpeg" | "svg";
  quality?: number;
  placeholder?: string;
  showClearButton?: boolean;
  showUndoButton?: boolean;
}

interface Point {
  x: number;
  y: number;
  pressure?: number;
}

const SignaturePad = React.forwardRef<HTMLDivElement, SignaturePadProps>(
  (
    {
      value,
      onChange,
      disabled,
      strokeColor = "hsl(var(--la-foreground))",
      strokeWidth = 2,
      backgroundColor = "transparent",
      format = "png",
      quality = 1,
      placeholder = "Sign here",
      showClearButton = true,
      showUndoButton = true,
      size,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isDrawingRef = React.useRef(false);
    const pointsRef = React.useRef<Point[]>([]);
    const historyRef = React.useRef<ImageData[]>([]);
    const [isEmpty, setIsEmpty] = React.useState(!value);
    const [canUndo, setCanUndo] = React.useState(false);

    React.useImperativeHandle(ref, () => containerRef.current!);

    const getCanvas = React.useCallback(() => {
      return canvasRef.current;
    }, []);

    const getContext = React.useCallback(() => {
      const canvas = getCanvas();
      return canvas?.getContext("2d") ?? null;
    }, [getCanvas]);

    const resizeCanvas = React.useCallback(() => {
      const canvas = getCanvas();
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = getContext();
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
      }
    }, [getCanvas, getContext, strokeColor, strokeWidth]);

    const saveState = React.useCallback(() => {
      const ctx = getContext();
      const canvas = getCanvas();
      if (!ctx || !canvas) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current.push(imageData);
      if (historyRef.current.length > 50) {
        historyRef.current.shift();
      }
      setCanUndo(historyRef.current.length > 1);
    }, [getContext, getCanvas]);

    const clearCanvas = React.useCallback(
      (silent = false) => {
        const ctx = getContext();
        const canvas = getCanvas();
        if (!ctx || !canvas) return;

        const dpr = window.devicePixelRatio || 1;
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        historyRef.current = [];
        setIsEmpty(true);
        setCanUndo(false);
        
        if (!silent) {
          onChange?.(null);
        }
      },
      [getContext, getCanvas, onChange]
    );

    const undo = React.useCallback(() => {
      const ctx = getContext();
      const canvas = getCanvas();
      if (!ctx || !canvas || historyRef.current.length <= 1) return;

      historyRef.current.pop();
      const previousState = historyRef.current[historyRef.current.length - 1];
      
      if (previousState) {
        ctx.putImageData(previousState, 0, 0);
        setCanUndo(historyRef.current.length > 1);
        
        const dataUrl = canvas.toDataURL(`image/${format}`, quality);
        onChange?.(dataUrl);
      }
    }, [getContext, getCanvas, format, quality, onChange]);

    const getCoordinates = React.useCallback(
      (event: React.MouseEvent | React.TouchEvent | PointerEvent): Point | null => {
        const canvas = getCanvas();
        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();
        let clientX: number;
        let clientY: number;
        let pressure = 0.5;

        if ("touches" in event) {
          const touch = event.touches[0];
          if (!touch) return null;
          clientX = touch.clientX;
          clientY = touch.clientY;
          pressure = (touch as unknown as { force?: number }).force ?? 0.5;
        } else {
          clientX = event.clientX;
          clientY = event.clientY;
          pressure = (event as PointerEvent).pressure ?? 0.5;
        }

        return {
          x: clientX - rect.left,
          y: clientY - rect.top,
          pressure,
        };
      },
      [getCanvas]
    );

    const drawLine = React.useCallback(
      (from: Point, to: Point) => {
        const ctx = getContext();
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      },
      [getContext]
    );

    const startDrawing = React.useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return;
        
        event.preventDefault();
        isDrawingRef.current = true;

        const point = getCoordinates(event);
        if (point) {
          pointsRef.current = [point];
          saveState();
        }
      },
      [disabled, getCoordinates, saveState]
    );

    const draw = React.useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawingRef.current || disabled) return;

        event.preventDefault();
        const point = getCoordinates(event);
        if (!point) return;

        const points = pointsRef.current;
        const lastPoint = points[points.length - 1];

        if (lastPoint) {
          drawLine(lastPoint, point);
        }

        pointsRef.current.push(point);
        setIsEmpty(false);
      },
      [disabled, getCoordinates, drawLine]
    );

    const stopDrawing = React.useCallback(() => {
      if (!isDrawingRef.current) return;

      isDrawingRef.current = false;
      pointsRef.current = [];

      const canvas = getCanvas();
      if (canvas && !isEmpty) {
        const dataUrl = canvas.toDataURL(`image/${format}`, quality);
        onChange?.(dataUrl);
      }
    }, [getCanvas, format, quality, onChange, isEmpty]);

    const exportSignature = React.useCallback((): string | null => {
      const canvas = getCanvas();
      if (!canvas || isEmpty) return null;
      return canvas.toDataURL(`image/${format}`, quality);
    }, [getCanvas, format, quality, isEmpty]);

    React.useEffect(() => {
      resizeCanvas();
      
      const handleResize = () => resizeCanvas();
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [resizeCanvas]);

    React.useEffect(() => {
      if (value) {
        const img = new Image();
        img.onload = () => {
          const ctx = getContext();
          const canvas = getCanvas();
          if (ctx && canvas) {
            const dpr = window.devicePixelRatio || 1;
            ctx.drawImage(img, 0, 0, canvas.width / dpr, canvas.height / dpr);
            setIsEmpty(false);
          }
        };
        img.src = value;
      }
    }, [value, getContext, getCanvas]);

    React.useEffect(() => {
      const ctx = getContext();
      if (ctx) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
      }
    }, [strokeColor, strokeWidth, getContext]);

    return (
      <div className="space-y-2">
        <div
          ref={containerRef}
          className={cn(
            signaturePadVariants({ size, error }),
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          {...props}
        >
          <canvas
            ref={canvasRef}
            className={cn(
              "touch-none",
              disabled ? "pointer-events-none" : "cursor-crosshair"
            )}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            aria-label="Signature pad"
            role="img"
          />
          {isEmpty && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="select-none text-[hsl(var(--la-muted-foreground))] text-sm italic">
                {placeholder}
              </span>
            </div>
          )}
        </div>
        {(showClearButton || showUndoButton) && (
          <div className="flex gap-2">
            {showUndoButton && (
              <button
                type="button"
                onClick={undo}
                disabled={disabled || !canUndo}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--la-foreground))] transition-colors",
                  "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
                aria-label="Undo last stroke"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
                Undo
              </button>
            )}
            {showClearButton && (
              <button
                type="button"
                onClick={() => clearCanvas()}
                disabled={disabled || isEmpty}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--la-foreground))] transition-colors",
                  "hover:bg-[hsl(var(--la-accent))] hover:text-[hsl(var(--la-accent-foreground))]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))] focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
                aria-label="Clear signature"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

SignaturePad.displayName = "SignaturePad";

export { SignaturePad, signaturePadVariants };
