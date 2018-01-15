import api from '../utils/api'

const { fetchHomeData } = api

export default {
    namespace: 'home',
    // 注意:
    // loading值必须再初始化的时候为true, 否则component会先render一次,导致某些属性并不存在，因为can not 
    // read properties of undefined的错误

    // loading 的对比:
    // 再web端，因为有路由的存在，react-router可以监听路由的变化，
    // 在初始化组件时,事件触发顺序为app.registerModel -> subscriptions -> fetchdata -> loadingChange -> renderComponent
    // 所以在web端，可以将loading设置为false, 第一次render之前，loading就为true，会显示活动指示器

    // 尝试改进, 动态加载, 尝试用subscriptions和动态加载去改进。
    state: {
        loading: true,
        page: 1
    },
    subscriptions: {
      setup() {
        console.log('set up')
      }
    },
    reducers: {
      save(state, action) {
        const { data } = action
        return { ...state, data }
      },
      loadingChange(state) {
          const loading = !state.loading
          return { ...state, loading}
      }
    },
    effects: {
      *fetch(action, { put, call, select }) {
        const home = yield select(state => state.home)
        const { page } = home
        // 拉取数据
        const response = yield call(fetchHomeData, { type: 'first', size: 10, page })
        const { data } = response
        yield put({ type: 'save', data })
        // 存储数据后，改变状态为加载完成
        yield put({ type: 'loadingChange'} )
      },
    },
  }
