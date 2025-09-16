import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import MarpaContactInfo from "./MarpaContactInfo";
import { deleteCookie } from "../functions/cookies";

interface ISuccessForm {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SuccessForm({ setIsOpen }: ISuccessForm) {
  const handleClick = () => {
    setIsOpen(false);
    deleteCookie("agreePolicy");
  };

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
          <Button
            onClick={handleClick}
            className="success-form__container--button"
          >
            מילוי טופס נוסף
          </Button>
        </div>
        <MarpaContactInfo></MarpaContactInfo>
      </div>
    </>
  );
}
