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
        title: '我的文件夹',
        to: '/admin/note/folder',
        type: 'tree',
        key: '/admin/note/folder',
        id: 0,
        children: [
            {
                title: '我的文件夹',
                id: 1,
                children: [
                    {
                        title: '语文',
                        id: 2,
                        children: [
                            {
                                title: '初一',
                                id: 4,
                                children: [
                                    {
                                        title: '初一',
                                        id: 5,
                                        children: [
                                            {
                                                title: '初一',
                                                id: 6,
                                                children: [
                                                    {
                                                        title: '初一',
                                                        id: 7,
                                                        children: [
                                                            
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        title: '数学',
                        id: 3,
                        children: [
                            
                        ],
                    },
                ],
            }
        ]
    }
]