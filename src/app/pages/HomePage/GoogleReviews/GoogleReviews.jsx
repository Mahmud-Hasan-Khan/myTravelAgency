"use client"
import SectionTitle from '@/app/components/SectionTitle/SectionTitle';
import React, { useEffect } from 'react';

const GoogleReviews = () => {
    useEffect(() => {
        const existingScript = document.querySelector(
            'script[src="https://static.elfsight.com/platform/platform.js"]'
        );
        if (existingScript) return; // Prevent loading the script multiple times

        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js"; // ✅ CORRECTED
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <SectionTitle heading='What Our Customers Say' subheading='Hear Directly from Our Happy Clients'></SectionTitle>
            <div className="elfsight-app-988aa58e-51ae-41c8-807a-d5a716d7faa2" data-elfsight-app-lazy></div>
        </div>
    );
};

export default GoogleReviews;