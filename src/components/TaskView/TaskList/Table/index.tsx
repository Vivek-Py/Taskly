import {motion} from 'framer-motion';
import Icon from '@atomComponents/Icon';
import {useState, useEffect} from 'react';
import {ITask, useTaskStore} from '@store/useTaskStore';
import Pagination from '@components/atom/Pagination';
import PriorityDropdown from './PriorityDropdown';
import StatusDropdown from './StatusDropdown';

const headingCellStyle = 'border border-gray-300 px-4 py-2 text-left bg-gray-100';
const dataCellStyle = 'border border-gray-300 px-4 py-2';

const Table = ({data, customField}: {data: ITask[]; customField: string | null}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'initial'>('initial');
  const {setSelectedTask} = useTaskStore();

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleSort = () => {
    setSortOrder((prevOrder) => {
      if (prevOrder === 'asc') return 'desc';
      if (prevOrder === 'desc') return 'initial';
      return 'asc';
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'desc') {
      return b.title.localeCompare(a.title);
    } else {
      return 0;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <table className="table-fixed border-collapse w-full">
        <colgroup>
          <col className="w-2/5" />
          <col className="w-1/5" />
          <col className="w-1/5" />
          {customField && <col className="w-1/5" />}
        </colgroup>
        <thead>
          <tr>
            <th className={headingCellStyle}>
              <div
                className="flex flex-row gap-2 justify-between items-center cursor-pointer select-none"
                onClick={handleSort}
              >
                <div className="flex flex-row gap-2 items-center">
                  <Icon name="edit_note" />
                  Task Name
                </div>
                <Icon
                  name={
                    sortOrder === 'asc'
                      ? 'arrow_upward'
                      : sortOrder === 'desc'
                      ? 'arrow_downward'
                      : 'reorder'
                  }
                />
              </div>
            </th>
            <th className={headingCellStyle}>
              <div className="relative select-none">
                <PriorityDropdown />
              </div>
            </th>
            <th className={headingCellStyle}>
              <div className="relative select-none">
                <StatusDropdown />
              </div>
            </th>
            {customField && (
              <th className={headingCellStyle}>
                <div className="flex flex-row gap-2 items-center capitalize select-none cursor-pointer">
                  <Icon name="dashboard_customize" />
                  {customField}
                </div>
              </th>
            )}
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
                onClick={() => {
                  console.log('Task clicked:', task.id, task.title);
                  setSelectedTask(task.id);
                }}
              >
                <td className={`${dataCellStyle} truncate`}>
                  <div className="truncate" title={task.title}>
                    {task.title}
                  </div>
                </td>
                <td className={dataCellStyle}>{task.priority}</td>
                <td className={dataCellStyle}>{task.status}</td>
                {customField && (
                  <td className={dataCellStyle + ' truncate'}>{task[customField]}</td>
                )}
              </motion.tr>
            ))
          ) : (
            <tr className="h-12">
              <td className={dataCellStyle} colSpan={customField ? 4 : 3}>
                No tasks were found.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="h-12">
            <td className={dataCellStyle} colSpan={customField ? 4 : 3}>
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
    </>
  );
};

export default Table;
