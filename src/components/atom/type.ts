import {ButtonHTMLAttributes} from 'react';

type BaseButtonProps = {
  id: string;
  label: string;
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
