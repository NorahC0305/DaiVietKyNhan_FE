import attendanceService from "@/services/attendance";
import { IAttendanceItem } from "@/models/attendance/response";

export async function getAttendanceListSSR(): Promise<IAttendanceItem[]> {
    try {
        const response = await attendanceService.getAttendanceList();

        if (response && response.statusCode === 200 && response.data) {
            // Handle new API response format with 'attendances' field
            const data = response.data as any;
            if ("attendances" in data) {
                return data.attendances || [];
            } else if ("results" in data) {
                // Fallback for old API format
                return data.results || [];
            }
        }

        return [];
    } catch (error) {
        console.error("Error fetching attendance list in SSR:", error);
        return [];
    }
}

export function isTodayCheckedInSSR(attendanceList: IAttendanceItem[]): boolean {
    const today = new Date();
    // Sử dụng local date để tránh lỗi múi giờ
    const todayString = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return attendanceList.some((item) => {
        // Handle both date formats: "2025-10-21T00:00:00.000Z" and direct date strings
        let itemDateString: string;

        if (item.date.includes("T")) {
            // ISO string format: "2025-10-21T00:00:00.000Z"
            const itemDate = new Date(item.date);
            itemDateString = `${itemDate.getFullYear()}-${String(
                itemDate.getMonth() + 1
            ).padStart(2, "0")}-${String(itemDate.getDate()).padStart(2, "0")}`;
        } else {
            // Direct date string format
            const itemDate = new Date(item.date);
            itemDateString = `${itemDate.getFullYear()}-${String(
                itemDate.getMonth() + 1
            ).padStart(2, "0")}-${String(itemDate.getDate()).padStart(2, "0")}`;
        }

        return itemDateString === todayString && item.status === "PRESENT";
    });
}

export function getCheckedDatesSSR(attendanceList: IAttendanceItem[]): Set<string> {
    const checkedDates = new Set<string>();

    attendanceList.forEach((item) => {
        if (item.status === "PRESENT") {
            // Use the same date parsing logic as isTodayCheckedIn
            let dateString: string;

            if (item.date.includes("T")) {
                // ISO string format: "2025-10-21T00:00:00.000Z"
                const itemDate = new Date(item.date);
                dateString = `${itemDate.getFullYear()}-${String(
                    itemDate.getMonth() + 1
                ).padStart(2, "0")}-${String(itemDate.getDate()).padStart(2, "0")}`;
            } else {
                // Direct date string format
                const itemDate = new Date(item.date);
                dateString = `${itemDate.getFullYear()}-${String(
                    itemDate.getMonth() + 1
                ).padStart(2, "0")}-${String(itemDate.getDate()).padStart(2, "0")}`;
            }

            checkedDates.add(dateString);
        }
    });

    return checkedDates;
}
