export const NAVLIST = [
    {
        title: '添加笔记',
        icon: 'plus',
        type: 'text',
        key: 'new',
    },
    {
        title: '最新笔记',
        to: '/admin/note/recent',
        icon: 'profile',
        type: 'nav',
        key: '/admin/note/recent',
    },
    {
        title: '笔记趋势图',
        to: '/admin/note/trendMap',
        icon: 'bar-chart',
        type: 'nav',
        key: '/admin/note/trendMap',
    },
    {
        title: '草稿',
        to: '/admin/note/unsaved',
        icon: 'file-unknown',
        type: 'nav',
        key: '/admin/note/unsaved',
    },
    {
        name: '我的文件夹',
        to: '/admin/note/folder',
        type: 'tree',
        key: '/admin/note/folder',
        id: 0,
        children: [],
    }
];

export const CONTEXT_MENU = [
    {
        type: 'Menu',
        id: 'item-context-menu',
        animation: 'fade',
        children: [
            {
                type: 'Submenu',
                label: '新建',
                children: [
                    {
                        type: 'Item',
                        label: '笔记',
                        onClick: {
                            opt: 'new',
                            extra: {
                                type: 'txt',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: 'Markdown',
                        onClick: {
                            opt: 'new',
                            extra: {
                                type: 'md',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: '文件夹',
                        onClick: {
                            opt: 'new',
                            extra: {
                                type: 'folder',
                            }
                        }
                    }
                ]
            },
            {
                type: 'Separator'
            },
            {
                type: 'Item',
                label: '重命名',
                onClick: {
                    opt: 'rename',
                    extra: {
                        type: 'folder',
                    }
                }
            },
            {
                type: 'Item',
                label: '删除',
                onClick: {
                    opt: 'delete',
                    extra: {
                        type: 'folder',
                    }
                }
            }
        ]
    },
    {
        type: 'Menu',
        id: 'root-context-menu',
        animation: 'fade',
        children: [
            {
                type: 'Submenu',
                label: '新建',
                children: [
                    {
                        type: 'Item',
                        label: '笔记',
                        onClick: {
                            opt: 'new',
                            extra: {
                                type: 'txt',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: 'Markdown',
                        onClick: {
                            opt: 'new',
                            extra: {
                                type: 'md',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: '文件夹',
                        onClick: {
                            opt: 'new',
                            extra: {
                                type: 'folder',
                            }
                        }
                    }
                ]
            }
        ]
    }
]