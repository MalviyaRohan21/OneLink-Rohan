'use client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import { signIn } from 'next-auth/react';

export default function LoginwithGoogle(){

    return(
        <button 
            onClick={() => signIn('google', { callbackUrl: '/account' })}
            className="bg-blue-500 text-white text-center w-full py-4
            flex gap-2 items-center justify-center">
                <FontAwesomeIcon icon={ faGoogle } className="h-6"/> 
            <span>Sign In with Google</span>
            </button>
    );


}
