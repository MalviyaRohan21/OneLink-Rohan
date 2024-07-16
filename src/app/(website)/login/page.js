import LoginwithGoogle from "@/components/buttons/Loginwithgoogle";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage(){
    const session = await getServerSession(authOptions);

    if (session) {
        return redirect("/account");
    }
    return(
        <div>
            <div className="bg-white border p-4 mx-w-xs mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">
                Sign In
            </h1>
            <p className="text-center mb-6 text-gray-500">
                Sign In to your account using one of the methods below
            </p>
            <LoginwithGoogle />
            </div>
        </div>

    );
}
