import {
  Badge,
  Box,
  Button,
  createStyles,
  Grid,
  Group,
  Modal,
  Radio,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconCircleCheck, IconCircleX, IconClockRecord, IconSearch } from '@tabler/icons';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
// import AssignmentSubmit from '../AssignmentSubmit/AssignmentSubmit';
import { data } from './AssignmentData';

const PAGE_SIZE = 12;

const useStyles = createStyles((theme: any) => {
  return {
    cell: { backgroundColor: theme.colors.red[2] },
    viewButton: {
      backgroundColor: theme.colors.blue[2],
    },
    linkStyle: {
      color: '#fff',
    },
  };
});

export const ViewTeacher = () => {
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);
  const { classes } = useStyles();
  const [records, setRecords] = useState(data);
  const [pageRecords, setpageRecords] = useState(records.slice(0, PAGE_SIZE));
  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setpageRecords(data.slice(from, to));
  }, [page]);

  useEffect(() => {
    setpageRecords(
      records.filter(({ assignee, subject, title }) => {
        if (
          debouncedQuery !== '' &&
          !`${assignee} ${subject} ${title} `.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      }),
    );
  }, [debouncedQuery]);

  const submitHandler = (id: string) => {};

  useEffect(() => {
    setpageRecords(
      records.filter(({ status }) => {
        if (filterBy !== 'all') return status === filterBy;
        else return status;
      }),
    );
  }, [filterBy]);

  const submissionJSX = (data: any) => (
    <>
      <Modal
        centered
        overlayColor="#0000001a"
        aria-modal="true"
        closeButtonLabel="Close authentication modal"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        {/* <AssignmentSubmit data={data} setClose={closeModalHandler} /> */}
      </Modal>
      <Button
        disabled={data.status === 'done'}
        color="red"
        radius="xl"
        compact
        uppercase
        onClick={() => setOpened(true)}
      >
        {data.status === 'done' ? 'Done' : 'Submit'}
      </Button>
    </>
  );

  const statusHandler = (status: String) => {
    if (status === 'done') return <IconCircleCheck color={theme.colors.teal[3]} />;
    else if (status === 'pending') return <IconClockRecord color={theme.colors.blue[7]} />;
    else
      return (
        <Tooltip label="Late">
          <IconCircleX color="red" />
        </Tooltip>
      );
  };

  const closeModalHandler = () => {
    setOpened(false);
  };

  return (
    <Box sx={{ height: 607 }}>
      <Grid align="center" justify="space-between" mb="md">
        <Grid.Col xs={8} sm={5}>
          <TextInput
            sx={{ flexBasis: '40%' }}
            placeholder="Search Assignments..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col xs={10} sm={4}>
          <Radio.Group value={filterBy} onChange={setFilterBy} name="favoriteFramework" description="Filter by">
            <Radio value="all" label="All" />
            <Radio value="done" label="Submitted" />
            <Radio value="pending" label="Pending" />
            <Radio value="late" label="Late" />
            {/* <Radio value="vue" label="Vue" /> */}
          </Radio.Group>
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
            accessor: 'title',
            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
            title: 'Title',
            width: 'fit-content',
            render: ({ title, isNew }) => (
              <Group>
                {title} {isNew && <Badge color="red">NEW</Badge>}{' '}
              </Group>
            ),
          },
          {
            accessor: 'subject',
            title: 'Subject',
            textAlignment: 'left',
            width: 'fit-content',
            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
          },
          {
            accessor: 'assignee',
            title: 'Assignee',
            textAlignment: 'left',
            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
          },
          {
            accessor: 'assigned_date',
            title: 'Assigned Date',
            sortable: true,
            textAlignment: 'left',
            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
          },
          {
            accessor: 'submission_date',
            title: 'Submission By',
            sortable: true,
            textAlignment: 'left',
            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
          },
          {
            accessor: 'status',
            title: 'Status',
            textAlignment: 'left',
            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
            render: ({ status }) => {
              return statusHandler(status);
            },
          },
          {
            accessor: 'File',

            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
            render: (data) => (
              <Button className={classes.viewButton} radius="xl" uppercase formTarget="_blank" compact>
                <a className={classes.linkStyle} target="_blank" href="https://files.eric.ed.gov/fulltext/ED491517.pdf">
                  VIEW
                </a>
              </Button>
            ),
          },
          {
            accessor: '',
            cellsClassName: (record) => (record.status === 'late' ? classes.cell : ''),
            render: (data) => submissionJSX(data),
          },
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

// export default ViewTeacher;
