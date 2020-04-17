import React from "react"
import {
    Checkbox,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableFooter
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {TableData} from "../redux/main-reducer";


type Props = {
    tableData: TableData
    serverMessage: string
    selectUser: (id: string) => void
    getUsers: () => void
    selectAllUsers: (selected: boolean) => void
}

export const UsersTableComponent: React.FC<Props> = ({
                                                         tableData,
                                                         getUsers,
                                                         selectUser,
                                                         selectAllUsers,
                                                         serverMessage,
                                                     }) => {

    React.useEffect(() => {
        getUsers()
    }, [getUsers])


    if (serverMessage !== '') {
        return <Alert severity="error">{serverMessage}</Alert>
    }

    if (tableData.items.length === 0) {
        return <CircularProgress style={{marginLeft: '45%', marginTop: '20%'}}/>
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    color="secondary"
                                    checked={tableData.isSelectedAll}
                                    onChange={() => {
                                        selectAllUsers(!tableData.isSelectedAll)
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.items.map((row) => (
                            <TableRow key={row.id} selected={row.checked}>
                                <TableCell align="left">
                                    <Checkbox
                                        color="primary"
                                        checked={row.checked}
                                        onChange={() => {
                                            selectUser(row.id)
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <caption>
                        <Typography variant='h6'>
                            Users: {tableData.items.filter(user => user.checked).map((user, index, arr) =>
                            index !== arr.length - 1
                                ? `${user.firstName}, `
                                : user.firstName)}
                        </Typography>
                    </caption>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}