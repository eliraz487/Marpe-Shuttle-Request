import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import MarpaContactInfo from "./MarpaContactInfo";

export default function SuccessForm() {
  return (
    <>
      <div className="success-form">
        <div className="success-form__container">
          <CheckCircleTwoTone
            className="success-form__container--icon"
            twoToneColor="#52c41a"
          />
          <span className="success-form__container--title">
            טופס הזמנה נשלח בהצלחה
          </span>
          <span className="success-form__container--message">
            אנו נעדכן אתכם בהודעת Whatsapp עד השעה 20:30 את שעת האיסוף המדויקת.
          </span>
          <Button className="success-form__container--button">
            מילוי טופס נוסף
          </Button>
        </div>
        <MarpaContactInfo></MarpaContactInfo>
      </div>
    </>
  );
}
