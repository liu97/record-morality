import {
  AsyncLaR,
  AsyncApp,
  AsyncErrorPage,
  AsyncError,
  AsyncNote,
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
      {
        path: '/admin/note',
        component: AsyncNote,
        routes: [
          {
            path: '/admin/note/recent',
            component: AsyncNote,
          },
          {
            path: '/admin/note/folder/:id',
            component: AsyncNote,
          },
          {
            path: '/admin/note/trendMap',
            component: AsyncNote,
          },
          {
            path: '/admin/note/unsaved',
            component: AsyncNote,
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
            component: AsyncNote,
          },
          {
            path: '/birthday/folder/:id',
            component: AsyncNote,
          },
          {
            path: '/birthday/trendMap',
            component: AsyncNote,
          },
          {
            path: '/birthday/unsaved',
            component: AsyncNote,
          },
          {
            component: AsyncError,
            requiresAuth: false,
          },
        ]
      }
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