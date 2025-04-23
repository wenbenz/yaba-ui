import {useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import CreateCardDialog from './CreateCardDialogue';
import {PlusCircleFilled} from '@ant-design/icons';

const GET_REWARD_CARDS = gql`
    query GetRewardCards($issuer: String, $name: String, $region: String) {
        rewardCards(issuer: $issuer, name: $name, region: $region) {
            id
            name
            issuer
            region
            version
            rewardType
            categories {
                category
                rate
            }
        }
    }
`;

export default function BrowseCards() {
    const [filters, setFilters] = useState({
        issuer: '',
        name: '',
        region: '',
    });
    const [openDialog, setOpenDialog] = useState(false);

    const {loading, error, data} = useQuery(GET_REWARD_CARDS, {
        variables: filters,
    });

    const handleFilterChange = (event) => {
        const {name, value} = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value || '',
        }));
    };

    return (
        <Grid container maxWidth="xl">
            <Grid item xs={12} sx={{mb: 3}}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Browse Cards
            </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            name="issuer"
                            label="Issuer"
                            value={filters.issuer}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Card Name"
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            name="region"
                            label="Region"
                            value={filters.region}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {loading && (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <CircularProgress/>
                </Box>
            )}

            {error && (
                <Typography color="error" sx={{my: 2}}>
                    Error: {error.message}
                </Typography>
            )}

            {!loading && !error && (
                <Grid container spacing={3}>
                    {data?.rewardCards?.map((card) => (
                        <Grid item xs={12} sm={6} md={4} key={card.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <Stack spacing={1}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h6">
                                                {card.issuer} {card.name}
                                            </Typography>
                                            <Typography variant="body1">
                                                Rewards: {card.rewardType}
                                            </Typography>
                                        </Stack>
                                        <Box sx={{
                                            display: { md: 'flex' },
                                            flexWrap: 'wrap',
                                            gap: 1
                                        }}>
                                            {card.categories?.map((category, index) => (
                                                <Typography
                                                    key={index}
                                                    variant="body2"
                                                    sx={{
                                                        '&:not(:last-child):after': {
                                                            content: {
                                                                md: '"•"'
                                                            },
                                                            mx: 1,
                                                            display: { xs: 'none', md: 'inline' }
                                                        }
                                                    }}
                                                >
                                                    {category.category}: {category.rate}X
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Stack>
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                                        Region: {card.region} | Version: {card.version}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Box sx={{position: 'fixed', bottom: 24, right: 24}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <PlusCircleFilled/>
                        <Typography>Add New Card</Typography>
                    </Stack>
                </Button>
            </Box>

            <CreateCardDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                currentFilters={filters}
                onSuccess={() => {
                    // Optionally update filters to match the new card
                }}
            />
        </Grid>
    );
}