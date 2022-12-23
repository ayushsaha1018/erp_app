import {
  Badge,
  Box,
  Button,
  createStyles,
  Grid,
  Group,
  Modal,
  Radio,
  Select,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import {  IconSearch } from '@tabler/icons';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import {data} from "../../assets/teacherDetails"
const PAGE_SIZE = 11;

export const ViewTeacher = () => {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data);
  const [pageRecords, setpageRecords] = useState(records.slice(0, PAGE_SIZE));
  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [subjectValue, onSubjectChange] = useState('All');

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setpageRecords(records.slice(from, to));
  }, [page]);

  useEffect(() => {
    setpageRecords(
      records.filter(({ name, subject }) => {
        if (
          debouncedQuery !== '' &&
          !`${name} ${subject} `.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      }),
    );
  }, [debouncedQuery]);


  useEffect(() => {
    setpageRecords(
      records.filter(({ subject }) => {
        if (subjectValue !== 'All') return subject === subjectValue;
        else return subject;
      }),
    );
  }, [subjectValue]);


  return (
    <Box sx={{ height: 580 }}>
      <Grid align="center" justify="space-between" mb="md">
        <Grid.Col xs={8} sm={5}>
          <TextInput
            sx={{ flexBasis: '40%' }}
            placeholder="Search Teachers..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col xs={10} sm={4}>
        <Select
            label="Select Section"
            placeholder="Pick one"
            searchable
            onSearchChange={onSubjectChange}
            searchValue={subjectValue || "All"}
            nothingFound="No options"
            data={["All", "English", "Hindi", "Geography","Mathematics", "Chemistry"]}
          />
        </Grid.Col>
      </Grid>
      <DataTable
        shadow="sm"
        highlightOnHover
        withBorder={false}
        horizontalSpacing="xs"
        verticalSpacing="xs"
        records={pageRecords}
        columns={[
          {
            accessor: 'name',
            title: 'Name'
          },
          {
            accessor: 'subject',
            title: 'Subject',
            textAlignment: 'left',
            width: 'fit-content',
          }
        ]}
        totalRecords={data.length}
        page={page}
        recordsPerPage={PAGE_SIZE}
        onPageChange={(p) => setPage(p)}
        loadingText="Loading..."
        noRecordsText="No records found"
        paginationColor="grape"
        paginationSize="md"
      />
    </Box>
  );
};
