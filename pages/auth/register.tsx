import {useCallback, useState} from 'react';
import {supabase} from '../../utils/init-supabase';
import Link from 'next/link';
import {DefaultLayout} from '../../components/layouts/default.layout';
import classNames from 'classnames';

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = useCallback(async (ev: React.FormEvent) => {
        ev.preventDefault();
        const {data: user, error} = await supabase.auth.api.signUpWithEmail(email, password);
    }, [email, password]);

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}
                  className="form-layout-vertical bg-white shadow-xl rounded p-5 mt-2 w-6/12 mx-auto border border-gray-300">
                <label className={classNames('form-row')}>
                    <span>E-Posta</span>
                    <input type="email" name="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label className={classNames('form-row')}>
                    <span>Parola</span>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <button type="submit" className={classNames('btn', 'btn-indigo')}>Kayıt Ol</button>
                <Link href="/auth/login">
                    <a className={classNames('link')}>Giriş Yap</a>
                </Link>
            </form>
        </DefaultLayout>
    );
};

export default Register;
