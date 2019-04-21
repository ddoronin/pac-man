import * as React from 'react';
import History from './history';
import Requestor from './requestor';
import 'src/styles/theme.scss';
import styles from './styles.module.scss';

export default () => (
    <article className={styles.app}>
        <section className={styles.layout}>
            <div className={styles.history}>
                <History />
            </div>
            <div className={styles.requestor}>
                <Requestor />
            </div>
        </section>
    </article>
);
