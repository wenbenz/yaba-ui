// GraphQL Query
import { gql } from "@apollo/client";

export const AGGREGATE_EXPENDITURES = gql`
  query AggregatedExpenditures(
    $since: String
    $until: String
    $span: Timespan
    $groupBy: GroupBy
  ) {
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
  }
`;
