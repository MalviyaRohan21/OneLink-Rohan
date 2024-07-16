'use client';
import RightIcon from "@/components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";

export default function UsernameForm({ desiredUsername }) {
    const [taken, setTaken] = useState(false);
    const formRef = React.createRef();
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const username = formData.get("username");
        const result = await grabUsername({ username });
        setTaken(result === false);
        if (result) {
            router.push("/account");
        }
    }

    return (
        <SectionBox>
            <form onSubmit={handleSubmit} ref={formRef}>
                <h1 className="text-4xl font-bold text-center mb-2">
                    Grab your username
                </h1>
                <p className="text-center mb-6 text-gray-500">
                    Choose a unique username to represent you on our platform
                </p>
                <div className="max-w-xs mx-auto">
                    <input
                        name="username"
                        className="block p-2 mx-auto border w-full mb-2 text-center"
                        defaultValue={desiredUsername}
                        type="text"
                        placeholder="username"
                    />
                    {taken && (
                        <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
                            Username is already taken!
                        </div>
                    )}
                    <SubmitButton>
                        <span>Claim your username</span>
                        <RightIcon />
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}


