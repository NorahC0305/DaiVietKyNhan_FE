import http from "@configs/fetch";
import {
  IAttendanceListResponse,
  IAttendanceResponse,
  INewAttendanceListResponse,
} from "@models/attendance/response";

const attendanceService = {
  // Get attendance list
  getAttendanceList: async () => {
    return await http.get<INewAttendanceListResponse>("/attendance/user", {
      cache: "no-store",
    });
  },

  // Check in (mark attendance)
  checkIn: async () => {
    return await http.post<IAttendanceResponse>("/attendance", {});
  },
};

export default attendanceService;
