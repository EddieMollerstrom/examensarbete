import InputField from "@/app/_components/input";

export default function LogSet() {
    return <>
        <div>
            <InputField customHintText={"Kg"}/>
            <InputField customHintText={"Reps"}/>
            <button>Logg</button>
        </div>
    </>
}