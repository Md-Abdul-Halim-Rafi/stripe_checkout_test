import React, { useState } from "react";
import Link from "next/link";

import { plans } from "../utils/consts";

import styles from "../styles/ChoosenPlan.module.scss";
import axios from "../utils/axiosInstance";

export default function ChoosenPlan({ plan }) {

    const [loading, setLoading] = useState(false);

    const subscribe = async () => {

        setLoading(true);

        try {

            const { data } = await axios.post(
                "/stripe/checkout-sessions", null
            );

            console.log(data);
            return window.open(data.url, "_self");
            
        } catch (err) {
            
            console.error(err);
        }

        setLoading(false);
    }

    return (
        <div className={styles.root}>
            <a className="button-outline" href="/">{"← Back"}</a>

            <h1 className={styles.root__title}>
                You have chosen <span>{plan.name}</span> plan for 
                <span> ${plan.price}/mo</span>
            </h1>
            <div className="row-div">
                <button className="button">
                    <Link
                        href={{
                            pathname: `/${plan.id}/checkout`,
                            query: { payment_method: "stripe" }
                        }}
                    >
                        Local Payment
                    </Link>
                </button>
                <button 
                    className="button" 
                    disabled={loading}
                    onClick={subscribe}
                >
                    {loading ? "Processing..." : "International Payment"}
                </button>
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
