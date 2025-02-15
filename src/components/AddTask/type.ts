export type TAddTaskProps = {isOpen: boolean; onClose: () => void};

export type TFormData = {
  title: string;
  priority: string;
  status: string;
};

export type TOnChangeHandler = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type TFormEvent = React.FormEvent<HTMLFormElement>;
