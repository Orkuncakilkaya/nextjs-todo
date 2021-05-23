import {User} from '@supabase/gotrue-js';
import {useRouter} from 'next/router';
import {useCallback, useState} from 'react';
import {supabase} from '../../utils/init-supabase';
import classNames from 'classnames';

interface Props {
    user?: User;
}

export const DefaultLayout = ({children, user}: React.PropsWithChildren<Props>) => {
    const router = useRouter();
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

    const handleLogout = useCallback(async () => {
        setLogoutLoading(true);
        await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'same-origin',
            body: JSON.stringify({event: 'SIGNED_OUT'}),
        }).then((res) => res.json());
        await supabase.auth.signOut();
        await router.push('/auth/login');
    }, []);

    return (
        <div className="flex flex-col justify-start items-start flex-1 w-full h-full">
            {user && (
                <header className="flex flex-row justify-between items-center self-start w-full bg-gray-200 mb-2 p-2">
                    <span>Hoşgeldin {user.email}</span>
                    <button type="button" onClick={handleLogout} className={classNames('btn', 'btn-red', 'btn-sm')}
                            disabled={logoutLoading}>
                        Çıkış
                    </button>
                </header>
            )}
            <main className="flex-1 min-h-full min-w-full">
                {children}
            </main>
        </div>
    );
};
