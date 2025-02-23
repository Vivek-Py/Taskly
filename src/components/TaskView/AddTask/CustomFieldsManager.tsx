import {useState} from 'react';
import {useTaskStore} from '@store/useTaskStore';
import Button from '@atomComponents/Button';

const CustomFieldsManager: React.FC = () => {
  const {customFields, addCustomField, removeCustomField} = useTaskStore();
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text');

  const handleAddField = () => {
    if (!fieldName.trim()) return;
    addCustomField({name: fieldName, type: fieldType, label: fieldName});
    setFieldName('');
    setFieldType('text');
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Manage Custom Fields</h3>
      <div className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Field name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
          <Button
            id="add-field"
            label="Add Field"
            className="min-w-max"
            onClick={handleAddField}
            btnType="primary"
          />
        </div>
        <ul className="space-y-2">
          {customFields.map((field) => (
            <li key={field.name} className="flex justify-between items-center">
              <span>{field.label}</span>
              <Button
                id="remove-field"
                label="Remove"
                onClick={() => removeCustomField(field.name)}
                btnType="secondary"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomFieldsManager;
