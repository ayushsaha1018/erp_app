import { Container, RingProgress, Text } from '@mantine/core';
import AttendenceChart from '../AttendenceChart/AttendenceChart';
import AttendenceStats from '../AttendenceStats/AttendenceStats';

const Attandence = () => {
  return (
    <Container
      // p={20}
      sx={(theme) => ({
        width: '100%',
        boxShadow: theme.shadows.md,
        // 'overflow-x': 'scroll',
      })}
    >
      <AttendenceStats />
      <AttendenceChart />
    </Container>
  );
};
export default Attandence;
