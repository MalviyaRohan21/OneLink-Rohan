import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession} from "next-auth";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";

export default async function AccountPage({searchParams}) {
    
    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername;

    if (!session) {
        return redirect('/');
    }
    mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({owner: session?.user?.email}).lean();

    if (page) {

        const plainPage = {
            displayName: page.displayName || "",
            location: page.location || "",
            bio: page.bio || "",
            bgType: page.bgType || "",
            bgColor: page.bgColor || "",
            bgImage: page.bgImage || "",
            buttons: page.buttons || "",
            links: page.links || "",
        };

        return (
            <>
            <PageSettingsForm page={plainPage} user={session.user} />
            <PageButtonsForm page={plainPage} user={session.user} />
            <PageLinksForm page={plainPage} user={session.user} />
            </>
        );
    }
    
    return (
        <div>
            <UsernameForm desiredUsername={desiredUsername} />
        </div>
    );
}
