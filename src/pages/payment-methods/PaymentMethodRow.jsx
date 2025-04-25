import { Button, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useDeletePaymentMethod } from "../../api/graph";
import { DeleteOutlined } from '@ant-design/icons';

const PaymentMethodRow = ({ method }) => {
    const [deletePaymentMethod] = useDeletePaymentMethod();

    const handleDelete = async () => {
        try {
            await deletePaymentMethod({
                variables: { id: method.id }
            });
        } catch (error) {
            console.error('Failed to delete payment method:', error);
        }
    };

    return (
        <MainCard sx={{ mb: 2 }}>
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack spacing={1}>
                        <Typography variant="h6">{method.displayName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Added on {new Date(method.acquiredDate).toLocaleDateString()}
                            {method.cancelByDate && ` · Cancel by ${new Date(method.cancelByDate).toLocaleDateString()}`}
                        </Typography>
                    </Stack>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                        startIcon={<DeleteOutlined />}
                    >
                        Delete
                    </Button>
                </Stack>

                {method.rewards && (
                    <Stack spacing={1}>
                        <Typography variant="subtitle1">
                            {method.rewards.issuer} {method.rewards.name} · {method.rewards.rewardType}
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap">
                            {method.rewards.categories?.map((cat, index) => (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    sx={{
                                        bgcolor: 'action.hover',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        display: 'inline-flex'
                                    }}
                                >
                                    {cat.category}: {cat.rate}X
                                </Typography>
                            ))}
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </MainCard>
    );
};

export default PaymentMethodRow;