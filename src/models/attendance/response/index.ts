import { BackendResponseModel, BackendPaginationResponseModel } from "@models/backend";
import { PaginationModel } from "@models/pagination";
import z from "zod";

// Attendance item schema
const attendanceItemSchema = z.object({
  id: z.number(),
  date: z.string(),
  status: z.enum(["PRESENT", "ABSENT"]),
  coin: z.number(),
  bonusCoin: z.number(),
  userId: z.number(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  dayOfWeek: z.string().optional(),});

// User schema for new API response
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

// Attendance list response schema (old format)
const attendanceListDataSchema = z.object({
  results: z.array(attendanceItemSchema),
  pagination: PaginationModel,
});

// New attendance list response schema
const newAttendanceListDataSchema = z.object({
  user: userSchema,
  attendances: z.array(attendanceItemSchema),
  count: z.number(),
});

// Attendance list response (old format)
const attendanceListResponseSchema = BackendResponseModel(attendanceListDataSchema);
export type IAttendanceListResponse = z.infer<typeof attendanceListResponseSchema>;

// New attendance list response
const newAttendanceListResponseSchema = BackendResponseModel(newAttendanceListDataSchema);
export type INewAttendanceListResponse = z.infer<typeof newAttendanceListResponseSchema>;

// Single attendance response (for check-in)
const attendanceResponseSchema = BackendResponseModel(attendanceItemSchema);
export type IAttendanceResponse = z.infer<typeof attendanceResponseSchema>;

// Export the item type for reuse
export type IAttendanceItem = z.infer<typeof attendanceItemSchema>;
