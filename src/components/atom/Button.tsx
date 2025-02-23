import {ButtonProps, IButtonTypes} from './type';

const buttonTypes: IButtonTypes = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-400 hover:bg-gray-500 text-white',
  tertiary: 'bg-gray-100 hover:bg-gray-200 text-black rounded-lg'
};

const Button = ({
  id,
  onClick,
  label,
  icon,
  className,
  btnType = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      aria-label={label}
      className={`px-4 py-2 rounded flex flex-row gap-1 ${buttonTypes[btnType]} ${className} items-center gap-2`}
      {...rest}
    >
      {btnType !== 'icon' && label}
      {icon ? icon : null}
    </button>
  );
};

export default Button;
