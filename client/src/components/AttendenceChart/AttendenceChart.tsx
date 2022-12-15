import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data } from './AttendenceData';

const AttendenceChart = () => {
  const tooltipContent = ({ active, payload }: any) => {
    if (!active) return null;
    console.log(payload[0].payload);
  };

  return (
    <BarChart
      width={800}
      height={500}
      data={data}
      margin={{
        top: 5,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="6 6" />
      <XAxis dataKey="name" stroke="#008080" />
      <YAxis stroke="#008080" />
      <Tooltip content={tooltipContent} />
      <Legend />
      <Bar radius={5} dataKey="Present" fill="#fa5252" />
      <Bar radius={5} dataKey="Absent" fill="#40c057" />
    </BarChart>
  );
};

export default AttendenceChart;
