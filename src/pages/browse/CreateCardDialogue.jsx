import {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField,} from '@mui/material';
import {DeleteOutlined} from '@ant-design/icons';

const CREATE_REWARD_CARD = gql`
    mutation CreateRewardCard($input: RewardCardInput!) {
        createRewardCard(input: $input) {
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

export default function CreateCardDialog({open, onClose, onSuccess, currentFilters}) {
    const [formData, setFormData] = useState({
        name: currentFilters?.name || '',
        issuer: currentFilters?.issuer || '',
        region: currentFilters?.region || '',
        rewardType: '',
        rewardCategories: [{category: '', rate: ''}]
    });

    const [createCard] = useMutation(CREATE_REWARD_CARD, {
        update: (cache, {data: {createRewardCard}}) => {
            cache.modify({
                fields: {
                    rewardCards(existingCards = []) {
                        const newCardRef = cache.writeFragment({
                            data: createRewardCard,
                            fragment: gql`
                                fragment NewCard on RewardCard {
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
                            `
                        });
                        return [...existingCards, newCardRef];
                    }
                }
            });
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const input = {
                ...formData,
                rewardCategories: formData.rewardCategories.map(cat => ({
                    ...cat,
                    rate: parseFloat(cat.rate)
                }))
            };
            await createCard({variables: {input}});
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCategoryChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            rewardCategories: prev.rewardCategories.map((cat, i) =>
                i === index ? {...cat, [field]: value} : cat
            )
        }));
    };

    const addCategory = () => {
        setFormData(prev => ({
            ...prev,
            rewardCategories: [...prev.rewardCategories, {category: '', rate: ''}]
        }));
    };

    const removeCategory = (index) => {
        setFormData(prev => ({
            ...prev,
            rewardCategories: prev.rewardCategories.filter((_, i) => i !== index)
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add New Reward Card</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{mt: 1}}>
                        <TextField
                            required
                            fullWidth
                            name="name"
                            label="Card Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            fullWidth
                            name="issuer"
                            label="Issuer"
                            value={formData.issuer}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            fullWidth
                            name="region"
                            label="Region"
                            value={formData.region}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            fullWidth
                            name="rewardType"
                            label="Reward Type"
                            value={formData.rewardType}
                            onChange={handleChange}
                        />

                        {formData.rewardCategories.map((cat, index) => (
                            <Stack key={index} direction="row" spacing={2} alignItems="center">
                                <TextField
                                    required
                                    fullWidth
                                    label="Category"
                                    value={cat.category}
                                    onChange={(e) => handleCategoryChange(index, 'category', e.target.value)}
                                />
                                <TextField
                                    required
                                    label="Rate"
                                    type="number"
                                    inputProps={{step: "0.01"}}
                                    value={cat.rate}
                                    onChange={(e) => handleCategoryChange(index, 'rate', e.target.value)}
                                />
                                {formData.rewardCategories.length > 1 && (
                                    <IconButton onClick={() => removeCategory(index)} size="small">
                                        <DeleteOutlined/>
                                    </IconButton>
                                )}
                            </Stack>
                        ))}

                        <Button type="button" onClick={addCategory}>
                            Add Category
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}