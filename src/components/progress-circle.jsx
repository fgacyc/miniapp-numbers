import {ProgressCircle} from "antd-mobile";

export default function UIProgressCircle({children,percent}) {
    const letters = children.split("");


    return (
        <ProgressCircle
            percent={percent}
            style={{
                '--size': '60px',
                '--track-width': '4px',
                '--fill-color': '#00B05C',
            }}
        >
            <div className={"text-base"}>
                <span className={"relative bottom-1 text-[#00B05C] font-bold"}>{letters[0]}</span>
                <span>/</span>
                <span className={"relative top-1"}>{letters[2]}</span>
            </div>
        </ProgressCircle>
    )
}