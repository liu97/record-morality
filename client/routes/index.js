import Login from 'pages/Login';
import App from 'containers/App';
import Home from 'pages/Home';
import ErrorPage from 'pages/Error/ErrorPage';
import Error from 'pages/Error';
import ArticleList from 'pages/Article/List';
import ArticleAdd from 'pages/Article/Add';
import ArticleDetail from 'pages/Article/Detail';
import ArticleEdit from 'pages/Article/Edit';
import MessageList from 'pages/Message/List';
import MessageDetail from 'pages/Message/Detail';

const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
    requiresAuth: false,
  },
  {
    path: '/login',
    component: Login,
    requiresAuth: false,
  },
  {
    path: '/admin',
    component: App,
    requiresAuth: true,
    routes: [
      { path: '/admin/',
        exact: true,
        component: Home,
      },
      {
        path: '/admin/article/add',
        component: ArticleAdd,
      },
      {
        path: '/admin/article/list',
        component: ArticleList,
      },
      {
        path: '/admin/article/detail',
        component: ArticleDetail,
      },
      {
        path: '/admin/article/edit',
        component: ArticleEdit,
      },
      {
        path: '/admin/message/list',
        component: MessageList,
      },
      {
        path: '/admin/message/detail',
        component: MessageDetail,
      },
      {
        component: Error,
        requiresAuth: false,
      },
    ]
  },
  {
    path: '/ErrorPage',
    component: ErrorPage,
    requiresAuth: false,
  },
  {
    component: Error,
    requiresAuth: false,
  },
]

export default routes