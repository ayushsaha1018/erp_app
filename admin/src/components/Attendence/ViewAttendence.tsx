import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Select,
  Grid,
  Pagination,
  Button,
  Center,
  Container,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { data } from "../../assets/attendenceData";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function ViewAttendence() {
  const { classes, theme } = useStyles();
  const [attData, setAttData] = useState(data);
  const [classValue, onClassChange] = useState("");
  const [sectionValue, onSectionChange] = useState("");
  const [activePage, setPage] = useState(1);

  const clearFilters = () => {
    setAttData(data)
    onClassChange("")
    onSectionChange("")
  };

  useEffect(() => {
    if(classValue !== "" && sectionValue === "")
        setAttData(data.filter((item) => item.class == classValue))
    else if(classValue === "" && sectionValue !== "")     
        setAttData(data.filter((item) => item.section == sectionValue))
    else if(classValue != "" && sectionValue !== "")    
        setAttData(data.filter((item) => item.section == sectionValue && item.class == classValue))
  }, [classValue, sectionValue])
  

  const rows = attData.map((row) => {
    const totalReviews = row.present + row.absent;
    const positiveReviews = (row.present / totalReviews) * 100;
    const negativeReviews = (row.absent / totalReviews) * 100;

    return (
      <tr key={row.name}>
        <td>
          <Anchor<"a"> size="sm" onClick={(event) => event.preventDefault()}>
            {row.name}
          </Anchor>
        </td>
        <td>{row.class}</td>
        <td>
          <Anchor<"a"> size="sm" onClick={(event) => event.preventDefault()}>
            {row.section}
          </Anchor>
        </td>
        <td>
          <Group position="apart">
            <Text size="xs" color="teal" weight={700}>
              {positiveReviews.toFixed(0)}%
            </Text>
            <Text size="xs" color="red" weight={700}>
              {negativeReviews.toFixed(0)}%
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            sections={[
              {
                value: positiveReviews,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.teal[9]
                    : theme.colors.teal[6],
              },
              {
                value: negativeReviews,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.red[9]
                    : theme.colors.red[6],
              },
            ]}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Grid>
        <Grid.Col md={3}>
          <Select
            label="Select Class"
            placeholder="Pick one"
            searchable
            onSearchChange={onClassChange}
            searchValue={classValue}
            nothingFound="No options"
            data={["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]}
          />
        </Grid.Col>
        <Grid.Col md={3}>
          <Select
            label="Select Section"
            placeholder="Pick one"
            searchable
            onSearchChange={onSectionChange}
            searchValue={sectionValue}
            nothingFound="No options"
            data={["A", "B", "C", "D"]}
          />
        </Grid.Col>
        <Grid.Col md={3}>
            <Button mt={25} onClick={clearFilters}>Clear</Button>
        </Grid.Col>
      </Grid>
      <ScrollArea>
        {attData.length > 0 ? (
          <>
            <Table sx={{ minWidth: 700 }} verticalSpacing="xs">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Attendence distribution</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Pagination page={activePage} onChange={setPage} total={5} />;
          </>
        ) : (
          <Button>No</Button>
        )}
      </ScrollArea>
    </>
  );
}
