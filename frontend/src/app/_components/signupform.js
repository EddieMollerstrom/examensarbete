'use client'
import InputField from "@/app/_components/input";
import {useState} from "react";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (res.ok) {
            console.log("Registered successfuly!");

        } else {
            console.error("Login failed");
        }
    };

    return <>
        <div className={"flex justify-center"}>

            <div className={"flex flex-col p-10 justify-center ge-white-bg-color rounded-lg"}>
                <h2 className={"ge-primary-color flex justify-center font-bold"}>Sign Up</h2>
                <div className={"flex flex-col gap-2"}>
                    <InputField customHintText={"Username"}/>
                    <InputField customHintText={"Email"}/>
                    <InputField customHintText={"Password"} isObscure={true}/>
                    <button onClick={handleSubmit} className={"ge-primary-bg-color ge-white-color rounded-md py-3 hover:cursor-pointer ge-accent-hover"}>Sign up</button>

                    <div>
                        <p className={"ge-primary-color"}>Already have an account?</p>
                        <a href={"/"} className={"ge-accent-color"}>Press here</a>
                    </div>

                </div>
            </div>


        </div>
    </>
}