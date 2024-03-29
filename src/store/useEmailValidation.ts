import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmailValidation {
    emailValidation: boolean;
    setEmailValidation: () => void;
    resetEmailValidation: () => void;
}


const useEmailValidation = create(
    persist<EmailValidation>(
        (set) => ({
            emailValidation: false,
            setEmailValidation: () => {
                set({ emailValidation: true });
            },
            resetEmailValidation: () => {
                set({ emailValidation: false });
            },
        }),
        {
            name: 'emailValidation',
        }
    )
);
export default useEmailValidation;

