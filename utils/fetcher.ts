export const postApi = <T>(url: string, body: any): Promise<T> => fetch(url, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    credentials: 'same-origin',
    body: JSON.stringify(body),
}).then(res => res.json());

export const getApi = <T>(url: string): Promise<T> => fetch(url, {
    method: 'GET',
    headers: new Headers({'Content-Type': 'application/json'}),
}).then(res => res.json());
