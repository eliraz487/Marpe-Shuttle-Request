import { Input } from "antd";
import { CalendarPicker, Toast } from "antd-mobile";
import dayjs from "dayjs";
import { useState } from "react";



interface DatePickerProps {
  onChange?: (date: Date | null) => void;
  allowedDays: number[]; // Function to disable certain hours/minutes
}

export default function DatePicker({ onChange, allowedDays }: DatePickerProps) {
  const [value, setValue] = useState<Date | null>();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Input
        placeholder="בחר תאריך"
        readOnly
        value={value ? dayjs(value).format("dddd, DD/MM/YYYY") : ""}
        onClick={() => setVisible(true)}
      />
      <CalendarPicker
        weekStartsOn="Sunday"
        visible={visible}
        onClose={() => setVisible(false)}
        selectionMode="single"
        onConfirm={(val) => {
          const day = dayjs(val).day();
          onChange?.(val);
          if (allowedDays.includes(day )) {
            setValue(val);
          } else {
            Toast.show({
              content: "מותר לבחור רק שני, שלישי או רביעי",
              position: "bottom",
            });
          }
          setVisible(false);
        }}
        shouldDisableDate={(date) => {
          const day = dayjs(date).day();
          return (
            !allowedDays.includes(day) ||
            dayjs(date).isSameOrBefore(dayjs(), "day")
          );
        }}
      />
    </>
  );
}
