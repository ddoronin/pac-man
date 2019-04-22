import * as React from 'react';
import Headers from './headers';
import Response from './response';
import { RequestComposerContext } from 'src/models/request-composer';
import { useRxHttp, useRxEffect } from 'src/hooks/useRx';
import { obj2arr, arr2obj } from 'src/utils/array-object';

const change = (setState: (s: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
};

const initialUri = 'https://api.github.com/users';
const initialHeaders: Array<[string, string]> = [['Authorization', 'bearer 0ff46177ef2fb3444d3bf398105e0f0216bda109']];

export default function Requestor() {
    const composer = React.useContext(RequestComposerContext);

    const [uri, setUri] = React.useState(initialUri);
    const [headers, setHeaders] = React.useState(initialHeaders);

    useRxEffect(composer.request, req => {
        setUri(req.uri);
        setHeaders(obj2arr(req.headers));
    });

    const [response, submitRequest] = useRxHttp(composer.submit);
    const submit = () =>
        submitRequest({
            uri,
            headers: arr2obj(headers),
            time: Date.now()
        });

    return (
        <article>
            <header>
                <h2>Requestor</h2>
            </header>
            <section>
                <div>
                    <p>Request</p>
                    <div>
                        <label>Uri: </label>
                        <input type="text" value={uri} onChange={change(setUri)} />
                    </div>
                    <div>
                        <label>Headers: </label>
                        <Headers headers={headers} onChange={setHeaders} />
                    </div>
                    <button onClick={submit}>Submit</button>
                    {response && <Response data={response} />}
                </div>
            </section>
        </article>
    );
}
