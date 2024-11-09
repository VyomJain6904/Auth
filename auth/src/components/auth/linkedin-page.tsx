"use client";
import React, { useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';

const LinkedInBadge = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://platform.linkedin.com/badges/js/profile.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="group fixed top-4 right-4 z-50">
            {/* LinkedIn Icon */}
            <FaLinkedin className="text-blue-600 text-3xl cursor-pointer transition-opacity duration-300 group-hover:opacity-0" />

            {/* LinkedIn Badge */}
            <div
                className="hidden group-hover:flex badge-base LI-profile-badge absolute top-0 right-0 z-50 bg-transparent p-2 rounded-lg shadow-lg transition-opacity duration-300"
                data-locale="en_US"
                data-size="medium"
                data-theme="dark"
                data-type="HORIZONTAL"
                data-vanity="vyom-jain"
                data-version="v1"
            >
                <a
                    className="badge-base__link LI-simple-link"
                    href="https://in.linkedin.com/in/vyom-jain?trk=profile-badge"
                >
                    LinkedIn Profile : 
                </a>
            </div>
        </div>
    );
};

export default LinkedInBadge;
