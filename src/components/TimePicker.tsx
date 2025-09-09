import React, { useState, useMemo } from "react";
import { Picker } from "antd-mobile";
import { PickerValue } from "antd-mobile/es/components/picker-view";
import { Input } from "antd";

type DisabledDate = (date: Date) => boolean;

interface TimePickerProps {
  onChange?: (time: string[]) => void;
  disabledDate?: DisabledDate; // Function to disable certain hours/minutes
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange, disabledDate }) => {
  const [value, setValue] = useState<(string | null)[]>(["", ""]);
  const [visible, setVisible] = useState(false);

  // Hours column
  const hoursColumn = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => `${i}`.padStart(2, "0"))
        .filter((hour) => !disabledDate?.(new Date(0, 0, 0, Number(hour))))
        .map((hour) => ({ label: hour, value: hour })),
    [disabledDate]
  );

  // Minutes column based on selected hour (if hour not selected, show all minutes)
  const minutesColumn = useMemo(() => {
    const selectedHour = value[0] && value[0] !== "" ? Number(value[0]) : null;
    return Array.from({ length: 60 }, (_, i) => `${i}`.padStart(2, "0"))
      .filter((minute) => {
        if (selectedHour === null) return true; // show all minutes if hour not selected
        return !disabledDate?.(new Date(0, 0, 0, selectedHour, Number(minute)));
      })
      .map((minute) => ({ label: minute, value: minute }));
  }, [value[0], disabledDate]);

  const handleConfirm = (val: PickerValue[]) => {
    const newTime = val.map((v) => (v !== null ? String(v) : ""));
    setValue(newTime);
    onChange?.(newTime);
    setVisible(false);
  };

  return (
    <>
      <Input
        onClick={() => setVisible(true)}
        value={value[0] && value[1] ? value.join(":") : ""}
        readOnly
        placeholder="בחר שעה"
      />

      <Picker
        columns={[hoursColumn, minutesColumn]}
        value={value}
        visible={visible}
        title="בחר שעה"
        confirmText="אישור"
        cancelText="ביטול"
        onConfirm={handleConfirm}
        onClose={() => setVisible(false)}
        onSelect={(val: PickerValue[]) => {
          // reset minutes if hour changes
          if (val[0] !== value[0]) {
            setValue([val[0] as string, ""]);
          }
        }}
      />
    </>
  );
};

export default TimePicker;
