import asyncComponent from 'components/asyncComponent/common'

const AsyncLaR = asyncComponent(() => import(/* webpackChunkName: "LaR" */ 'pages/LaR'));
const AsyncApp = asyncComponent(() => import(/* webpackChunkName: "app" */ 'containers/App'));
const AsyncNote = asyncComponent(() => import(/* webpackChunkName: "note" */ 'pages/Note'));
const AsyncNoteContent = asyncComponent(() => import(/* webpackChunkName: "noteContent" */ 'pages/Note/Content'));

export {
    AsyncLaR,
    AsyncApp,
    AsyncNote,
    AsyncNoteContent,
}