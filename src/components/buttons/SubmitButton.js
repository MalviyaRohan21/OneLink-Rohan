import { useFormStatus } from "react-dom";

export default function SubmitButton({children, className=''}) {
    const {pending} = useFormStatus();
    return(
        <button
        type="submit"
        disabled={pending}
        className={"bg-purple-500 disabled:bg-purple-300 text-white disabled:text-gray-600 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center " + className}
        >
        {pending && (
            <span>Saving...</span>
        )}
        {!pending && children}
        </button>
    );
}
