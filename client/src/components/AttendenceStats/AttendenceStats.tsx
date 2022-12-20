import { useState } from 'react';
import dayjs from 'dayjs';
import { createStyles, UnstyledButton, Text, Paper, Group, useMantineTheme } from '@mantine/core';
import { IconSwimming, IconBike, IconRun, IconChevronDown, IconChevronUp } from '@tabler/icons';
import { data } from './AttendenceData';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: 'flex',
    marginBottom: 30,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.lg,
    color: theme.colors[theme.primaryColor][6],
  },

  stat: {
    minWidth: 98,
    paddingTop: theme.spacing.xl,
    minHeight: 140,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing.xl,
  },
  present: {
    backgroundColor: theme.colors.teal[1],
  },
  absent: {
    backgroundColor: theme.colors.red[1],
  },
  holiday: {
    backgroundColor: theme.colors.indigo[1],
  },

  label: {
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.xl,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors.gray[6],
    lineHeight: 1.2,
  },

  value: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
    color: theme.black,
  },

  count: {
    color: theme.colors.gray[6],
  },

  month: {
    fontSize: 44,
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    lineHeight: 1,
    textAlign: 'center',
    marginBottom: 5,
    width: 100,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing.xl * 2,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
      marginBottom: theme.spacing.xl,
    },
  },

  date: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  control: {
    height: 28,
    width: '100%',
    color: theme.colors[theme.primaryColor][2],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    transition: 'background-color 50ms ease',

    [theme.fn.smallerThan('xs')]: {
      height: 34,
      width: 34,
    },

    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan('xs')]: {
      transform: 'rotate(-90deg)',
    },
  },
}));

const AttendenceStats = () => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [date, setDate] = useState(new Date(2021, 9, 24));
  let month = dayjs(date).format('MMMM').substring(0, 3);

  const stats = (month: String) => {
    const stat = data.filter((item) => item.month === month);
    const monthData = stat[0];
    console.log(stat[0]);
    return (
      <>
        <Paper className={cx(classes.stat, classes.present)} radius="md" shadow="md">
          <Text className={classes.label}>Present</Text>
          <Text size="xs" className={classes.count}>
            <span className={classes.value}>{monthData.present}</span>
          </Text>
        </Paper>
        <Paper className={cx(classes.stat, classes.absent)} radius="md" shadow="md">
          <Text className={classes.label}>Absent</Text>
          <Text size="xs" className={classes.count}>
            <span className={classes.value}>{monthData.absent}</span>
          </Text>
        </Paper>{' '}
        <Paper className={cx(classes.stat, classes.holiday)} radius="md" shadow="md">
          <Text className={classes.label}>Holidays</Text>
          <Text size="xs" className={classes.count}>
            <span className={classes.value}>{monthData.holidays}</span>
          </Text>
        </Paper>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).add(1, 'month').toDate())}
        >
          <IconChevronUp className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>

        <div className={classes.date}>
          <Text className={classes.month}>{month}</Text>
        </div>

        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'month').toDate())}
        >
          <IconChevronDown className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>
      </div>
      <Group sx={{ flex: 1 }}>{stats(month)}</Group>
    </div>
  );
};
export default AttendenceStats;
