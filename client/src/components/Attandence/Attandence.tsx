import { Container, RingProgress, Text } from '@mantine/core';

const Attandence = () => {
  return (
    <Container
      // size= "xs"
      p={20}
      sx={(theme) => ({
        width: 'fit-content',
        boxShadow: theme.shadows.md,
      })}
    >
      <RingProgress
        size={200}
        thickness={20}
        roundCaps
        label={
          <Text size="xs" fw={500} color="dimmed">
            Overall Progress
          </Text>
        }
        sections={[
          //   { value: 60, color: 'cyan' },
          {
            value: 25,
            color: 'grape',
            tooltip: 'Attendence: 25% ',
          },
          { value: 15, color: 'orange', tooltip: 'Absent:15%' },
        ]}
      />
    </Container>
  );
};
export default Attandence;
