import Icon from '@atomComponents/Icon';
import Pill from '@atomComponents/Pills';
import {ITaskStatus, useTaskStore} from '@store/useTaskStore';
import {useEffect, useState} from 'react';
import {getTasksCountByStatus} from './utils';

const Stats: React.FC = () => {
  const {tasks, filter, setFilter} = useTaskStore();
  const [count, setCount] = useState({
    all: 0,
    not_started: 0,
    completed: 0,
    in_progress: 0
  });

  useEffect(() => {
    const stats = getTasksCountByStatus(tasks, filter);
    setCount(stats);
  }, [tasks, filter]);

  const handleFilterClick = (filter: ITaskStatus | null) => {
    setFilter({status: filter});
  };

  return (
    <div className="flex gap-2">
      <Pill
        count={count.all}
        text="All Tasks"
        icon={<Icon name="list" />}
        active={filter.status === null}
        onClick={() => handleFilterClick(null)}
      />
      <Pill
        count={count.completed}
        text="Tasks Completed"
        icon={<Icon name="task_alt" />}
        active={filter.status === 'completed'}
        onClick={() => handleFilterClick('completed')}
      />
      <Pill
        count={count.in_progress}
        text="Tasks In-Progress"
        icon={<Icon name="hourglass_top" />}
        active={filter.status === 'in_progress'}
        onClick={() => handleFilterClick('in_progress')}
      />
      <Pill
        count={count.not_started}
        text="Tasks Not Started"
        icon={<Icon name="hourglass" />}
        active={filter.status === 'not_started'}
        onClick={() => handleFilterClick('not_started')}
      />
    </div>
  );
};

export default Stats;
