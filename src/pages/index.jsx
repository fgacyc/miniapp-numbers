import NavBar from "@/components/nav-bar.jsx";
import UIProgressCircle from "@/components/progress-circle.jsx";
import FormStep1 from "@/pages/form-step1.jsx";
import {useState} from "react";
import FormStep2 from "@/pages/form-step2.jsx";
import {LuHistory} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {useAttendanceStore} from "@/store/attendance-store.js";

export default function Index() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cg_id = useAttendanceStore(state => state.cg_id);
    function nextHandle(){
        setCurrentIndex(currentIndex+1)
    }
    const navigate = useNavigate();

    function goToHistory(){
        if (!cg_id) {
            alert("Please select a cell group first");
            return;
        }
        navigate(`/history/${cg_id}`);
    }


    return (
        <div className={"h-screen bg-[#00D97C]"}>
            <NavBar ifShowBackArrow={false}>Numbers</NavBar>
            <div className={"bg-white mt-6 h-screen rounded-t-2xl px-4 py-4"}>
                <div className={"font-bold text-2xl  "}>
                    Add Attendances
                </div>
                <div className={"mt-6 flex items-center "}>
                    <UIProgressCircle percent={currentIndex === 0 ? 50 :100}>
                        {currentIndex === 0 ? "1/2" : "2/2"}
                    </UIProgressCircle>
                    <div className={"ml-4"}>
                        <div className={"font-bold text-lg"}>
                            {
                                currentIndex === 0 ? "Church Location" : "Numbers"
                            }
                        </div>
                        <div className={"text-[#64748B] text-base"}>
                            {
                                currentIndex === 0 ? "Please choose your location and date" : "Please enter the numbers"
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
            </div>
            {
                currentIndex === 0 &&
                <div className={`absolute bottom-2  flex  items-center text-white w-[calc(100%-32px)] mx-4 text-base`}
                >

                    <div className={"bg-white border rounded-lg py-3 px-4 text-black w-1/3  text-center  font-bold mr-4"}
                        onClick={goToHistory}
                    >
                        <LuHistory className={"w-6 h-6 inline-block mr-2"}/>
                    </div>
                    <div className={"border rounded-lg py-3 px-4 bg-[#00B05C] w-2/3 text-center "}
                         onClick={nextHandle}
                    >Next
                    </div>

                </div>
            }
            {
                currentIndex === 1 &&
                <div className={`absolute bottom-2  flex  items-center text-white w-[calc(100%-32px)] mx-4 text-base`}
                >
                    <div className={"bg-white border rounded-lg py-3 px-4 text-black w-1/3 text-center mr-4 font-bold"}
                        onClick={()=>setCurrentIndex(0)}
                    >Back</div>
                    <div className={"border rounded-lg py-3 px-4 bg-[#00B05C] w-2/3 text-center"}>Submit</div>
                </div>
            }
        </div>
    )
}