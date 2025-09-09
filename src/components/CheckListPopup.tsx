import { CheckList, SearchBar, Button } from "antd-mobile";
import type { CheckListValue } from "antd-mobile/es/components/check-list";
import { useMemo, useState } from "react";
interface Option {
  key?: number;
  label: string;
  value: CheckListValue;
}

interface Props {
  options?: Option[];
  value: CheckListValue[];
  onChange: (val: CheckListValue[]) => void;
  onClose: () => void;
  multiple?: boolean;
}

export default function CheckListWithSearch({
  options,
  value,
  onChange,
  onClose,
  multiple,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    return options?.filter((opt) =>
      String(opt.label).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  return (
    <div className="checklist">
      <h3 className="checklist__title">בחר פריטים</h3>

      <SearchBar
        className="checklist__search"
        placeholder="..חפש"
        value={search}
        onChange={setSearch}
      />

      <div className="checklist__list">
        <CheckList multiple={multiple} value={value} onChange={onChange}>
          {filteredOptions?.map((opt) => (
            <CheckList.Item
              key={opt.key ? opt.key : String(opt.value)}
              value={opt.value}
            >
              {opt.label}
            </CheckList.Item>
          ))}
        </CheckList>
      </div>

      <Button
        block
        color="primary"
        className="checklist__button"
        onClick={onClose}
      >
        סיום (נבחרו: {value.join(", ") || "כלום"})
      </Button>
    </div>
  );
}
