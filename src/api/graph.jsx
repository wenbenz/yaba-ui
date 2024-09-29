import {gql, useMutation, useQuery} from "@apollo/client";
import {dateString} from "../utils/dates";

export function useBudget(id) {
    return useQuery(GET_BUDGET_BY_ID, {
        variables: { id }
    })
}

export function useBudgets(count) {
    return useQuery(LIST_BUDGETS, {
        variables: { count }
    })
}

export function useExpenditures({since, until, count}) {
    return useQuery(RECENT_EXPENDITURES, {
        variables: {
            since: dateString(since),
            until: dateString(until),
            count,
        }
    })
}

export function useExpenditureAggregate({
                                            since,
                                            span,
                                            until = new Date(),
                                            groupBy = "NONE",
                                            aggregation = "SUM"
                                        }) {
    return useQuery(AGGREGATE_EXPENDITURES,
        {
            variables: {
                since: dateString(since),
                until: dateString(until),
                span: span,
                groupBy: groupBy,
                aggregation: aggregation,
            }
        })
}

export function useCreateBudget({name, incomes, expenses}) {
    return useMutation(CREATE_BUDGET, {
        variables: {
            name, incomes, expenses
        },
        refetchQueries: [
            LIST_BUDGETS
        ]
    })
}

export function useUpdateBudget({id, name, incomes, expenses}) {
    return useMutation(UPDATE_BUDGET, {
        variables: {
            id, name, incomes, expenses
        },
        refetchQueries: [
            GET_BUDGET_BY_ID
        ]
    })
}

const GET_BUDGET_BY_ID = gql`
    query Budget($id: ID!) {
        budget(id: $id) {
            id
            owner
            name
            incomes {
                source
                amount
            }
            expenses {
                category
                amount
                isFixed
                isSlack
            }
        }
    }`

const LIST_BUDGETS = gql`
    query Budgets($count: Int) {
        budgets(first: $count) {
            id
            owner
            name
            incomes {
                source
                amount
            }
            expenses {
                category
                amount
                isFixed
                isSlack
            }
        }
    }`

const RECENT_EXPENDITURES = gql`
    query Expenditures($since: String, $until: String, $count: Int) {
        expenditures(since: $since, until: $until, count: $count) {
            id
            owner
            name
            amount
            date
            method
            budget_category
            reward_category
            comment
            created
            source
        }
    }`

const AGGREGATE_EXPENDITURES = gql`
    query AggregatedExpenditures($since: String, $until: String, $span: Timespan, $groupBy: GroupBy) {
        aggregatedExpenditures(
            since: $since
            until: $until
            span: $span
            groupBy: $groupBy
            aggregation: SUM
        ) {
            groupByCategory
            amount
            spanStart
            span
        }
    }`

const CREATE_BUDGET = gql`
    mutation CreateBudget($name: String!, $incomes: [IncomeInput], $expenses: [ExpenseInput]) {
        createBudget(input: { name: $name, incomes: $incomes, expenses: $expenses }) {
            id
            name
            incomes {
                source
                amount
            }
            expenses {
                category
                amount
                isFixed
                isSlack
            }
        }
    }`

const UPDATE_BUDGET = gql`
    mutation UpdateBudget($id: ID!, $name: String, $incomes: [IncomeInput], $expenses: [ExpenseInput]) {
        updateBudget(input: { id: $id, name: $name, incomes: $incomes, expenses: $expenses }) {
            id
            name
            incomes {
                source
                amount
            }
            expenses {
                category
                amount
                isFixed
                isSlack
            }
        }
    }`