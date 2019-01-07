import asyncComponent from 'components/asyncComponent/common'

const AsyncLaR = asyncComponent(() => import(/* webpackChunkName: "LaR" */ 'pages/LaR'));
const AsyncApp = asyncComponent(() => import(/* webpackChunkName: "app" */ 'containers/App'));
const AsyncErrorPage = asyncComponent(() => import(/* webpackChunkName: "errorPage" */ 'pages/Error/ErrorPage'));
const AsyncError = asyncComponent(() => import(/* webpackChunkName: "error" */ 'pages/Error'));
const AsyncNote = asyncComponent(() => import(/* webpackChunkName: "articleAdd" */ 'pages/Note'));

export {
    AsyncLaR,
    AsyncApp,
    AsyncErrorPage,
    AsyncError,
    AsyncNote,
}