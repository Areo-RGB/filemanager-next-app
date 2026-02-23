import React from "react";

export function IconCoordination(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            {/* Three connected points representing agility and balance */}
            <circle cx="12" cy="6" r="2" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />

            {/* Connecting lines for coordination concept */}
            <path d="M10.5 7.5l-3 9" strokeDasharray="2 2" />
            <path d="M13.5 7.5l3 9" strokeDasharray="2 2" />
            <path d="M8 18h8" strokeDasharray="2 2" />

            {/* Central balance element */}
            <path d="M12 10v4" />
            <path d="M10 14h4" />
        </svg>
    );
}
