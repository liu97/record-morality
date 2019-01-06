import asyncComponent from 'components/asyncComponent/common'


import ArticleDetail from 'pages/Article/Detail';
import ArticleEdit from 'pages/Article/Edit';
import MessageList from 'pages/Message/List';
import MessageDetail from 'pages/Message/Detail';

const AsyncLaR = asyncComponent(() => import(/* webpackChunkName: "LaR" */ 'pages/LaR'));
const AsyncApp = asyncComponent(() => import(/* webpackChunkName: "app" */ 'containers/App'));
const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "home" */ 'pages/Home'));
const AsyncErrorPage = asyncComponent(() => import(/* webpackChunkName: "errorPage" */ 'pages/Error/ErrorPage'));
const AsyncError = asyncComponent(() => import(/* webpackChunkName: "error" */ 'pages/Error'));
const AsyncArticleList = asyncComponent(() => import(/* webpackChunkName: "articleList" */ 'pages/Article/List'));
const AsyncArticleAdd = asyncComponent(() => import(/* webpackChunkName: "articleAdd" */ 'pages/Article/Add'));

export {
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
}