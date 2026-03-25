import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
    HiOutlineTrash, 
    HiOutlineExclamationCircle, 
    HiOutlineInformationCircle,
    HiOutlineXMark,
    HiOutlineCheckCircle
} from 'react-icons/hi2';

/**
 * Custom Confirmation Dialog (Tengah Layar)
 */

const ConfirmDialog = ({ message, title, confirmText, cancelText, type, onConfirm, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <div 
            className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
        >
            <div 
                className={`bg-white border border-gray-100 rounded-[32px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] p-8 flex flex-col gap-8 max-w-sm w-full mx-auto transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center text-center gap-5">
                    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-lg ${
                        type === 'danger' ? 'bg-red-50 text-red-500 shadow-red-500/10' : 
                        type === 'warning' ? 'bg-amber-50 text-amber-500 shadow-amber-500/10' : 
                        'bg-emerald-50 text-emerald-500 shadow-emerald-500/10'
                    }`}>
                        {type === 'danger' ? <HiOutlineTrash className="w-8 h-8" /> : 
                         type === 'warning' ? <HiOutlineExclamationCircle className="w-8 h-8" /> : 
                         <HiOutlineInformationCircle className="w-8 h-8" />}
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed">{message}</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={handleClose} 
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-2xl transition-all"
                    >
                        <HiOutlineXMark className="w-4 h-4" />
                        <span>{cancelText}</span>
                    </button>
                    <button 
                        onClick={handleConfirm} 
                        className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white rounded-2xl shadow-xl transition-all active:scale-95 ${
                            type === 'danger' ? 'bg-red-500 shadow-red-500/25 hover:bg-red-600' : 
                            type === 'warning' ? 'bg-amber-500 shadow-amber-500/25 hover:bg-amber-600' : 
                            'bg-emerald-500 shadow-emerald-500/25 hover:bg-emerald-600'
                        }`}
                    >
                        <HiOutlineCheckCircle className="w-4 h-4" />
                        <span>{confirmText}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const confirmAction = (message, onConfirm, options = {}) => {
    const { 
        title = "Konfirmasi Tindakan", 
        confirmText = "Ya, Lanjutkan", 
        cancelText = "Batal",
        type = "danger"
    } = options;

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const remove = () => {
        root.unmount();
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    };

    root.render(
        <ConfirmDialog 
            message={message}
            title={title}
            confirmText={confirmText}
            cancelText={cancelText}
            type={type}
            onConfirm={onConfirm}
            onClose={remove}
        />
    );
};
