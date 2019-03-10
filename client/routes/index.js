import Error from 'pages/Error';
import ErrorPage from 'pages/Error/ErrorPage';
import {
  AsyncLaR,
  AsyncApp,
  AsyncNote,
  AsyncNoteContent,
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
            component: AsyncNote,
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