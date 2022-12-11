import { TextInput, Checkbox, Button, Group, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const AddTeacher = () => {
  const form = useForm({
    initialValues: {
      teacherName: '',
      teacherRollNo: '',
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
          withAsterisk
          label="Teacher Name"
          placeholder="lalit"
          {...form.getInputProps("teacherName")}
        />

        <NumberInput
          withAsterisk
          label="Teacher Roll No"
          placeholder="123456"
          {...form.getInputProps("teacherRollNo")}
        />


        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default AddTeacher