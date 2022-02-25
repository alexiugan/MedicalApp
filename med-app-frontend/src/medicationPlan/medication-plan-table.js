import React from "react";
import Table from "../commons/tables/table";


const columns = [
    {
        Header: 'Interval',
        accessor: 'interval',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Period',
        accessor: 'period',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Medication',
        accessor: 'medicationNames',
        style: { 'whiteSpace': 'unset'}
    }
];

const filters = [
    {
        accessor: 'interval',
    }
];

class MedicationPlanTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default MedicationPlanTable;