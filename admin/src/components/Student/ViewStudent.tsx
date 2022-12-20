import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, Button, Center, Grid, Pagination, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { data } from "../../assets/attendenceData";

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  },
}));




export function ViewStudent() {
  const { classes, theme } = useStyles();
  const [attData, setAttData] = useState(data);
  const [classValue, onClassChange] = useState("");
  const [sectionValue, onSectionChange] = useState("");
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    if(classValue !== "" && sectionValue === "")
        setAttData(data.filter((item) => item.class == classValue))
    else if(classValue === "" && sectionValue !== "")     
        setAttData(data.filter((item) => item.section == sectionValue))
    else if(classValue != "" && sectionValue !== "")    
        setAttData(data.filter((item) => item.section == sectionValue && item.class == classValue))
    
  }, [classValue, sectionValue, activePage])


  // pagination
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = activePage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, 
    indexOfLastRecord);

  const clearFilters = () => {
    setAttData(data)
    onClassChange("")
    onSectionChange("")
  };

  const rows = attData.map((row) => {

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
            <Button mt={25} onClick={clearFilters}>Clear Filters</Button>
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
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Pagination page={activePage} onChange={setPage} total={10} />;
          </>
        ) : (
          <Button>No</Button>
        )}
      </ScrollArea>
    </>
  );
}