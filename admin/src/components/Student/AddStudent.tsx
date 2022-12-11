import { TextInput, Button, Group, Box, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const AddStudent = () => {
  const form = useForm({
    initialValues: {
      studentName: "",
      studentRollNo: "",
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Student Name"
          placeholder="lalit"
          {...form.getInputProps("studentName")}
        />

        <NumberInput
          withAsterisk
          label="Student Roll No"
          placeholder="123456"
          {...form.getInputProps("studentRollNo")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddStudent;
