import { Box, Button, Container, createStyles, Group, Text, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    cursor: 'pointer',
  },
  main: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    width: 500,
    margin: 'auto',
    marginTop: 100,
    textAlign: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    // padding: 'xl',
  },
  mainSettings: {},
}));

const Settings = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <Box className={classes.main}>
      <Text color="dimmed" align="left" mt={10} mb={50}>
        Settings
      </Text>

      {/* <Group position="apart" align="center"> */}
      <Box className={classes.mainSettings} ml={20}>
        <Button variant="default" fullWidth gradient={{ from: 'teal', to: 'lime', deg: 105 }} m={10}>
          Change Password
        </Button>
        <Button variant="default" fullWidth gradient={{ from: 'orange', to: 'red' }} m={10}>
          Change Moblie Number
        </Button>
      </Box>
      {/* </Group> */}
    </Box>
  );
};
export default Settings;
