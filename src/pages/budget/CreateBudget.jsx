import {Alert} from "@mui/lab";
import {QuestionCircleFilled} from "@ant-design/icons";
import {useCreateBudget} from "../../api/graph";
import {useEffect} from "react";

export default function CreateBudget({budget}) {
    const [createBudget] = useCreateBudget(budget)

    useEffect(() => {
        createBudget(budget)
    });

    return (<Alert color="primary" icon={<QuestionCircleFilled />}>
        No existing budget found. New budget created from template.
    </Alert>)
}