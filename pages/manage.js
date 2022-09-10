import React from "react";

import styles from "../styles/Manage.module.scss";

export default function ManagePage(props) {

    return (
        <div className="container-wrapper">
            <div className="container">
                <div className={styles.Manage}>
                    <h1>Billing</h1>
                    <div className={styles.Manage__card}>
                        <p>Current Monthly Bill</p>
                        <h2>$100</h2>
                        <a>Switch to yearly billing</a>
                    </div>
                    <div className={styles.Manage__extra}>
                        <button>Add-ons</button>
                        <button>Upgrade</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
