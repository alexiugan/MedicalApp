import React from "react";
import Table from "../commons/tables/table";


const columns = [
    {
        Header: 'Dosage',
        accessor: 'dosage',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Name',
        accessor: 'name',
        style: { 'whiteSpace': 'unset'}
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class MedicationTable extends React.Component {

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

export default MedicationTable;