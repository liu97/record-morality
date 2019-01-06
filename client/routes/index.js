import {
  AsyncLaR,
  AsyncApp,
  AsyncHome,
  AsyncErrorPage,
  AsyncError,
  AsyncArticleList,
  AsyncArticleAdd,
  ArticleDetail,
  ArticleEdit,
  MessageList,
  MessageDetail,
} from './async'

const routes = [
  {
    path: '/',
    component: AsyncLaR,
    exact: true,
    requiresAuth: false,
  },
  {
    path: '/LaR',
    component: AsyncLaR,
    requiresAuth: false,
  },
  {
    path: '/admin',
    component: AsyncApp,
    requiresAuth: true,
    routes: [
      { path: '/admin/',
        exact: true,
        component: AsyncHome,
      },
      {
        path: '/admin/article/add',
        component: AsyncArticleAdd,
      },
      {
        path: '/admin/article/list',
        component: AsyncArticleList,
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
        component: AsyncError,
        requiresAuth: false,
      },
    ]
  },
  {
    path: '/ErrorPage',
    component: AsyncErrorPage,
    requiresAuth: false,
  },
  {
    component: AsyncError,
    requiresAuth: false,
  },
]

export default routes