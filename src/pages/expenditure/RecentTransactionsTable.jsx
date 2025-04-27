// material-ui
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

// third-party
import { NumericFormat } from "react-number-format";
import Loader from "../../components/Loader";
import {useMemo, useState} from "react";
import Button from "@mui/material/Button";
import {Stack} from "@mui/system";
import Typography from "@mui/material/Typography";
import {useQuery} from "@apollo/client";
import {RECENT_EXPENDITURES} from "../../api/graph";
import Divider from "@mui/material/Divider";

const headCells = [
  {
    id: "date",
    align: "left",
    disablePadding: false,
    label: "Date",
  },
  {
    id: "name",
    align: "left",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "amount",
    align: "left",
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "method",
    align: "left",
    disablePadding: false,
    label: "Method",
  },
  {
    id: "budget_category",
    align: "left",
    disablePadding: false,
    label: "Budget Category",
  },
  {
    id: "reward_category",
    align: "left",
    disablePadding: false,
    label: "Reward Category",
  },
  {
    id: "comment",
    align: "right",
    disablePadding: false,
    label: "Comment",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function RecentTransactionsTableHeader({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function RecentTransactionsTable() {
  const order = "desc";
  const orderBy = "date";
  const [offset, setOffset] = useState(0);
  const [expenditures, setExpenditures] = useState([]);
  const { loading, error, data } = useQuery(RECENT_EXPENDITURES, {
    variables: {
      count: 10,
      offset: offset,
    },
  });

  useMemo(() => {
    if (data) {
      setExpenditures((prevExpenditures) => [
        ...prevExpenditures,
        ...data.expenditures,
      ]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setOffset(offset + 10);
  };

  if (loading) return <Loader />;

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <RecentTransactionsTableHeader order={order} orderBy={orderBy} />
          <TableBody>
            {expenditures.map(
                ({
                  id,
                  date,
                  name,
                  amount,
                  method,
                  budget_category,
                  reward_category,
                  comment,
                }) => {
                  const labelId = `enhanced-table-checkbox-${id}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      tabIndex={-1}
                      key={id}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        <Link color="secondary"> {date}</Link>
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        <NumericFormat
                          value={amount}
                          displayType="text"
                          thousandSeparator
                          prefix="$"
                        />
                      </TableCell>
                      <TableCell>{method}</TableCell>
                      <TableCell>{budget_category}</TableCell>
                      <TableCell>{reward_category}</TableCell>
                      <TableCell align="right">{comment}</TableCell>
                    </TableRow>
                  );
                },
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack>
        <Divider />
        <Button variant="text" onClick={handleLoadMore}>
          <Typography variant={"subtitle1"}>Load More</Typography>
        </Button>
      </Stack>
    </Box>
  );
}

// RecentTransactionsTableHeader.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
