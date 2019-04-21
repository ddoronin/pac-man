import * as React from 'react';
import styles from './styles.module.scss';
import { IRequest } from 'src/models/request-composer';
import { IHttp } from 'src/hooks/useRx';

const print = (o: any) => JSON.stringify(o, null, '  ');

export interface IResponseProps {
    data: IHttp<IRequest, {}>;
}

export default function Response({ data }: IResponseProps) {
    const { status, res, error } = data;
    return (
        <>
            <h4>Response</h4>
            {status === 'PENDING' && 'Loading...'}
            {status === 'SUCCEEDED' && (
                <pre className={styles.response}>
                    <div className={styles.success}>{print(res)}</div>
                </pre>
            )}
            {status === 'FAILED' && (
                <pre className={styles.response}>
                    <div key="error" className={styles.error}>
                        {print(error)}
                    </div>
                </pre>
            )}
        </>
    );
}
