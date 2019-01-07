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
    path: '/note',
    component: AsyncApp,
    requiresAuth: true,
    routes: [
      {
        path: '/note/new',
        component: AsyncArticleAdd,
      },
      {
        path: '/note/folder/:id',
        component: AsyncArticleAdd,
      },
      {
        path: '/note/trendMap',
        component: AsyncArticleAdd,
      },
      {
        path: '/note/unsaved',
        component: AsyncArticleAdd,
      },
      {
        component: AsyncError,
        requiresAuth: false,
      },
    ]
  },
  {
    path: '/birthday',
    component: AsyncApp,
    requiresAuth: true,
    routes: [
      {
        path: '/birthday/new',
        component: AsyncArticleAdd,
      },
      {
        path: '/birthday/folder/:id',
        component: AsyncArticleAdd,
      },
      {
        path: '/birthday/trendMap',
        component: AsyncArticleAdd,
      },
      {
        path: '/birthday/unsaved',
        component: AsyncArticleAdd,
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