import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { plans } from "../../utils/consts";

import styles from "../../styles/Checkout.module.scss";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

export default function Checkout({ plan }) {

    return (
        <div className={styles.Checkout}>
            <Elements 
                stripe={stripePromise} 
                options={{ 
                    clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
                }}
            >
                <CheckoutForm />
            </Elements>
        </div>
    );
}

export async function getServerSideProps(context) {

    const { plan_id, payment_method } = context.query;

    const plan = plans.find(plan => plan.id === parseInt(plan_id));

    if (!plan) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            plan,
            payment_method
        }
    };
}
