import { create } from 'zustand';

type SignUpModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSignUpModal = create<SignUpModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
