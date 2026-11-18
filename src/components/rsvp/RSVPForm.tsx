"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_PHONE_COUNTRY_CODE,
  PHONE_COUNTRY_CODES,
} from "@/data/phone-country-codes";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { AttendanceStatus, RSVPData } from "@/types";

type RSVPFormProps = {
  onSuccess: (attendance: AttendanceStatus) => void;
};

const optionClass = (selected: boolean) =>
  `flex flex-1 cursor-pointer items-center justify-center border px-4 py-3.5 text-center text-sm transition-all duration-200 ${
    selected
      ? "border-charcoal bg-charcoal/5"
      : "border-charcoal/15 hover:border-charcoal/30"
  }`;

const fieldBaseClass =
  "border border-charcoal/15 bg-ivory text-charcoal transition-colors focus:border-earth focus:outline-none";

const fieldClass = `${fieldBaseClass} w-full px-4 py-3.5`;

const phoneCodeSelectClass = `${fieldBaseClass} min-w-0 w-full px-2 py-3.5 pr-6 text-left font-sans text-sm`;

function phoneCountryOptionText(code: string, label: string) {
  return `${code} (${label})`;
}

export function RSVPForm({ onSuccess }: RSVPFormProps) {
  const { t } = useLanguage();
  const r = t.rsvp;

  const [attendance, setAttendance] = useState<AttendanceStatus | null>(null);
  const [name, setName] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState(
    DEFAULT_PHONE_COUNTRY_CODE,
  );
  const [phone, setPhone] = useState("");
  const [attendingWithPartner, setAttendingWithPartner] = useState<boolean | null>(
    null,
  );
  const [partnerName, setPartnerName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAttending = attendance === "attending";

  const handleAttendanceChange = (value: AttendanceStatus) => {
    setAttendance(value);
    if (value === "not_attending") {
      setPhoneCountryCode(DEFAULT_PHONE_COUNTRY_CODE);
      setPhone("");
      setAttendingWithPartner(null);
      setPartnerName("");
      setArrivalDate("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (attendance === null) {
      setError(r.errors.attendanceRequired);
      return;
    }
    if (!name.trim()) {
      setError(r.errors.nameRequired);
      return;
    }

    if (attendance === "attending") {
      if (!phone.trim()) {
        setError(r.errors.phoneRequired);
        return;
      }
      if (attendingWithPartner === null) {
        setError(r.errors.partnerRequired);
        return;
      }
      if (attendingWithPartner && !partnerName.trim()) {
        setError(r.errors.partnerNameRequired);
        return;
      }
      if (!arrivalDate) {
        setError(r.errors.arrivalRequired);
        return;
      }
    }

    const data: RSVPData =
      attendance === "attending"
        ? {
            name: name.trim(),
            attendance: "attending",
            phoneCountryCode,
            phone: phone.trim(),
            attendingWithPartner: attendingWithPartner as boolean,
            partnerName: attendingWithPartner ? partnerName.trim() : undefined,
            arrivalDate,
          }
        : {
            name: name.trim(),
            attendance: "not_attending",
          };

    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error || r.errors.submitFailed,
        );
      }

      onSuccess(attendance);
    } catch (err) {
      setError(err instanceof Error ? err.message : r.errors.unexpected);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-8 text-center">
      <fieldset>
        <legend className="mb-4 text-xs uppercase tracking-widest text-charcoal/60">
          {r.attendanceQuestion}
        </legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <label className={optionClass(attendance === "attending")}>
            <input
              type="radio"
              name="attendance"
              checked={attendance === "attending"}
              onChange={() => handleAttendanceChange("attending")}
              className="sr-only"
            />
            <span className="text-charcoal">{r.attendingYes}</span>
          </label>
          <label className={optionClass(attendance === "not_attending")}>
            <input
              type="radio"
              name="attendance"
              checked={attendance === "not_attending"}
              onChange={() => handleAttendanceChange("not_attending")}
              className="sr-only"
            />
            <span className="text-charcoal">{r.attendingNo}</span>
          </label>
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-xs uppercase tracking-widest text-charcoal/60"
        >
          {r.fullName}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
          placeholder={r.fullNamePlaceholder}
        />
      </div>

      {isAttending && (
        <>
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-xs uppercase tracking-widest text-charcoal/60"
            >
              {r.phone}
            </label>
            <div className="grid grid-cols-[3fr_7fr] gap-2">
              <select
                id="phoneCountryCode"
                value={phoneCountryCode}
                onChange={(e) => setPhoneCountryCode(e.target.value)}
                className={phoneCodeSelectClass}
                aria-label={r.phoneCountryCode}
              >
                {PHONE_COUNTRY_CODES.map((option) => (
                  <option key={option.code} value={option.code}>
                    {phoneCountryOptionText(option.code, option.label)}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${fieldBaseClass} min-w-0 w-full px-4 py-3.5`}
                placeholder={r.phonePlaceholder}
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-4 text-xs uppercase tracking-widest text-charcoal/60">
              {r.partnerQuestion}
            </legend>
            <div className="flex justify-center gap-6">
              {(
                [
                  { value: true, label: r.partnerYes },
                  { value: false, label: r.partnerNo },
                ] as const
              ).map((option) => {
                const selected = attendingWithPartner === option.value;
                return (
                  <label
                    key={option.label}
                    className={`flex cursor-pointer items-center gap-3 border px-6 py-3.5 transition-all duration-200 ${
                      selected
                        ? "border-charcoal bg-charcoal/5"
                        : "border-charcoal/15 hover:border-charcoal/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="partner"
                      checked={selected}
                      onChange={() => setAttendingWithPartner(option.value)}
                      className="sr-only"
                    />
                    <span className="text-sm text-charcoal">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {attendingWithPartner && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <label
                htmlFor="partnerName"
                className="mb-2 block text-xs uppercase tracking-widest text-charcoal/60"
              >
                {r.partnerName}
              </label>
              <input
                id="partnerName"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className={fieldClass}
                placeholder={r.partnerNamePlaceholder}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="arrivalDate"
              className="mb-2 block text-xs uppercase tracking-widest text-charcoal/60"
            >
              {r.arrivalDate}
            </label>
            <input
              id="arrivalDate"
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className={fieldClass}
            />
          </div>
        </>
      )}

      {error && (
        <p className="text-sm text-red-700/80" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-center">
        <Button type="submit" disabled={loading} className="w-full sm:w-auto sm:min-w-[240px]">
          {loading ? r.submitting : r.submit}
        </Button>
      </div>
    </form>
  );
}
