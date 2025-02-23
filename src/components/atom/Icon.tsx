import {FC} from 'react';
import {IconProps} from './type';

const Icon: FC<IconProps> = ({name, className, ...rest}) => {
  return (
    <span className={'material-symbols-outlined ' + className} {...rest}>
      {name}
    </span>
  );
};

export default Icon;
