import { format, isValid, addHours } from "date-fns";
import { vi } from "date-fns/locale";

// Timezone constants
export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";
export const UTC_OFFSET = 7; // UTC+7 for Vietnam

// Helper functions for Vietnam timezone
export const getCurrentVietnamTime = () => {
  // Get current time - JavaScript Date already gives local time
  return new Date();
};

export const convertUtcToVietnamTime = (utcDate: string | Date) => {
  const date = typeof utcDate === "string" ? new Date(utcDate) : utcDate;
  // If server returns UTC time, convert to Vietnam time (UTC+7)
  return addHours(date, UTC_OFFSET);
};

export const convertVietnamTimeToUtc = (vietnamDate: Date) => {
  // Convert from Vietnam time (UTC+7) to UTC for server
  return addHours(vietnamDate, -UTC_OFFSET);
};

export const formatVietnamTime = (
  date: Date,
  formatStr: string = "dd/MM/yyyy HH:mm:ss"
) => {
  // Validate date before formatting
  if (!date || !isValid(date)) {
    return "Invalid Date";
  }
  return format(date, formatStr, { locale: vi });
};

export const isValidFutureDate = (date: Date | undefined) => {
  if (!date || !isValid(date)) return false;
  const nowVietnam = getCurrentVietnamTime();
  return date > nowVietnam;
};
