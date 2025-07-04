'use client';

import * as React from "react";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { cn } from '@/lib/utils';
import type { Props as PhoneInputProps } from 'react-phone-number-input';

function PhoneInputStyled({
  className,
  ...props
}: PhoneInputProps<string | any>) {
  return (
    <PhoneInput
      {...props}
      data-slot="phone-input"
      className={cn(
        // Base input styles
        "custom-phone-input [&_input]:file:text-foreground [&_input]:placeholder:text-muted-foreground [&_input]:selection:bg-primary [&_input]:selection:text-primary-foreground [&_input]:dark:bg-input/30 [&_input]:border-input [&_input]:flex [&_input]:h-9 [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-md [&_input]:border [&_input]:bg-transparent [&_input]:px-3 [&_input]:py-1 [&_input]:text-base [&_input]:shadow-xs [&_input]:transition-[color,box-shadow] [&_input]:outline-none [&_input]:file:inline-flex [&_input]:file:h-7 [&_input]:file:border-0 [&_input]:file:bg-transparent [&_input]:file:text-sm [&_input]:file:font-medium [&_input]:disabled:pointer-events-none [&_input]:disabled:cursor-not-allowed [&_input]:disabled:opacity-50 [&_input]:md:text-sm",
        // Focus styles
        "[&_input]:focus-visible:border-ring [&_input]:focus-visible:ring-ring/50 [&_input]:focus-visible:ring-[3px]",
        // Invalid styles
        "[&_input]:aria-invalid:ring-destructive/20 [&_input]:dark:aria-invalid:ring-destructive/40 [&_input]:aria-invalid:border-destructive",
        // Country select styles
        "[&_.PhoneInputCountrySelect]:h-2 [&_.PhoneInputCountrySelect]:border [&_.PhoneInputCountrySelect]:border-input [&_.PhoneInputCountrySelect]:rounded-l-md [&_.PhoneInputCountrySelect]:bg-background [&_.PhoneInputCountrySelect]:px-2 [&_.PhoneInputCountrySelect]:text-sm",
        className
      )}
    />
  );
}

export { PhoneInputStyled };