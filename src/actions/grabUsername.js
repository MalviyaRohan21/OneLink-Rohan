'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function grabUsername(formData)
{
    const username = formData.username;
    mongoose.connect(process.env.MONGODB_URI);
    const existingPageDoc = await Page.findOne({uri: username});
    if (existingPageDoc) {
        return false;
    } else {
        const session = await getServerSession(authOptions);
        await Page.create({
            uri: username,
            owner: session?.user?.email
        });
        return true;
    } 
}
