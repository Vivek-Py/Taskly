import {ButtonHTMLAttributes, HTMLAttributes, ReactNode} from 'react';

type BaseButtonProps = {
  id: string;
  label: string;
  icon?: ReactNode;
  btnType?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'icon-with-text';
} & ButtonHTMLAttributes<HTMLButtonElement>;

type SubmitButtonProps = BaseButtonProps & {
  type: 'submit';
  onClick?: () => void;
};

type NonSubmitButtonProps = BaseButtonProps & {
  type?: Exclude<ButtonHTMLAttributes<HTMLButtonElement>['type'], 'submit'>;
  onClick: () => void;
};

export type ButtonProps = SubmitButtonProps | NonSubmitButtonProps;

export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactNode;
};

export interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export interface PillProps {
  count: number;
  text: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextProps {
  addToast: (message: string, type: ToastType, icon?: ReactNode) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}

export type IconProps = {
  name: string;
} & HTMLAttributes<HTMLSpanElement>;

export interface IButtonTypes {
  [key: string]: string;
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}
