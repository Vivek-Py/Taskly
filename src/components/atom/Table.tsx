import {ITask} from '@store/useTaskStore';

const headingCellStyle = 'border border-gray-300 px-4 py-2 text-left';
const dataCellStyle = 'border border-gray-300 px-4 py-2';

const Table = ({data}: {data: ITask[]}) => {
  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr>
          <th className={headingCellStyle}>Title</th>
          <th className={headingCellStyle}>Priority</th>
          <th className={headingCellStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((task) => (
          <tr key={task.id}>
            <td className={dataCellStyle}>{task.title}</td>
            <td className={dataCellStyle}>{task.priority}</td>
            <td className={dataCellStyle}>{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
