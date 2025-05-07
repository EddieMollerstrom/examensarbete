import InputField from "./input"
import {useState} from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            console.log("Login successful!");
            // Ex: Spara token, redirecta etc.
        } else {
            console.error("Login failed");
        }
    };

    return <>
        <div className={"flex justify-center"}>

            <div className={"flex flex-col p-10 justify-center ge-white-bg-color rounded-lg"}>
                <h2 className={"ge-primary-color flex justify-center font-bold"}>Login</h2>
                <div className={"flex flex-col gap-2"}>
                    <InputField customHintText={"Email"}/>
                    <InputField customHintText={"Password"} isObscure={true}/>
                    <button type={"submit"} className={"ge-primary-bg-color ge-white-color rounded-md py-3 hover:cursor-pointer ge-accent-hover"}>Login</button>

                    <div>
                        <p className={"ge-primary-color"}>Don&#39;t have an account?</p>
                        <a href={"/signup"} className={"ge-accent-color"}>Press here</a>
                    </div>

                </div>
            </div>

        </div>
    </>
}