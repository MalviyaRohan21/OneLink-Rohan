'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/lib/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({page,user}) {

    const [links, setLinks] = useState(page.links || []);

    async function save() {
        await savePageLinks(links);
        toast.success('Links saved');
    }

    function addNewLink() {
        setLinks(prev => {
            return [...prev, {
                key: Date.now().toString(),
                title:'', 
                subtitle:'', 
                icon:'', 
                url:''
            }];
        });
    }

    function handleUpload(ev, linkKeyForUpload) {
        upload(ev, uploadedImageUrl => {
            setLinks(prevLinks => {
                const newLinks = [...prevLinks];
                newLinks.forEach((link,index) => {
                    if (link.key === linkKeyForUpload) {
                    link.icon = uploadedImageUrl;
                    }
                });
                return newLinks;
            });
        });
    }

    function handleLinkChange(keyOfLinkToChange, prop, ev) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach((link) => {
                if (link.key === keyOfLinkToChange) {
                link[prop] = ev.target.value;
                }
            });
            return [...prev];
        })
    }

    function removeLink(linkKeyToRemove) {
        setLinks(prevLinks => 
        [...prevLinks].filter(l => l.key !== linkKeyToRemove)
        );
        toast.success('Link removed');
    }

    return (
        <SectionBox>
            <form action={save}>
                <h2 className="text-2xl font-bold mb-4">Add Your Custom Links</h2>
                <button
                onClick={addNewLink}
                type="button" 
                className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"> 
                    <FontAwesomeIcon 
                    icon={faPlus}
                    className="bg-blue-500 text-white rounded-full p-1 aspect-square"
                    />
                    <span>Add new</span>
                </button>
                <div className="">
                    <ReactSortable
                    handle={'.handle'} 
                    list={links} setList={setLinks}>
                   {links.map(l => (
                    <div key={l.key} className="mt-8 flex gap-6 items-center">
                        <div className="handle">
                            <FontAwesomeIcon className="text-gray-400 mr-2 cursor-pointer"
                            icon={faGripLines} />
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-300 rounded-full
                            relative aspect-square overflow-hidden w-16 h-16 inline-flex
                            justify-center items-center">
                            {l.icon && (
                                <Image
                                className="w-full h-full object-cover" 
                                src={l.icon} 
                                alt={'icon'} 
                                width={64} height={64} />
                            )} 
                            {!l.icon && (
                                <FontAwesomeIcon size="xl" icon={faLink} />
                            )}
                            </div>
                            <div>
                            <input
                            onChange={ev => handleUpload(ev,l.key)} 
                            id={'icon'+l.key} 
                            type="file" 
                            className="hidden"/>
                            <label htmlFor={'icon'+l.key} className="border mt-2 p-2
                            flex items-center gap-1 rounded-md text-gray-600 cursor-pointer mb-2 justify-center">
                                <FontAwesomeIcon icon={faCloudArrowUp} />
                                <span>Change icon</span>
                            </label>
                            <button
                            onClick={() => removeLink(l.key)}
                            type="button" className="bg-gray-300 py-2 px-3 
                            mb-2 h-full flex gap-2 items-center rounded-md">
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Remove This Link</span>
                            </button>
                            </div>
                        </div>
                        <div className="grow">
                        <label className="text-xs font-bold uppercase text-gray-600">Title</label>
                        <input 
                        value={l.title}
                        onChange={ev => handleLinkChange(l.key, 'title', ev)}
                        type="text" 
                        placeholder="Add a title for your link here!" />
                        <label className="text-xs font-bold uppercase text-gray-600">Subtitle</label>
                        <input
                        value={l.subtitle}
                        onChange={ev => handleLinkChange(l.key, 'subtitle', ev)}
                        type="text" 
                        placeholder="Add a subtitle for your link here! (Optional) *ONLY 8-10 Words" />
                        <label className="text-xs font-bold uppercase text-gray-600">URL</label>
                        <input 
                        value={l.url}
                        onChange={ev => handleLinkChange(l.key, 'url', ev)}
                        type="text" 
                        placeholder="Add your link here!" />
                        </div>
                    </div>
                   ))}
                   </ReactSortable>
                </div>
                <div className="border-t pt-4 mt-4">
                    <SubmitButton className="max-w-xs mx-auto"> 
                        <FontAwesomeIcon icon={faSave}/>
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}

