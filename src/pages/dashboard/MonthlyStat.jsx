import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function MonthlyStat({
                                        title,
                                        prev,
                                        current,
                                        positiveMessage,
                                        negativeMessage,
                                        chooseColor = () => 'primary',
                                        format = (v) => v,
                                        showDiff = true
                                    }) {
    const diff = current - prev
    const color = chooseColor(prev, current)

    return (
        <MainCard contentSX={{ p: 2.25 }}>
            <Stack spacing={0.5}>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography variant="h4" color="inherit">
                            { format(current) }
                        </Typography>
                    </Grid>
                    { showDiff && (
                        <Grid item>
                            <Chip
                                variant="combined"
                                color={color}
                                icon={diff < 0 ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                                label={`${ Math.abs((diff + .00000001) / (prev + .00001) * 100).toFixed(0) }%`}
                                sx={{ ml: 1.25, pl: 1 }}
                                size="small"
                            />
                        </Grid>
                    )}
                </Grid>
            </Stack>
            <Box sx={{ pt: 2.25 }}>
                <Typography variant="caption" color="text.secondary">
                    { (diff < 0 ? negativeMessage : positiveMessage ) + ' '}
                    <Typography variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                        { showDiff ? format(diff) : format(current) }
                    </Typography>{' '}
                    this month
                </Typography>
            </Box>
        </MainCard>
    );
}

MonthlyStat.propTypes = {
    title: PropTypes.string,
    prev: PropTypes.number,
    current: PropTypes.number,
    positiveMessage: PropTypes.string,
    negativeMessage: PropTypes.string,
    chooseColor: PropTypes.func,
    format: PropTypes.func,
    showDiff: PropTypes.bool
};
