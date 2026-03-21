import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../Select";

const phoneInputVariants = cva("flex", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    error: {
      true: "[&>*]:border-destructive",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    error: false,
  },
});

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const defaultCountries: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "AE", name: "UAE", dialCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
];

function formatPhoneNumber(digits: string, countryCode: string): string {
  const cleanDigits = digits.replace(/\D/g, "");

  if (countryCode === "US" || countryCode === "CA") {
    if (cleanDigits.length <= 3) return cleanDigits;
    if (cleanDigits.length <= 6) return `(${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3)}`;
    return `(${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3, 6)}-${cleanDigits.slice(6, 10)}`;
  }

  if (cleanDigits.length <= 3) return cleanDigits;
  if (cleanDigits.length <= 6) return `${cleanDigits.slice(0, 3)} ${cleanDigits.slice(3)}`;
  return `${cleanDigits.slice(0, 3)} ${cleanDigits.slice(3, 6)} ${cleanDigits.slice(6)}`;
}

export interface PhoneNumberInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof phoneInputVariants> {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (country: Country) => void;
  countries?: Country[];
  defaultCountryCode?: string;
  placeholder?: string;
  disabled?: boolean;
}

function PhoneNumberInput(
  {
    value,
    onChange,
    onCountryChange,
    countries = defaultCountries,
    defaultCountryCode = "US",
    placeholder = "Phone number",
    disabled = false,
    size,
    error,
    className,
    ...props
  }: PhoneNumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(() => {
    return countries.find((c) => c.code === defaultCountryCode) || countries[0];
  });

  const [displayValue, setDisplayValue] = React.useState(() => {
    const digits = value.replace(/\D/g, "").replace(selectedCountry.dialCode.replace(/\D/g, ""), "");
    return formatPhoneNumber(digits, selectedCountry.code);
  });

  const handleCountryChange = React.useCallback(
    (countryCode: string) => {
      const country = countries.find((c) => c.code === countryCode) || countries[0];
      setSelectedCountry(country);
      onCountryChange?.(country);

      const digits = displayValue.replace(/\D/g, "");
      const fullNumber = `${country.dialCode}${digits}`;
      onChange(fullNumber);
    },
    [countries, displayValue, onChange, onCountryChange]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const digits = input.replace(/\D/g, "");
      const formatted = formatPhoneNumber(digits, selectedCountry.code);
      setDisplayValue(formatted);

      const fullNumber = `${selectedCountry.dialCode}${digits}`;
      onChange(fullNumber);
    },
    [selectedCountry, onChange]
  );

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  return (
    <div ref={ref} className={cn(phoneInputVariants({ size, error }), className)} {...props}>
      <SelectRoot value={selectedCountry.code} onValueChange={handleCountryChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "w-[100px] shrink-0 rounded-r-none border-r-0 focus:z-10",
            size === "sm" && "h-8 text-xs",
            size === "lg" && "h-12 text-base"
          )}
          aria-label="Select country code"
        >
          <SelectValue>
            <span className="flex items-center gap-1.5">
              <span>{selectedCountry.flag}</span>
              <span className="text-muted-foreground">{selectedCountry.dialCode}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
                <span className="text-muted-foreground">{country.dialCode}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <Input
        type="tel"
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "rounded-l-none focus:z-10",
          size === "sm" && "h-8 text-xs",
          size === "lg" && "h-12 text-base"
        )}
        aria-label="Phone number"
      />
    </div>
  );
}

PhoneNumberInput.displayName = "PhoneNumberInput";

export { PhoneNumberInput, phoneInputVariants, defaultCountries };
