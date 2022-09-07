import React from "react";
import Link from "next/link";

import { plans } from "../utils/consts";

import styles from "../styles/ChoosenPlan.module.scss";

export default function ChoosenPlan({ plan }) {

    return (
        <div className={styles.root}>
            <a className="button-outline" href="/">{"← Back"}</a>

            <h1 className={styles.root__title}>
                You have chosen <span>{plan.name}</span> plan for 
                <span> ${plan.price}/mo</span>
            </h1>
            <div className="row-div">
                <div className="button">
                    <Link
                        href={{
                            pathname: `/${plan.id}/checkout`,
                            query: { payment_method: "stripe" }
                        }}
                    >
                        Local Payment
                    </Link>
                </div>
                <div className="button">
                    <Link
                        href={{
                            pathname: `/${plan.id}/checkout`,
                            query: { payment_method: "stripe" }
                        }}
                    >
                        International Payment
                    </Link>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {

    const { plan_id } = context.query;

    const plan = plans.find(plan => plan.id === parseInt(plan_id));

    if (!plan) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            plan
        }
    };
}
