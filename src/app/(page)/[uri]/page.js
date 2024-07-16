import { Event } from "@/models/Event";
import { Page } from "@/models/page";
import { User } from "@/models/User";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

export const buttonIcons = {
    email: faEnvelope,
    mobile: faPhone,
    instagram: faInstagram,
    facebook: faFacebook,
    discord: faDiscord,
    youtube: faYoutube,
    whatsapp: faWhatsapp,
    github: faGithub,
    telegram: faTelegram,
};

function buttonLink(key, value) {
    if (key === 'mobile') {
        return 'tel:'+value;
    }
    if(key === 'email') {
        return 'mailto:'+value;
    }
    return value;
}

export default async function UserPage({params}) {
    const uri = params.uri;
    mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({uri});
    const user = await User.findOne({email:page.owner});
    await Event.create({uri:uri, page:uri, type:'view'});
    return (
        <div className="bg-blue-950 text-white min-h-screen">
        <div 
        className="h-36 bg-gray-400 bg-cover bg-center"
        style={
            page.bgType === 'color' 
            ? {backgroundColor: page.bgColor}
            : {backgroundImage: `url(${page.bgImage})`}
        } 
        >   
        </div>
        <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image 
        className="rounded-full w-full h-full object-cover"
        src={user.image} 
        alt="avatar" 
        width={256} height={256} 
        />
        </div>
        <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
        <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
            <FontAwesomeIcon className="h-4" icon={faLocationDot} />
            <span>
                {page.location}
            </span>
        </h3>
        <div className="max-w-s mx-auto text-center my-2">
        <p>{page.bio}</p>
        </div>
        <div className="flex gap-2 justify-center mt-4 pb-4">
            {Object.keys(page.buttons).map(buttonKey => (
                <Link 
                href={buttonLink(buttonKey, page.buttons[buttonKey])}
                className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center"
                key={buttonKey}>
                <FontAwesomeIcon className="w-5 h-5" icon={buttonIcons[buttonKey]} />
                </Link>
            ))}
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8 justify-center">
         {page.links.map(link => (
            <Link
            target="_blank"
            ping={process.env.URL+'api/click?url='+ btoa(link.url)+'&page='+page.uri}
            key={link}
            className="bg-indigo-800 p-2 flex" 
            href={link.url}>
                <div className="relative -left-4 overflow-hidden w-16">
                    <div className="w-16 h-16 bg-blue-700 aspect-square relative
                    flex items-center justify-center">
                    {link.icon && (
                    <Image
                    className="w-full h-full object-cover"
                    src={link.icon} alt={'icon'} 
                    width={64} height={64} />
                    )}
                    {!link.icon && (
                    <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                    )}
                    </div>
                </div>
                <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
                    <div>
                    <h3>{link.title}</h3>
                    <p className="text-white/50 h-6 overflow-hidden">{link.subtitle}</p>
                    </div>
                </div>
            </Link>
         ))}
        </div>
        </div> 
    );
}
