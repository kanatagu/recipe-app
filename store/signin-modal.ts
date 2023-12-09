import { create } from 'zustand';

type SignInModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSignInModal = create<SignInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
