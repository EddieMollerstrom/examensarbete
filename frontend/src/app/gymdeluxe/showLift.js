export default function ShowLift({ weight, reps, date }) {
    return <>
        <div className={"p-3 flex gap-3 ge-primary-bg-color rounded-md justify-around"}>
            <p className={"ge-white-color"}>{weight}Kg</p>
            <p className={"ge-white-color"}>{reps} Rep</p>
            <p className={"ge-white-color"}>Date: {date}</p>
        </div>
    </>
}