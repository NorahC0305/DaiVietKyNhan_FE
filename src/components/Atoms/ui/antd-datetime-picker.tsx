"use client";

import React from "react";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";
import "dayjs/locale/vi";

// Set Vietnamese locale for dayjs
dayjs.locale("vi");

interface AntdDateTimePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
}

export function AntdDateTimePicker({
  date,
  onDateChange,
  placeholder = "Chọn ngày và giờ",
  disabled = false,
  className,
  minDate = new Date(),
}: AntdDateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Dayjs | null>(
    date ? dayjs(date) : null
  );

  const handleDateTimeChange = (value: Dayjs | null, dateString: string | string[]) => {
    setSelectedDateTime(value);
    onDateChange(value ? value.toDate() : undefined);
  };

  const onOk = (value: DatePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  // Update internal state when external date changes
  React.useEffect(() => {
    if (date) {
      const dayjsDate = dayjs(date);
      setSelectedDateTime(dayjsDate);
    } else {
      setSelectedDateTime(null);
    }
  }, [date]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* DateTime Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">
          Ngày và giờ ra mắt *
        </label>
        <DatePicker
          showTime
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          onOk={onOk}
          placeholder={placeholder}
          disabled={disabled}
          disabledDate={(current) => current && current < dayjs(minDate).startOf('day')}
          size="large"
          className="w-full"
          suffixIcon={<CalendarOutlined className="text-orange-500" />}
          format="DD/MM/YYYY HH:mm"
          minuteStep={15}
        />
      </div>

      {/* Selected DateTime Display */}
      {date && (
        <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CalendarOutlined className="text-orange-600 text-lg" />
            </div>
            <div>
              <span className="text-orange-800 font-medium text-sm block">
                Ngày giờ đã chọn:
              </span>
              <span className="text-orange-900 font-mono text-base font-semibold">
                {dayjs(date).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
