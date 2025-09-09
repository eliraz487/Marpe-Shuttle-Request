import { Button, Checkbox, Modal } from "antd";
import { useState } from "react";
import MainScreenHeader from "./MainScreenHeader";
import { getCookie, setCookie } from "../functions/cookies";
import MarpaContactInfo from "./MarpaContactInfo";

export default function MainScreenInfo() {
  const [open, setOpen] = useState(true);
  const agreePolicy = getCookie<boolean>("agreePolicy");
  const [agree, setAgree] = useState<boolean>(agreePolicy ?? false);

  return (
    <Modal
      centered={false}
      open={open && !agreePolicy}
      footer={
        <Button
          type="primary"
          color="default"
          disabled={!agree}
          variant="solid"
          className="info--button"
          onClick={() => {
            setOpen(false);
            setCookie("agreePolicy", agree, { minutes: 15 });
          }}
        >
          למילוי הטופס
        </Button>
      }
      closable={false}
    >
      <MainScreenHeader />
      <div className="info">
        <span className="info--highlight">
          השאטלים פעילים בימים שני, שלישי ורביעי בלבד!
        </span>
        <div className="info__paragraph">
          <h4 className="info__paragraph--highlight">הלוך</h4>
          <p className="info__paragraph--normal">
            שימו לב! ניתן להירשם לשאטל{" "}
            <span className="underline">עד השעה 18:00 ביום שלפני התור</span>
            (הרשמות לאחר מועד זה לא יענו)
            <br />
            <br />
            <br />
            אנו נעדכן אתכם בהודעת Whatsapp{" "}
            <span className="underline">
              עד השעה 20:30 את שעת האיסוף המדויקת.
            </span>
          </p>
        </div>

        <div className="info__paragraph">
          <h4 className="info--highlight">חזור</h4>
          <p className="info--normal">
            בסיום הטיפול במרפ"א/סמוך לסיום, יש להירשם לשאטל חזור בקבלה.
            <br />
            אנו נעדכן אתכם בכריזה במרפ"א סמוך ליציאת השאטל למקום אליו ביקשתם.
          </p>
        </div>
        <p className="info--normal">
          <span className="info--highlight">שימו לב! </span>
          אין לעזוב את המרפ"א בזמן ההמתנה לשאטל חזור, יש להמתין במרפ"א{" "}
          <span className="underline">לפחות 15 דקות </span>
          <br />
          <br />
        </p>
        <MarpaContactInfo></MarpaContactInfo> 
        <span className="info--highlight">
          בעת מילוי טופס זה אני מאשר/ת כי אני מבקש/ת נסיעת שאטל לאיסוף/החזרה
          מהבסיס לטובת טיפול רפואי במרפ״א ערבה - אין לבצע הזמנה מרוכזת למספר
          חיילים ע"י מפקד/חופ"ל, חייל של יהיה רשום לא יוכל לעלות לשאטל ללא
          אישור.
        </span>
        <Checkbox
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
          }}
        >
          אני מאשר/ת
        </Checkbox>
      </div>
    </Modal>
  );
}
