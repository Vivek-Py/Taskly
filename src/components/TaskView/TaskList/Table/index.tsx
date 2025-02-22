import {motion} from 'framer-motion';
import Icon from '@atomComponents/Icon';
import {useState, useEffect} from 'react';
import {ITask, useTaskStore} from '@store/useTaskStore';
import Pagination from '@components/atom/Pagination';

import PriorityDropdown from './PriorityDropdown';
import StatusDropdown from './StatusDropdown';

const headingCellStyle = 'border border-gray-300 px-4 py-2 text-left bg-gray-100';
const dataCellStyle = 'border border-gray-300 px-4 py-2';

const Table = ({data}: {data: ITask[]}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const {setSelectedTask} = useTaskStore();

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <table className="table-fixed border-collapse w-full">
      <colgroup>
        <col className="w-2/5" />
        <col className="w-1/5" />
        <col className="w-1/5" />
      </colgroup>
      <thead>
        <tr>
          <th className={headingCellStyle}>
            <div className="flex flex-row gap-2 items-center">
              <Icon name="edit_note" />
              Task Name
            </div>
          </th>
          <th className={headingCellStyle}>
            <div className="relative">
              <PriorityDropdown />
            </div>
          </th>
          <th className={headingCellStyle}>
            <div className="relative">
              <StatusDropdown />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.length > 0 ? (
          paginatedData.map((task) => (
            <motion.tr
              key={task.id}
              className="h-12 rounded-none hover:bg-gray-200 cursor-pointer"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={() => setSelectedTask(task.id)}
            >
              <td className={`${dataCellStyle} truncate`}>
                <div className="truncate" title={task.title}>
                  {task.title}
                </div>
              </td>
              <td className={dataCellStyle}>{task.priority}</td>
              <td className={dataCellStyle}>{task.status}</td>
            </motion.tr>
          ))
        ) : (
          <tr className="h-12">
            <td className={dataCellStyle} colSpan={3}>
              No tasks were found.
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr className="h-12">
          <td className={dataCellStyle} colSpan={3}>
            <Pagination
              currentPage={currentPage}
              totalItems={data.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              setItemsPerPage={setItemsPerPage}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
