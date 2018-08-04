import UserCenter from './container/UserCenter';
import StudentsLib from './container/StudentsLib';
import ClassDetail from './container/ClassDetail';
import AppWrapper from './container/AppWrapper';

const rousteConfig = {
  childRoutes: [{
    path: '/',
    component: require('./container/AppWrapper').default,
    indexRoute: {
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./container/StudentsLib').default)
        }, 'studentsLib')
      }
    },
    childRoutes: [{
      path: 'userCenter',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./container/UserCenter').default)
        }, 'userCenter')
      }
    }, {
      path: 'classDetail',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./container/ClassDetail').default)
        }, 'classDetail')
      }
    }
    // {
    //   path: 'manage',
    //   getChildRoutes(nextState, callback) {
    //     require.ensure([], require => {
    //       callback(null, [
    //         { path: 'feedFlow(-:id)/allcomment(-:cid)', component: require('./containers/manage/allCommentPage/allCommentPage') },
    //       ])
    //     }, 'manage')
    //   }
    // }
    ]
  }]
}
const routeConfig = { 
  path: '/',
  component: AppWrapper,
  indexRoute: { component: StudentsLib },
  childRoutes: [
    { path: 'studentsLib', component: StudentsLib },
    { path: 'userCenter/:mid', component: UserCenter },
    { path: 'classDetail/:classId', component: ClassDetail }
  ]
}

export default routeConfig
