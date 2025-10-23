"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import attendanceService from "@/services/attendance";
import { IAttendanceItem } from "@/models/attendance/response";
import { toast } from "react-toastify";

interface AttendanceContextType {
    attendanceList: IAttendanceItem[];
    isLoading: boolean;
    isCheckingIn: boolean;
    error: Error | null;
    checkIn: () => Promise<any>;
    refetch: () => Promise<void>;
    isTodayCheckedIn: () => boolean;
    getCheckedDates: () => Set<string>;
    setAttendanceList: (list: IAttendanceItem[]) => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

interface AttendanceProviderProps {
    children: React.ReactNode;
    initialAttendanceList?: IAttendanceItem[] | null;
}

export const AttendanceProvider: React.FC<AttendanceProviderProps> = ({
    children,
    initialAttendanceList,
}) => {
    const [attendanceList, setAttendanceList] = useState<IAttendanceItem[]>(initialAttendanceList || []);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Fetch attendance list
    const fetchAttendanceList = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await attendanceService.getAttendanceList();

            if (response && response.statusCode === 200 && response.data) {
                // Handle new API response format with 'attendances' field
                const data = response.data as any;
                if ("attendances" in data) {
                    setAttendanceList(data.attendances || []);
                } else if ("results" in data) {
                    // Fallback for old API format
                    setAttendanceList(data.results || []);
                }
            }
        } catch (err) {
            setError(err as Error);
            console.error("Error fetching attendance list:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Check in function
    const checkIn = useCallback(async () => {
        try {
            setIsCheckingIn(true);
            setError(null);
            const response = await attendanceService.checkIn();

            if (response && response.statusCode === 201 && response.data) {
                toast.success(response.message || "Điểm danh thành công");
                // Refresh the attendance list after successful check-in
                await fetchAttendanceList();
                return response.data;
            } else {
                throw new Error(response.message || "Check-in failed");
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Điểm danh thất bại";
            toast.error(errorMessage);
            setError(err as Error);
            throw err;
        } finally {
            setIsCheckingIn(false);
        }
    }, [fetchAttendanceList]);

    // Check if today is already checked in
    const isTodayCheckedIn = useCallback(() => {
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
    }, [attendanceList]);

    // Get checked dates for weekly progress
    const getCheckedDates = useCallback(() => {
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
    }, [attendanceList]);

    const value: AttendanceContextType = {
        attendanceList,
        isLoading,
        isCheckingIn,
        error,
        checkIn,
        refetch: fetchAttendanceList,
        isTodayCheckedIn,
        getCheckedDates,
        setAttendanceList,
    };

    return (
        <AttendanceContext.Provider value={value}>
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => {
    const context = useContext(AttendanceContext);
    if (context === undefined) {
        throw new Error("useAttendance must be used within an AttendanceProvider");
    }
    return context;
};
