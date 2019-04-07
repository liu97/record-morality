import asyncComponent from 'components/asyncComponent/common'

const AsyncLaR = asyncComponent(() => import(/* webpackChunkName: "LaR" */ 'pages/LaR'));
const AsyncApp = asyncComponent(() => import(/* webpackChunkName: "app" */ 'containers/App'));
const AsyncNote = asyncComponent(() => import(/* webpackChunkName: "note" */ 'pages/Note'));
const AsyncNoteContent = asyncComponent(() => import(/* webpackChunkName: "noteContent" */ 'pages/Note/Content'));
const AsyncTrendMap = asyncComponent(() => import(/* webpackChunkName: "noteTrendMap" */ 'pages/Note/TrendMap'));

const AsyncBirthday = asyncComponent(() => import(/* webpackChunkName: "birthday" */ 'pages/Birthday'));
const AsyncBirthdayList = asyncComponent(() => import(/* webpackChunkName: "birthdayList" */ 'pages/Birthday/List'));
const AsyncBirthdayAdd = asyncComponent(() => import(/* webpackChunkName: "birthdayAdd" */ 'pages/Birthday/Add'));
const AsyncBirthdayDetail = asyncComponent(() => import(/* webpackChunkName: "birthdayDetail" */ 'pages/Birthday/Detail'));
const AsyncBirthdayEdit = asyncComponent(() => import(/* webpackChunkName: "birthdayEdit" */ 'pages/Birthday/Edit'));

const AsyncAccountSetting = asyncComponent(() => import(/* webpackChunkName: "accountSetting" */ 'pages/Account'));

export {
    AsyncLaR,
    AsyncApp,
    AsyncNote,
    AsyncNoteContent,
    AsyncTrendMap,

    AsyncBirthday,
    AsyncBirthdayList,
    AsyncBirthdayAdd,
    AsyncBirthdayDetail,
    AsyncBirthdayEdit,
    
    AsyncAccountSetting,
}