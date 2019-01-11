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
        tree: [
            {
                title: '我的文件夹',
                key: 1,
                children: [
                    {
                        title: '语文',
                        key: 2,
                        children: [
                            {
                                title: '初一',
                                key: 4,
                                children: [
                                    
                                ],
                            },
                        ],
                    },
                    {
                        title: '数学',
                        key: 3,
                        children: [
                            
                        ],
                    },
                ],
            }
        ]
    }
]