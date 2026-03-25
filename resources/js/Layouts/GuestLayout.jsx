import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] p-6 selection:bg-indigo-50">
            <div className="w-full sm:max-w-[440px]">
                {children}
            </div>
        </div>
    );
}
