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
        key: 'recent',
    },
    {
        title: '笔记趋势图',
        to: '/admin/note/trendMap',
        icon: 'bar-chart',
        type: 'nav',
        key: 'trendMap',
    },
    {
        name: '我的文件夹',
        to: '/admin/note/folder',
        type: 'tree',
        key: 'folder',
        id: 0,
        ancestors: [],
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
                        clickInfo: {
                            opt: 'new',
                            extra: {
                                type: 'txt',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: 'Markdown',
                        clickInfo: {
                            opt: 'new',
                            extra: {
                                type: 'md',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: '文件夹',
                        clickInfo: {
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
                clickInfo: {
                    opt: 'rename',
                    extra: {
                        type: 'folder',
                    }
                }
            },
            {
                type: 'Item',
                label: '删除',
                clickInfo: {
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
                        clickInfo: {
                            opt: 'new',
                            extra: {
                                type: 'txt',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: 'Markdown',
                        clickInfo: {
                            opt: 'new',
                            extra: {
                                type: 'md',
                            }
                        }
                    },
                    {
                        type: 'Item',
                        label: '文件夹',
                        clickInfo: {
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