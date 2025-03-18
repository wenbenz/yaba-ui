import { createContext, useContext, useState } from "react";
import { startOfYear } from "../utils/dates";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Stack} from "@mui/system";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

const DateRangeContext = createContext();

export const useDateRange = () => useContext(DateRangeContext);

export const DateRangeProvider = ({ children }) => {
    const [startDate, setStartDate] = useState(startOfYear());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <DateRangeContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
            <Grid item xs={12} md={8} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <Typography variant={"subtitle1"}>Date range</Typography>
                        <DatePicker label={"Since"} value={dayjs(startDate)} onChange={date => setStartDate(date)}/>
                        <DatePicker label={"Until"} value={dayjs(endDate)} onChange={date => setEndDate(date)}/>
                    </Stack>
                </LocalizationProvider>
            </Grid>
            <br />
            {children}
        </DateRangeContext.Provider>
    );
};