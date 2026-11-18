export type PhoneCountryCode = {
  code: string;
  label: string;
};

/** Common country codes for international wedding guests */
export const PHONE_COUNTRY_CODES: PhoneCountryCode[] = [
  { code: "+51", label: "Perú" },
  { code: "+1", label: "Estados Unidos / Canadá" },
  { code: "+44", label: "Reino Unido" },
  { code: "+34", label: "España" },
  { code: "+52", label: "México" },
  { code: "+54", label: "Argentina" },
  { code: "+55", label: "Brasil" },
  { code: "+56", label: "Chile" },
  { code: "+57", label: "Colombia" },
  { code: "+49", label: "Alemania" },
  { code: "+33", label: "Francia" },
  { code: "+39", label: "Italia" },
  { code: "+31", label: "Países Bajos" },
  { code: "+41", label: "Suiza" },
  { code: "+61", label: "Australia" },
  { code: "+64", label: "Nueva Zelanda" },
  { code: "+91", label: "India" },
  { code: "+86", label: "China" },
  { code: "+81", label: "Japón" },
  { code: "+82", label: "Corea del Sur" },
];

export const DEFAULT_PHONE_COUNTRY_CODE = "+51";
