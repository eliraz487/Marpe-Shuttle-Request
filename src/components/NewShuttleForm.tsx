import { Button, Form, Input, Radio } from "antd";
import { ConfigProvider, Popup } from "antd-mobile";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { useState } from "react";

import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import useGetServices from "../hooks/data/useGetServices";
import useGetStations from "../hooks/data/useGetStations";
import heIL from "../locales/he-IL";
import CheckListWithSearch from "./CheckListPopup";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import MarpaContactInfo from "./MarpaContactInfo";

dayjs.locale("he");
dayjs.extend(isSameOrBefore);

export interface NewShuttleFormValues {
  date: Date;
  time: string;
  service: string[];
  fullname: string;
  phone: string;
  pickup: string[];
  needShuttleReturn: boolean;
  remarks?: string;
}

interface Props {
  onSubmit: (values: NewShuttleFormValues) => void;
}

export default function NewShuttleForm({ onSubmit }: Props) {
  const [form] = Form.useForm<NewShuttleFormValues>();

  const [locationPopUpVisible, setLocationPopUpVisible] = useState(false);
  const [servicePopUpVisible, setServicePopUpVisible] = useState(false);
  const allowedDays = [1, 2, 3];

  const servicesData = useGetServices();
  const stationsData = useGetStations()?.filter(
    (item) => item.Title !== "מרפא ערבה"
  );

  const fullName = Form.useWatch("fullname", form);
  const phone = Form.useWatch("phone", form);
  const selectedServices = Form.useWatch("service", form);
  const selectedPickupStation = Form.useWatch("pickup", form);
  const date = Form.useWatch("date", form);
  const time = Form.useWatch("time", form);
  const needShuttleReturn = Form.useWatch("needShuttleReturn", form);

  const isFormValid = () => {
    return (
      !!fullName?.trim() &&
      /^05\d{8}$/.test(phone || "") &&
      Array.isArray(selectedServices) &&
      selectedServices.length > 0 &&
      !!date &&
      !!time &&
      needShuttleReturn
    );
  };

  const clearForm = () => {
    form.resetFields();
  };

  const handleReset = () => {
    form.resetFields();
  };

  const disabledDate = (date: Date) => {
    const hour = date.getHours();
    if (hour < 8 || hour > 18) return true;
    return false;
  };

  return (
    <ConfigProvider locale={heIL}>
      <Form<NewShuttleFormValues>
        form={form}
        initialValues={{
          needShuttleReturn: true,
        }}
        onFinish={(submitValues) => {
          onSubmit(submitValues);
          handleReset();
        }}
        requiredMark={(label, { required }) =>
          required ? `${label} ` : `${label} (אופציונלי)`
        }
        layout="vertical"
        className="form"
      >
        <Form.Item required label="תאריך התור" name="date">
          <DatePicker allowedDays={allowedDays}></DatePicker>
        </Form.Item>
        <Form.Item required label={`שעת הגעה רצויה למרפ"א`} name="time">
          <TimePicker disabledDate={disabledDate} />
        </Form.Item>
        <span className="form--span">
          ניתן להירשם לשאטל עד השעה 18:00 ביום שלפני התור (הרשמות לאחר מועד זה
          לא יענו). שימו לב! השאטלים פעילים בימים שני, שלישי ורביעי בלבד!
        </span>
        <Form.Item
          required
          className="form-item"
          label="שירות שאליו מגיע"
          name="service"
          rules={[{ required: true, message: "חובה לבחור שירות אחד לפחות" }]}
        >
          <Input.TextArea
            readOnly
            placeholder="בחר שירות"
            value={selectedServices?.join(", ")}
            onClick={() => setServicePopUpVisible(true)}
            autoSize={{ minRows: 1 }}
          />
          <Popup
            visible={servicePopUpVisible}
            onMaskClick={() => setServicePopUpVisible(false)}
            position="bottom"
          >
            <CheckListWithSearch
              multiple
              options={servicesData?.map((item) => ({
                key: item.ID,
                value: item.Title,
                label: item.Title,
              }))}
              value={selectedServices || []}
              onChange={(val) => form.setFieldValue("service", val)}
              onClose={() => setServicePopUpVisible(false)}
            />
          </Popup>
        </Form.Item>
        <span className="form--span">ניתן לבחור יותר משירות אחד</span>
        <Form.Item
          required
          className="form-item"
          label="שם מלא"
          name="fullname"
          rules={[
            { required: true, message: "השדה חובה!" },
            { pattern: /^[א-ת\s]+$/g, message: "יש להזין אותיות בעברית בלבד!" },
            { min: 3, message: "השם חייב להיות יותר משני תווים" },
          ]}
        >
          <Input placeholder="שם מלא" />
        </Form.Item>
        <span className="form--span">
          יש להזין שם מלא של המטופל/ת בלבד, אין להזין את שמו של המפקד/חופ"ל.
        </span>
        <Form.Item
          required
          className="form-item"
          label="מספר טלפון נייד"
          name="phone"
          rules={[
            { required: true, message: "יש להזין מספר טלפון" },
            { pattern: /^05\d{8}$/, message: "מספר לא תקין" },
          ]}
        >
          <Input type="tel" placeholder="מספר טלפון" pattern="[0-9]*" />
        </Form.Item>

        <span className="form--span">
          יש להזין מספר טלפון אישית בלבד, אין להזין מספר טלפון של המפקד/חופ"ל.
        </span>
        <Form.Item
          required
          className="form-item"
          label="מקום לאיסוף"
          name="pickup"
          rules={[
            { required: true, message: "חובה לבחור מקום איסוף אחד לפחות" },
          ]}
        >
          <Input
            readOnly
            placeholder="בחר מקום"
            value={selectedPickupStation}
            onClick={() => setLocationPopUpVisible(true)}
          />
          <Popup
            visible={locationPopUpVisible}
            onMaskClick={() => setLocationPopUpVisible(false)}
            position="bottom"
          >
            <CheckListWithSearch
              options={stationsData?.map((item) => ({
                key: item.ID,
                value: item.Title,
                label: item.Title,
              }))}
              value={selectedPickupStation || []}
              onChange={(val) => form.setFieldValue("pickup", val)}
              onClose={() => setLocationPopUpVisible(false)}
            />
          </Popup>
        </Form.Item>
        <span className="form--span">
          במידה ואתם משרתים במרחב הערבה/אילת והבסיס לא מופיע ברשימה יש ליצור קשר
          עם משרד הקבלה של מרפ"א ערבה בWhatsapp.
        </span>
        <Form.Item required name="needShuttleReturn" label="צריך חזור?">
          <Radio.Group>
            <Radio value={true}>כן</Radio>
            <Radio value={false}>לא</Radio>
          </Radio.Group>
        </Form.Item>
        <span className="form--span">
          שימו לב! אין לעזוב את המרפ"א בזמן ההמתנה לשאטל חזור, יש להמתין במרפ"א
          לפחות 15 דקות לפני מועד ההחזרה.
        </span>
        <Form.Item className="form-item" label="הערות נוספות" name="remarks">
          <TextArea rows={3} />
        </Form.Item>
        <span className="form--span">לא חובה. ניתן להוסיף במידה ויש</span>
        <MarpaContactInfo></MarpaContactInfo>
        <br />
        <br />
        <div className="form--button">
          <Button
            type="primary"
            color="default"
            variant="outlined"
            htmlType="reset"
            onClick={clearForm}
            className="form--button--clear"
          >
            נקה טופס
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isFormValid()}
            color="default"
            variant="solid"
            className="form--button--submit"
          >
            שלח
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
}
