const Table = ({ data }: { data: any[] }) => {
  console.log(data);
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Title</th>
          <th>Priority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
