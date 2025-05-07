'use client';
import InputField from "@/app/_components/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
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
            const registerRes = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (!registerRes.ok) {
                const message = await registerRes.text();
                setError(message || "Registration failed.");
                return;
            }
            
            const loginRes = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (!loginRes.ok) {
                const msg = await loginRes.text();
                setError(msg || "Login after registration failed.");
                return;
            }
            
            router.push("/gymdeluxe");
        } catch (err) {
            console.error(err);
            setError("Något gick fel. Försök igen.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col p-10 justify-center ge-white-bg-color rounded-lg">
                <h2 className="ge-primary-color flex justify-center font-bold">Sign Up</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <InputField
                        customHintText="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <InputField
                        customHintText="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <InputField
                        customHintText="Password"
                        isObscure={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`ge-primary-bg-color ge-white-color rounded-md py-3 hover:cursor-pointer ge-accent-hover ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? "Creating account..." : "Sign up"}
                    </button>

                    <div>
                        <p className="ge-primary-color">Already have an account?</p>
                        <Link to="/" className="ge-accent-color" href={"/"}>Press here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
