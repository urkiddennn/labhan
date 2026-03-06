import React from "react";
import { Turnstile } from "@marsidev/react-turnstile";


interface TurnstileWidgetProps {
    onVerify: (token: string) => void;
    onError?: () => void;
    onExpire?: () => void;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onVerify, onError, onExpire }) => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

    if (!siteKey) {
        console.error("VITE_TURNSTILE_SITE_KEY is not defined");
        return null;
    }

    return (
        <div className="flex justify-center my-4">
            <Turnstile
                siteKey={siteKey}
                onSuccess={onVerify}
                onError={onError}
                onExpire={onExpire}
                options={{
                    theme: "light",
                }}
            />
        </div>
    );
};

export default TurnstileWidget;
