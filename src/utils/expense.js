export function expenseIdToName(budget, id) {
    const uuid2category = new Map(budget.expenses.map(expense => [expense.id, expense.category]));
    const misc = budget.expenses.filter(expense => expense.isSlack)[0];
    return uuid2category.get(id) || misc.category;
}