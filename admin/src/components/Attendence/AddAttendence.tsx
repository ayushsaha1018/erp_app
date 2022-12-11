import {
  Button,
  Group,
  Box,
  Stack,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";

const AddAttendence = () => {
  const form = useForm({
    initialValues: {
      studentRollNo: "",
      date: "",
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <NumberInput
          withAsterisk
          mt="sm"
          label="Student Roll No."
          placeholder="123456"
          {...form.getInputProps("studentRollNo")}
        />

        <DatePicker
          placeholder="Pick date"
          label="Date"
          withAsterisk
          {...form.getInputProps("date")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddAttendence;
