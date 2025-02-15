import {ButtonProps} from './type';

const Button = ({id, onClick, label, ...rest}: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      aria-label={label}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-4"
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
