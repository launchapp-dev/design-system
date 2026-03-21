import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const phoneInputVariants = cva(
  "flex w-full rounded-md text-[hsl(var(--la-foreground))] transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-[hsl(var(--la-ring))] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      error: {
        true: "border-[hsl(var(--la-destructive))] focus-within:ring-[hsl(var(--la-destructive))]",
        false: "border-[hsl(var(--la-input))]",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export interface Country {
  code: string;
  dialCode: string;
  name: string;
  flag: string;
  format?: string;
}

const DEFAULT_COUNTRIES: Country[] = [
  { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸", format: "(###) ###-####" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧", format: "#### ### ####" },
  { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦", format: "(###) ###-####" },
  { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺", format: "### ### ###" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪", format: "### #######" },
  { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷", format: "# ## ## ## ##" },
  { code: "IT", dialCode: "+39", name: "Italy", flag: "🇮🇹", format: "## #######" },
  { code: "ES", dialCode: "+34", name: "Spain", flag: "🇪🇸", format: "### ### ###" },
  { code: "NL", dialCode: "+31", name: "Netherlands", flag: "🇳🇱", format: "# ## ## ## ##" },
  { code: "PL", dialCode: "+48", name: "Poland", flag: "🇵🇱", format: "### ### ###" },
  { code: "BR", dialCode: "+55", name: "Brazil", flag: "🇧🇷", format: "(##) #####-####" },
  { code: "MX", dialCode: "+52", name: "Mexico", flag: "🇲🇽", format: "## #### ####" },
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳", format: "##### #####" },
  { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳", format: "### #### ####" },
  { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵", format: "# #-####-####" },
  { code: "KR", dialCode: "+82", name: "South Korea", flag: "🇰🇷", format: "##-####-####" },
  { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬", format: "#### ####" },
  { code: "HK", dialCode: "+852", name: "Hong Kong", flag: "🇭🇰", format: "#### ####" },
  { code: "NZ", dialCode: "+64", name: "New Zealand", flag: "🇳🇿", format: "## ### ####" },
  { code: "ZA", dialCode: "+27", name: "South Africa", flag: "🇿🇦", format: "## ### ####" },
  { code: "RU", dialCode: "+7", name: "Russia", flag: "🇷🇺", format: "(###) ###-##-##" },
  { code: "AE", dialCode: "+971", name: "UAE", flag: "🇦🇪", format: "## ### ####" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia", flag: "🇸🇦", format: "# ### ### ###" },
  { code: "EG", dialCode: "+20", name: "Egypt", flag: "🇪🇬", format: "## #### ####" },
  { code: "NG", dialCode: "+234", name: "Nigeria", flag: "🇳🇬", format: "### ### ####" },
  { code: "IL", dialCode: "+972", name: "Israel", flag: "🇮🇱", format: "#-###-###-####" },
  { code: "TR", dialCode: "+90", name: "Turkey", flag: "🇹🇷", format: "(###) ### ## ##" },
  { code: "AR", dialCode: "+54", name: "Argentina", flag: "🇦🇷", format: "# ## ####-####" },
  { code: "CL", dialCode: "+56", name: "Chile", flag: "🇨🇱", format: "# #### ####" },
  { code: "CO", dialCode: "+57", name: "Colombia", flag: "🇨🇴", format: "### ### ####" },
  { code: "PE", dialCode: "+51", name: "Peru", flag: "🇵🇪", format: "### ### ###" },
  { code: "VE", dialCode: "+58", name: "Venezuela", flag: "🇻🇪", format: "(###) ###-####" },
  { code: "TH", dialCode: "+66", name: "Thailand", flag: "🇹🇭", format: "# #### ####" },
  { code: "VN", dialCode: "+84", name: "Vietnam", flag: "🇻🇳", format: "### ### ####" },
  { code: "ID", dialCode: "+62", name: "Indonesia", flag: "🇮🇩", format: "###-###-###" },
  { code: "MY", dialCode: "+60", name: "Malaysia", flag: "🇲🇾", format: "##-### ####" },
  { code: "PH", dialCode: "+63", name: "Philippines", flag: "🇵🇭", format: "### ### ####" },
  { code: "TW", dialCode: "+886", name: "Taiwan", flag: "🇹🇼", format: "### ### ###" },
  { code: "SE", dialCode: "+46", name: "Sweden", flag: "🇸🇪", format: "##-### ## ##" },
  { code: "NO", dialCode: "+47", name: "Norway", flag: "🇳🇴", format: "## ## ## ##" },
  { code: "DK", dialCode: "+45", name: "Denmark", flag: "🇩🇰", format: "## ## ## ##" },
  { code: "FI", dialCode: "+358", name: "Finland", flag: "🇫🇮", format: "## ### ###" },
  { code: "CH", dialCode: "+41", name: "Switzerland", flag: "🇨🇭", format: "## ### ## ##" },
  { code: "AT", dialCode: "+43", name: "Austria", flag: "🇦🇹", format: "# ### ## ## ##" },
  { code: "BE", dialCode: "+32", name: "Belgium", flag: "🇧🇪", format: "# ### ## ##" },
  { code: "PT", dialCode: "+351", name: "Portugal", flag: "🇵🇹", format: "## ### ####" },
  { code: "GR", dialCode: "+30", name: "Greece", flag: "🇬🇷", format: "### ### ####" },
  { code: "CZ", dialCode: "+420", name: "Czech Republic", flag: "🇨🇿", format: "### ### ###" },
  { code: "RO", dialCode: "+40", name: "Romania", flag: "🇷🇴", format: "### ### ####" },
  { code: "HU", dialCode: "+36", name: "Hungary", flag: "🇭🇺", format: "(##) ### ####" },
  { code: "IE", dialCode: "+353", name: "Ireland", flag: "🇮🇪", format: "## ### ####" },
];

function formatPhoneNumber(digits: string, format?: string): string {
  if (!format) return digits;
  
  const digitChars = digits.replace(/\D/g, "");
  let result = "";
  let digitIndex = 0;
  
  for (let i = 0; i < format.length && digitIndex < digitChars.length; i++) {
    if (format[i] === "#") {
      result += digitChars[digitIndex];
      digitIndex++;
    } else {
      result += format[i];
    }
  }
  
  return result;
}

function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">,
    VariantProps<typeof phoneInputVariants> {
  value?: string;
  onChange?: (value: string, country: Country | null) => void;
  countries?: Country[];
  defaultCountryCode?: string;
  showFlag?: boolean;
  showDialCode?: boolean;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value = "",
      onChange,
      countries = DEFAULT_COUNTRIES,
      defaultCountryCode = "US",
      showFlag = true,
      showDialCode = true,
      size,
      error,
      disabled,
      className,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = React.useState<Country | undefined>(
      countries.find((c) => c.code === defaultCountryCode)
    );
    const [inputValue, setInputValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => inputRef.current!);

    const parseValue = React.useCallback(
      (val: string) => {
        const digits = extractDigits(val);
        if (!digits) return { dialCode: "", number: "" };
        
        const matchingCountry = countries.find((c) => {
          const dialDigits = extractDigits(c.dialCode);
          return digits.startsWith(dialDigits);
        });
        
        if (matchingCountry) {
          const dialDigits = extractDigits(matchingCountry.dialCode);
          return {
            dialCode: matchingCountry.dialCode,
            number: digits.slice(dialDigits.length),
            country: matchingCountry,
          };
        }
        
        return { dialCode: "", number: digits };
      },
      [countries]
    );

    React.useEffect(() => {
      if (value) {
        const parsed = parseValue(value);
        if (parsed.country && parsed.country.code !== selectedCountry?.code) {
          setSelectedCountry(parsed.country);
        }
        if (parsed.country) {
          setInputValue(formatPhoneNumber(parsed.number, parsed.country.format));
        } else {
          setInputValue(value);
        }
      } else {
        setInputValue("");
      }
    }, [value, parseValue, selectedCountry?.code]);

    const handleCountryChange = (countryCode: string) => {
      const country = countries.find((c) => c.code === countryCode);
      if (country) {
        setSelectedCountry(country);
        const digits = extractDigits(inputValue);
        const formatted = formatPhoneNumber(digits, country.format);
        setInputValue(formatted);
        const fullNumber = `${country.dialCode}${digits}`;
        onChange?.(fullNumber, country);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const digits = extractDigits(rawValue);
      const country = selectedCountry;
      
      if (country) {
        const formatted = formatPhoneNumber(digits, country.format);
        setInputValue(formatted);
        const fullNumber = `${country.dialCode}${digits}`;
        onChange?.(fullNumber, country);
      } else {
        setInputValue(rawValue);
        onChange?.(rawValue, null);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Backspace") {
        const cursorPos = inputRef.current?.selectionStart ?? 0;
        const value = inputRef.current?.value ?? "";
        if (cursorPos > 0 && /\D/.test(value[cursorPos - 1])) {
          e.preventDefault();
          const newValue = value.slice(0, cursorPos - 1) + value.slice(cursorPos);
          const digits = extractDigits(newValue);
          const formatted = formatPhoneNumber(digits, selectedCountry?.format);
          setInputValue(formatted);
          const fullNumber = `${selectedCountry?.dialCode ?? ""}${digits}`;
          onChange?.(fullNumber, selectedCountry ?? null);
          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(cursorPos - 1, cursorPos - 1);
            }
          });
        }
      }
    };

    return (
      <div
        className={cn(
          phoneInputVariants({ size, error }),
          "border bg-[hsl(var(--la-background))]",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        <SelectPrimitive.Root
          value={selectedCountry?.code}
          onValueChange={handleCountryChange}
          open={isOpen}
          onOpenChange={setIsOpen}
          disabled={disabled}
        >
          <SelectPrimitive.Trigger
            className={cn(
              "flex items-center gap-1 border-r border-[hsl(var(--la-border))] bg-[hsl(var(--la-muted))] px-2 outline-none",
              "focus:ring-0 focus:ring-offset-0",
              size === "sm" && "h-8 min-w-[4.5rem] text-xs",
              size === "md" && "h-10 min-w-[5rem] text-sm",
              size === "lg" && "h-12 min-w-[6rem] text-base"
            )}
            aria-label="Select country"
          >
            {showFlag && (
              <span className="text-base" aria-hidden="true">
                {selectedCountry?.flag}
              </span>
            )}
            {showDialCode && (
              <span className="text-[hsl(var(--la-muted-foreground))]">
                {selectedCountry?.dialCode}
              </span>
            )}
            <SelectPrimitive.Icon asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 opacity-50"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="z-50 max-h-80 min-w-[12rem] overflow-hidden rounded-md border border-[hsl(var(--la-border))] bg-[hsl(var(--la-popover))] text-[hsl(var(--la-popover-foreground))] shadow-md"
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1 text-[hsl(var(--la-muted-foreground))]">
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
                  aria-hidden="true"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport className="p-1">
                {countries.map((country) => (
                  <SelectPrimitive.Item
                    key={`${country.code}-${country.dialCode}`}
                    value={country.code}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                      "focus:bg-[hsl(var(--la-accent))] focus:text-[hsl(var(--la-accent-foreground))]",
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                  >
                    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
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
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <span className="text-base" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="text-[hsl(var(--la-muted-foreground))]">
                      {country.dialCode}
                    </span>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1 text-[hsl(var(--la-muted-foreground))]">
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
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        <input
          ref={inputRef}
          type="tel"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-[hsl(var(--la-muted-foreground))]",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
          aria-label="Phone number"
          aria-invalid={error || undefined}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput, phoneInputVariants, DEFAULT_COUNTRIES };
