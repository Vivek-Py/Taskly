import {FC} from 'react';

interface CustomFieldDropdownProps {
  tasks: any[];
  customField: string | null;
  onCustomFieldChange: (newField: string | null) => void;
}

const CustomFieldDropdown: FC<CustomFieldDropdownProps> = ({
  tasks,
  customField,
  onCustomFieldChange
}) => {
  return (
    <div className="custom-field-dropdown flex flex-row items-center gap-2">
      <label htmlFor="customField" className="block text-sm font-medium text-gray-700 min-w-max ">
        Custom Field
      </label>
      <select
        id="customField"
        value={customField || ''}
        onChange={(e) => onCustomFieldChange(e.target.value || null)}
        className="border border-gray-300 px-2 py-1 rounded min-w-[120px] capitalize truncate"
      >
        <option value="">None</option>
        {tasks.length > 0 &&
          Object.keys(tasks.reduce((acc, task) => ({...acc, ...task}), {}))
            .filter((key) => !['id', 'title', 'priority', 'status'].includes(key))
            .map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
      </select>
    </div>
  );
};

export default CustomFieldDropdown;
