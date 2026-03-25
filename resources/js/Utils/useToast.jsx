import toast from 'react-hot-toast';
import React from 'react';
import { 
    HiOutlineCheckCircle, 
    HiOutlineExclamationCircle, 
    HiOutlineXMark 
} from 'react-icons/hi2';

/**
 * Notifikasi Toast (Pojok Kanan Atas)
 */

export const notifySuccess = (message) => {
    toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex items-center gap-3 bg-white border border-emerald-50 rounded-2xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.1)] p-4 pr-6 min-w-[320px]`}>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                <HiOutlineCheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 leading-tight">Berhasil!</p>
                <p className="text-xs text-gray-500 font-medium">{message}</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="text-gray-300 hover:text-gray-400 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                <HiOutlineXMark className="w-4 h-4" />
            </button>
        </div>
    ), { duration: 4000, position: 'top-right' });
};

export const notifyError = (message) => {
    toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex items-center gap-3 bg-white border border-red-50 rounded-2xl shadow-[0_10px_40px_-10px_rgba(239,68,68,0.1)] p-4 pr-6 min-w-[320px]`}>
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                <HiOutlineExclamationCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 leading-tight">Kesalahan!</p>
                <p className="text-xs text-gray-500 font-medium">{message}</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="text-gray-300 hover:text-gray-400 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                <HiOutlineXMark className="w-4 h-4" />
            </button>
        </div>
    ), { duration: 5000, position: 'top-right' });
};
