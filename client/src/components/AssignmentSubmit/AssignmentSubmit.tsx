import { useState } from 'react';
import {
  Modal,
  Button,
  Group,
  Container,
  Box,
  Input,
  TextInput,
  Divider,
  createStyles,
  FileInput,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  dropzone: {
    // margin: '10 0',
    // padding: '50px 0',
    // height:'100px'
  },
}));

const AssignmentSubmit = ({ data, setClose }: any) => {
  const { classes } = useStyles();
  // console.log(data);
  const [opened, setOpened] = useState(false);

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          setClose();
        }}
      >
        <TextInput placeholder="Paste drive link here" />
        <Divider label="or" labelPosition="center" mt={5} mb={5} />
        <FileInput className={classes.dropzone} mt={20} mb={20} placeholder="Pick file" size="xl" withAsterisk />
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};
export default AssignmentSubmit;
