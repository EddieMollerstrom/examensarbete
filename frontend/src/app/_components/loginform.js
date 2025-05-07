'use client'
import InputField from "./input"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            // Hantera text-svar från servern
            const responseText = await res.text();
            let data;

            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = { message: responseText };
            }

            if (res.ok) {
                console.log("Login successful!");
                router.push("/gymdeluxe");
            } else {
                setError(typeof data === 'string' ? data : data.message || "Login failed. Please check your credentials.");
                console.error("Login failed:", data);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={"flex justify-center"}>
            <div className={"flex flex-col p-10 justify-center ge-white-bg-color rounded-lg"}>
                <h2 className={"ge-primary-color flex justify-center font-bold"}>Login</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
                    <InputField
                        customHintText={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <InputField
                        customHintText={"Password"}
                        isObscure={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={"ge-primary-bg-color ge-white-color rounded-md py-3 hover:cursor-pointer ge-accent-hover " +
                            (isLoading ? "opacity-50 cursor-not-allowed" : "")}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    <div>
                        <p className={"ge-primary-color"}>Don&#39;t have an account?</p>
                        <a href={"/signup"} className={"ge-accent-color"}>Press here</a>
                    </div>
                </form>
            </div>
        </div>
    );
}