import Error from 'pages/Error';
import ErrorPage from 'pages/Error/ErrorPage';
import {
  AsyncLaR,
  AsyncApp,
  AsyncNote,
  AsyncNoteContent,
  AsyncTrendMap,

  AsyncBirthday,
  AsyncBirthdayList,
  AsyncBirthdayAdd,
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
            component: AsyncNoteContent,
          },
          {
            path: '/admin/note/trendMap',
            component: AsyncTrendMap,
          },
          {
            path: '/admin/note/folder/:id',
            component: AsyncNoteContent,
          },
          {
            component: Error,
            requiresAuth: false,
          },
        ]
      },
      {
        path: '/admin/birthday',
        component: AsyncBirthday,
        requiresAuth: true,
        routes: [
          {
            path: '/admin/birthday/list',
            component: AsyncBirthdayList,
          },
          {
            path: '/admin/birthday/add',
            component: AsyncBirthdayAdd,
          },
          {
            component: Error,
            requiresAuth: false,
          },
        ]
      },
      {
        component: Error,
        requiresAuth: false,
      }
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