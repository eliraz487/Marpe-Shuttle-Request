import EditField from "./HomePage/EditField.tsx";

export default  function NewPatientForm (){
    return (
       <>
           <div className="patientform">
               <div className="patientform__header">
                   <div className="patientform__header-title"/>
               </div>
               <div className="patientform__patient-details">
                   <div className="patientform__patient-details-title"/>
                   <div className="patientform__patient-details-feilds">
                       <EditField title="שם מלא" onTextChange={()=>{}} onToggleEnable={()=>{}} hint={"הקלד שם החייל"} />
                   </div>
               </div>
               <div className="patientform__appointment-details">
                   <div className="patientform__appointment-details-title"/>
                   <div className="patientform__appointment-details-feilds"></div>
               </div>
               <div className="patientform__footer"></div>
           </div>
       </>
    );
};