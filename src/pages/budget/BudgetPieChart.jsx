import { useMemo, useState} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';
import {useQuery} from "@apollo/client";
import {AGGREGATE_EXPENDITURES} from "../../api/queries";
import {dateString, endOfLastMonth, startOfLastMonth} from "../../utils/dates";

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        // height: 800,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            // columnWidth: '45%',
            borderRadius: 4,
            horizontal: true
        }
    },
    dataLabels: {
        enabled: true
    },
    xaxis: {
        categories: ['No data'],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
    },
    yaxis: {
        show: true
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function BudgetPieChart() {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const { data } = useQuery(AGGREGATE_EXPENDITURES, {
        variables: {
            since: dateString(startOfLastMonth()),
            until: dateString(endOfLastMonth()),
            span: "MONTH",
            groupBy: "BUDGET_CATEGORY"
        }
    })

    const [series, setSeries] = useState([80, 95, 70, 42, 65, 55, 78]);

    const [options, setOptions] = useState(barChartOptions);

    useMemo(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                ...prevState.xaxis,
                labels: {
                    style: {
                        colors: secondary
                    }
                }
            }
        }));
    }, [primary, info, secondary]);

    useMemo(() => {
        if (data) {
            let sortedData = data.aggregatedExpenditures.toSorted((a, b) => a.amount - b.amount).toReversed()
            setSeries(sortedData.slice(0, 10).map(e => e.amount))
            setOptions((prevState) => ({
                ...prevState,
                xaxis: {
                    categories: sortedData.slice(0, 10).map(e => e.groupByCategory)
                }
            }))
        }
    }, [data])

    return (
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
            <ReactApexChart options={options} series={[{data:series}]} type="bar" height={460} />
        </Box>
    );
}
