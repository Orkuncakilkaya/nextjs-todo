import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type {AppProps} from 'next/app';
import {supabase} from '../utils/init-supabase';
import {Auth} from '@supabase/ui';

function TodoApp({Component, pageProps}: AppProps) {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Component {...pageProps} />
        </Auth.UserContextProvider>
    );
}

export default TodoApp;
