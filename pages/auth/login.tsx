import {supabase} from '../../utils/init-supabase';
import {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {DefaultLayout} from '../../components/layouts/default.layout';
import classNames from 'classnames';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        supabase.auth.refreshSession().then(({data, error}) => {
            if (data && !error) {
                supabase.auth.setAuth(data.access_token);
                supabase.auth.setSession(data.refresh_token ?? '').finally(() => {
                    fetch('/api/auth', {
                        method: 'POST',
                        headers: new Headers({'Content-Type': 'application/json'}),
                        credentials: 'same-origin',
                        body: JSON.stringify({session: data, event: 'SIGNED_IN'}),
                    }).then((res) => res.json()).finally(() => {
                        router.push('/').finally(() => setLoading(false));
                    });
                });
            } else {
                setLoading(false);
            }
        }).catch(() => setLoading(false));
    }, []);

    const handleSubmit = useCallback(async (ev: React.FormEvent) => {
        ev.preventDefault();
        setLoading(true);
        const {data: session, error} = await supabase.auth.api.signInWithEmail(username, password);
        if (session && !error) {
            await supabase.auth.setAuth(session.access_token);
            if (session.refresh_token) {
                await supabase.auth.setSession(session.refresh_token);
            }
            await fetch('/api/auth', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'same-origin',
                body: JSON.stringify({session, event: 'SIGNED_IN'}),
            }).then((res) => res.json());
            await router.push('/');
            setLoading(false);
        }
        if (error) {
            setLoading(false);
        }
    }, [username, password]);

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}
                  className="form-layout-vertical bg-white shadow-xl rounded p-5 mt-2 w-6/12 mx-auto border border-gray-300">
                <label className={classNames('form-row')}>
                    <span>Kullanıcı</span>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)}/>
                </label>
                <label className={classNames('form-row')}>
                    <span>Parola</span>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <button type="submit" className={classNames('btn', 'btn-indigo')} disabled={loading}>Giriş</button>
                <Link href="/auth/register">
                    <a className={classNames('link')}>Kayıt ol</a>
                </Link>
            </form>
        </DefaultLayout>
    );
};

export default Login;
