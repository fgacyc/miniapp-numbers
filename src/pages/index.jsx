import NavBar from "@/components/nav-bar.jsx";
import UIProgressCircle from "@/components/progress-circle.jsx";
import FormStep1 from "@/pages/form-step1.jsx";
import { useState} from "react";
import FormStep2 from "@/pages/form-step2.jsx";
import {LuHistory} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {useAttendanceStore} from "@/store/attendance-store.js";
import {timeDetect, validate} from "@/components/tools.js";
import {addAttend, checkDuplicate} from "@/api/cg.js";
import {useTranslation} from "react-i18next";

export default function Index() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cg_id = useAttendanceStore(state => state.cg_id);
    const getFormData = useAttendanceStore(state => state.getFormData);
    const resetForm = useAttendanceStore(state => state.resetForm);
    function nextHandle(){
        setCurrentIndex(currentIndex+1)
    }
    const navigate = useNavigate();

    function goToHistory(){
        const local_cg_id = localStorage.getItem("history_cg_id");
        if (!cg_id) {
            // if gc_Id is not set, check local storage
            if (!local_cg_id) {
                alert("Please select a cell group first");
                return;
            }else{
                navigate(`/history/${local_cg_id}`);
            }
        }
        localStorage.setItem("history_cg_id",cg_id);
        navigate(`/history/${cg_id}`);
    }

    async function submit(){
        const data = getFormData();

        console.log(data)
        // return;

        // validate
        if(validate(data) === false) return;

        // checking duplicate
        const isDuplicate = await checkDuplicate(data.date,data.cg_id);
        console.log("isDuplicate",isDuplicate)
        if(isDuplicate) {
            alert("Your attendance has been submitted for the week you selected")
            return;
        }

        // check it this week start
        const ifStart = timeDetect(data.date, new Date());
        if(!ifStart){
            alert("You can only submit attendance for last week, this week has not started yet")
            return;
        }

        addAttend(data).then((res) => {
            if (res.status === true){
                alert("Submitted successfully!")
                resetForm();
            }else{
                alert("Submitted failed!")
            }
        })

    }
    const {t} = useTranslation();


    return (
        <div className={"h-screen"}>
            <NavBar ifShowBackArrow={false}>{t("Numbers")}</NavBar>
            <div className={"bg-[#00D97C] h-[calc(100vh-45px)] overflow-y-auto"}>
                <div className={"bg-white mt-6 h-auto rounded-t-2xl px-4 py-4 relative"} id="form-container">
                    <div className={"font-bold text-2xl  "}>
                        {t("Add Attendances")}
                    </div>
                    <div className={"mt-6 flex items-center "}>
                        <UIProgressCircle percent={currentIndex === 0 ? 50 : 100}>
                            {currentIndex === 0 ? "1/2" : "2/2"}
                        </UIProgressCircle>
                        <div className={"ml-4"}>
                            <div className={"font-bold text-lg"}>
                                {
                                    currentIndex === 0 ? t("Church Location") : t("Numbers-")
                                }
                            </div>
                            <div className={"text-[#64748B] text-base"}>
                                {
                                    currentIndex === 0 ? t("Please choose your location and date") : t("Please enter the numbers")
                                }
                            </div>
                        </div>
                    </div>
                    {
                        currentIndex === 0 && <FormStep1/>
                    }
                    {
                        currentIndex === 1 && <FormStep2/>
                    }
                    {
                        currentIndex === 0 &&
                        <div className={`flex  items-center text-white text-base mt-4`}
                        >
                            <div
                                className={"bg-white border rounded-lg py-3 px-4 text-black w-1/3  text-center  font-bold mr-4"}
                                onClick={goToHistory}
                            >
                                <LuHistory className={"w-6 h-6 inline-block mr-2"}/>
                            </div>
                            <div className={"border rounded-lg py-3 px-4 bg-[#00B05C] w-2/3 text-center "}
                                 onClick={nextHandle}
                            >{t("Next")}
                            </div>

                        </div>
                    }
                    {
                        currentIndex === 1 &&
                        <div className={`flex  items-center text-white text-base mt-4`}
                        >
                            <div
                                className={"bg-white border rounded-lg py-3 px-4 text-black w-1/3 text-center mr-4 font-bold"}
                                onClick={() => setCurrentIndex(0)}
                            >{t("Back")}
                            </div>
                            <div className={"border rounded-lg py-3 px-4 bg-[#00B05C] w-2/3 text-center"}
                                    onClick={submit}
                            >{t("Submit")}</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}