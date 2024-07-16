'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData) {
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    if (session) {
        const dataKeys = [
            'displayName', 'location',
            'bio', 'bgType', 'bgColor', 'bgImage',
            ];

        const dataToUpdate = {};
        for (const key of dataKeys) {
            if (formData.has(key)) {
                dataToUpdate[key] = formData.get(key);
            }
        }

        await Page.updateOne(
            {owner:session?.user?.email}, 
            dataToUpdate,
        );  

        if (formData.has('avatar')) {
            const avatarLink = formData.get('avatar');
            await User.updateOne(
                {email: session?.user?.email},
                {image: avatarLink},
            );
        }

        return true;
    }
    return false;
}

export async function savePageButtons(formData) {
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    if (session) {
        const buttonsValues = {};
        formData.forEach((value, key) => {
            buttonsValues[key] = value;
        });
        const dataToUpdate = {buttons:buttonsValues};
        await Page.updateOne(
            {owner: session?.user?.email},
            dataToUpdate,
        );
        return true;
    }
    return false;
}

export async function savePageLinks(links) {
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    if (session) {
        await Page.updateOne(
            {owner: session?.user?.email},
            {links},
        );
    } else {
        return false;
    }
}
