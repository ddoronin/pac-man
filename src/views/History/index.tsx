import * as React from 'react';
import styles from './styles.module.scss';
import { IRequest, RequestComposerContext } from 'src/models/request-composer';
import { useRxResult } from 'src/hooks/useRx';

export default function History() {
    const composer = React.useContext(RequestComposerContext);
    const requests = useRxResult(composer.history5) || [];
    const restore = (req: IRequest) => () => {
        composer.restore({ ...req, time: Date.now() });
    };
    return (
        <article>
            <header>
                <h2>History</h2>
            </header>
            <section>
                {requests.length === 0 && <p>No History</p>}
                {requests.length > 0 && (
                    <>
                        <ul className={styles.list}>
                            {requests.map(req => (
                                <li key={req.time} className={styles.listItem}>
                                    <h2>{req.uri}</h2>
                                    <pre>{JSON.stringify(req, null, '  ')}</pre>
                                    <button onClick={restore(req)}>Restore</button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </section>
        </article>
    );
}
