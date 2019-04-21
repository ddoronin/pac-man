import * as React from 'react';
import Headers from './headers';
import Response from './response';
import { RequestComposerContext } from 'src/models/request-composer';
import { useRxHttp, useRxEffect } from 'src/hooks/useRx';

function jsonHeaders(arr: Array<[string, string]>) {
    return arr.reduce((acc, [key, val]) => {
        if (key !== '') {
            acc[key] = val;
        }
        return acc;
    }, {});
}

function jsonToArray(json: { [k: string]: string }): Array<[string, string]> {
    return Object.keys(json).map(key => [key, json[key]] as [string, string]);
}

const change = (setState: (s: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
};

export default function Requestor() {
    const composer = React.useContext(RequestComposerContext);

    const [uri, setUri] = React.useState('https://api.github.com/users');
    const [headers, setHeaders] = React.useState<Array<[string, string]>>([
        ['Authorization', 'bearer 0ff46177ef2fb3444d3bf398105e0f0216bda109']
    ]);
    useRxEffect(composer.request, {
        next: req => {
            req.map(_ => setUri(_.uri));
            req.map(_ => setHeaders(jsonToArray(_.headers)));
        }
    });

    const [response, submitRequest] = useRxHttp(composer.submit);
    const submit = () =>
        submitRequest({
            uri,
            headers: jsonHeaders(headers),
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
