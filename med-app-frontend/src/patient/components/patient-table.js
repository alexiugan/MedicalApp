import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Name',
        accessor: 'name',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Gender',
        accessor: 'gender',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Birthday',
        accessor: 'birthday',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Address',
        accessor: 'address',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Medical-Record',
        accessor: 'medicalRecord',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Caregiver',
        accessor: 'caregiverid',
        style: { 'whiteSpace': 'unset'}
    },
    {
        Header: 'Medication Plan',
        accessor: 'medplanid',
        style: { 'whiteSpace': 'unset'}
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class PatientTable extends React.Component {

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

export default PatientTable;