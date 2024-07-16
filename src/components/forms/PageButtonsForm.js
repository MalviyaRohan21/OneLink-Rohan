"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faDiscord, faYoutube, faWhatsapp, faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";


export const allButtons = [
    { key: 'email', label: 'E-mail', icon: faEnvelope, placeholder: 'abc@example.com'},
    { key: 'mobile', label: 'Mobile', icon: faMobile, placeholder: '+91 8973526007' },
    { key: 'instagram', label: 'Instagram', icon: faInstagram, placeholder: 'https://instagram.com/username'},
    { key: 'facebook', label: 'Facebook', icon: faFacebook, placeholder: 'https://facebook.com/username'},
    { key: 'discord', label: 'Discord', icon: faDiscord, placeholder: 'https://discord.gg/invite'},
    { key: 'youtube', label: 'YouTube', icon: faYoutube, placeholder: 'https://youtube.com/channel'},
    { key: 'whatsapp', label: 'WhatsApp', icon: faWhatsapp, placeholder: '+91 8973526007'},
    { key: 'github', label: 'Github', icon: faGithub, placeholder: 'https://github.com/username'},
    { key: 'telegram', label: 'Telegram', icon: faTelegram, placeholder: 'https://t.me/username'},
];

export default function PageButtonsForm({user,page}) {

    const pageSavedButtonKeys = Object.keys(page.buttons);
    const pageSavedButtonInfo = pageSavedButtonKeys.map(k => allButtons.find(b => b.key === k));

    const [activeButtons, setActiveButtons] = useState(pageSavedButtonInfo); 

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => {
            return [...prevButtons, button];
        });
    }

    async function saveButtons(formData){
        await savePageButtons(formData);
        toast.success('Settings saved successfully!');
    }

    function removeButton({key:keyToRemove}) {
        setActiveButtons(prevButtons => {
            return prevButtons.filter(button => button.key !== keyToRemove);
        });
    }
    
    const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

    return (
        <SectionBox>
            <form action={saveButtons}>
            <h2 className="text-2xl font-bold mb-4">Add Your Social Links</h2>
            <ReactSortable
            handle=".handle" 
            list={activeButtons} 
            setList={setActiveButtons}>
            {activeButtons.map(b => (
                <div 
                className="mb-4 flex items-center"
                key={b.key}>
                    <div className="w-52 flex h-full text-gray-700 p-2 gap-2 items-center">
                    <FontAwesomeIcon icon={faGripLines} 
                    className="cursor-pointer text-gray-400 handle p-2" />   
                    <FontAwesomeIcon icon={b.icon} />
                    <span>{b.label}:</span>
                    </div>
                    <input 
                    placeholder={b.placeholder}
                    defaultValue={page.buttons[b.key]}
                    name={b.key}
                    type="text" style={{marginBottom:'0'}}/>
                    <button
                    onClick={() => removeButton(b)}   
                    type="button" 
                    className="py-2 px-4 bg-gray-300 cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ))}
            </ReactSortable>
            <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
                {availableButtons.map(b => (
                    <button key={b.key}
                        type="button" 
                        onClick={() => addButtonToProfile(b)}
                        className="flex items-center gap-1 p-2 bg-gray-200">
                        <FontAwesomeIcon icon={b.icon} />
                        <span>{b.label}</span>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                ))}
            </div>
            <div className="max-w-xs mx-auto mt-4">
                <SubmitButton>
                    <FontAwesomeIcon icon = {faSave} />
                    <span>Save</span>
                </SubmitButton>
            </div>
            </form>
        </SectionBox>
    );
}

