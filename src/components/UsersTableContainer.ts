import { RootState } from '../redux/redux-store'
import { connect } from 'react-redux'
import { UsersTableComponent } from './UsersTableComponent'
import { actions } from '../redux/main-reducer'

const mapStateToProps = (state: RootState) => ({
  tableData: state.mainPage.table,
  serverMessage: state.mainPage.serverMessage,
})

export const UsersTableContainer = connect(mapStateToProps, {
  getUsers: actions.getUsers,
  selectUser: actions.selectUser,
  selectAllUsers: actions.selectAllUsers,
})(UsersTableComponent)
