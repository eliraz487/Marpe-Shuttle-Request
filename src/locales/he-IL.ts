// src/locales/he-IL.ts

import { Locale } from "antd-mobile/es/locales/base";



const heIL: Locale = {
  locale: 'he-IL',
  common: {
    confirm: 'אישור',
    cancel: 'ביטול',
    loading: 'טוען',
    close: 'סגור',
  },
  Calendar: {
    title: 'לוח שנה',
    confirm: 'אישור',
    start: 'התחלה',
    end: 'סיום',
    startAndEnd: 'התחלה וסיום',
    today: 'היום',
    markItems: ['ב', 'ג', 'ד', 'ה', 'ו', 'ש', 'א'],
    yearAndMonth: 'חודש ${month} שנה ${year}'
  },
  Cascader: {
    placeholder: 'בחר',
  },
  Dialog: {
    ok: 'אישור',
  },
  DatePicker: {
    tillNow: 'עד עכשיו',
  },
  ErrorBlock: {
    default: {
      title: 'משהו השתבש',
      description: 'התרחשה שגיאה',
    },
    busy: {
      title: 'טעינה...',
      description: 'אנא המתן',
    },
    disconnected: {
      title: 'מנותק',
      description: 'בדוק את חיבור האינטרנט שלך',
    },
    empty: {
      title: 'אין תוכן',
      description: 'אין פריטים להצגה',
    },
  },
  Form: {
    required: 'שדה חובה',
    optional: 'אופציונלי',
    defaultValidateMessages: {
      default: 'שגיאה בשדה',
      required: 'שדה זה חובה',
      enum: 'ערך חייב להיות אחד מהערכים המותרים',
      whitespace: 'שדה זה לא יכול להיות ריק',
      date: {
        format: 'פורמט תאריך שגוי',
        parse: 'לא ניתן להמיר את הערך לתאריך',
        invalid: 'תאריך לא חוקי',
      },
      types: {
        string: 'ערך חייב להיות מחרוזת',
        method: 'ערך חייב להיות פונקציה',
        array: 'ערך חייב להיות מערך',
        object: 'ערך חייב להיות אובייקט',
        number: 'ערך חייב להיות מספר',
        date: 'ערך חייב להיות תאריך',
        boolean: 'ערך חייב להיות בוליאני',
        integer: 'ערך חייב להיות מספר שלם',
        float: 'ערך חייב להיות מספר עשרוני',
        regexp: 'ערך חייב להיות Regex',
        email: 'ערך חייב להיות אימייל חוקי',
        url: 'ערך חייב להיות URL חוקי',
        hex: 'ערך חייב להיות hex חוקי',
      },
      string: {
        len: 'אורך השדה חייב להיות {len}',
        min: 'אורך השדה חייב להיות לפחות {min}',
        max: 'אורך השדה לא יכול להיות יותר מ-{max}',
        range: 'אורך השדה חייב להיות בין {min} ל-{max}',
      },
      number: {
        len: 'המספר חייב להיות {len}',
        min: 'המספר חייב להיות לפחות {min}',
        max: 'המספר לא יכול להיות יותר מ-{max}',
        range: 'המספר חייב להיות בין {min} ל-{max}',
      },
      array: {
        len: 'המערך חייב להכיל {len} פריטים',
        min: 'המערך חייב להכיל לפחות {min} פריטים',
        max: 'המערך לא יכול להכיל יותר מ-{max} פריטים',
        range: 'המערך חייב להכיל בין {min} ל-{max} פריטים',
      },
      pattern: {
        mismatch: 'הערך לא מתאים לתבנית',
      },
    },
  },
  ImageUploader: {
    uploading: 'טוען...',
    upload: 'העלה',
  },
  InfiniteScroll: {
    noMore: 'אין עוד פריטים',
    failedToLoad: 'טעינה נכשלה',
    retry: 'נסה שוב',
  },
  Input: {
    clear: 'נקה',
  },
  Mask: {
    name: 'מסכה',
  },
  Modal: {
    ok: 'אישור',
  },
  PasscodeInput: {
    name: 'סיסמה',
  },
  PullToRefresh: {
    pulling: 'משוך לרענון',
    canRelease: 'שחרר לרענון',
    complete: 'הושלם',
  },
  SearchBar: {
    name: 'סרגל חיפוש',
  },
  Slider: {
    name: 'סליידר',
  },
  Stepper: {
    decrease: 'הפחת',
    increase: 'הוסף',
  },
  Switch: {
    name: 'מתג',
  },
  Selector: {
    name: 'בורר',
  },
};

export default heIL;
