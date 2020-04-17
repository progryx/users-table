import { call, put, takeLatest } from 'redux-saga/effects'
import { mockData } from '../mockData'
import { actions } from '../main-reducer'

const getServerData = () =>
  new Promise((resolve, reject) => {
    // return reject('No data available') // Проверка вывода ошибки

    setTimeout(() => {
      resolve(mockData)
    }, 2000)
  })

function* getUsersFromServer() {
  try {
    const data = yield call(getServerData)
    yield put(actions.setUsers(data))
  } catch (e) {
    yield put(actions.setError(e))
  }
}

export function* rootSaga() {
  yield takeLatest('GET_USERS', getUsersFromServer)
}
