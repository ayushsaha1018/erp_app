import { createStyles } from '@mantine/core';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data } from '../AttendenceStats/AttendenceData';

const useStyles = createStyles((theme) => ({
  main: {
    width: 800,
    // 'overflow-x': 'scroll',
  },
}));

const AttendenceChart = () => {
  const { classes } = useStyles();
  return (
    <BarChart
      // class
      // layout="vertical"
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
      <XAxis dataKey="month" stroke="#008080" />
      <YAxis stroke="#008080" />
      <Tooltip />
      <Legend />
      <Bar radius={5} dataKey="present" fill="#fa5252" />
      <Bar radius={5} dataKey="absent" fill="#40c057" />
    </BarChart>
  );
};

export default AttendenceChart;
