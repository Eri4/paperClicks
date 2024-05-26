import React from 'react';
import UserForm from './UserForm';
import { User } from "../types/validationSchema";
import { FaTimes } from 'react-icons/fa';

interface UserModalProps {
    onClose: () => void;
    onSubmit: (data: User) => void;
    initialValues?: User;
}

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit, initialValues }) => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {initialValues ? 'Edit User Info' : 'New User Info'}
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <FaTimes className="h-6 w-6" />
                                    </button>
                                </div>
                                <UserForm onSubmit={onSubmit} initialValues={initialValues} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;