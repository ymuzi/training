import UserCenter from './container/UserCenter';
import StudentsLib from './container/StudentsLib';
import ClassDetail from './container/ClassDetail';
import AppWrapper from './container/AppWrapper';

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

// /studentsLib

export default routeConfig
