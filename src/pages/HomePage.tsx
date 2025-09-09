import { ConfigProvider } from "antd";
import heIL from "antd/locale/he_IL";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/he";
import Duraion from "dayjs/plugin/duration";
import { useState } from "react";
import MainScreenHeader from "../components/MainScreenHeader";
import MainScreenInfo from "../components/MainScreenInfo";
import NewShuttleForm, {
  NewShuttleFormValues,
} from "../components/NewShuttleForm";
import SuccessForm from "../components/SuccessForm";
import { addItemToList } from "../functions/postToSharepoint";
import useGetServices from "../hooks/data/useGetServices";
import useGetStations from "../hooks/data/useGetStations";
dayjs.locale("he");
dayjs.extend(Duraion);

export interface ShuttleFormValues {
  date?: Dayjs;
  time?: Dayjs;
  service?: string;
  fullname?: string;
  phone?: string;
  pickup?: string;
  shuttle?: "true" | "false";
  remarks?: string;
  agree?: boolean;
}

export default function HomePage() {
  const [sendForm, setSendForm] = useState<boolean>(false);
  const servicesData = useGetServices();
  const stationsData = useGetStations()?.filter(
    (item) => item.Title !== "מרפא ערבה"
  );

  const handleSubmit = async (values: NewShuttleFormValues) => {
    console.log("Form submitted:", values);
    const combined = new Date(values.date);
    combined.setHours(parseInt(values.time[0], 10));
    combined.setMinutes(parseInt(values.time[1], 10));
    combined.setSeconds(0);
    combined.setMilliseconds(0);

    const patientFormData = {
      Time: combined.toISOString(),
      StationId: stationsData?.find((val) => {
        return val.Title == values.pickup[0];
      })?.ID,
      Phone: values.phone,
      IsReturnShuttleRequired: values.needShuttleReturn,
      ReturnStationId: stationsData?.find((val) => {
        return val.Title == values.pickup[0];
      })?.ID,
      RequestedServicesId: values.service
        .map((title) => {
          const service = servicesData?.find((s) => s.Title === title);
          return service ? service.ID : null;
        })
        .filter((id): id is number => id !== null),
      FullName: values.fullname,
      notes: values?.remarks,
    };
    await addItemToList("ShuttleRequests", patientFormData);

    setSendForm(true);
  };

  return (
    <ConfigProvider locale={heIL} direction="rtl">
      <div className="mainscreen">
        <div className="mainscreen__container">
          <MainScreenInfo />
          <MainScreenHeader />
          {!sendForm ? (
            <NewShuttleForm onSubmit={handleSubmit} />
          ) : (
            <SuccessForm />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
