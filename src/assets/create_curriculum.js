import CONST from "@/assets/consts";

function transTime(){
    const day = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const list = []
    for(let i = 0; i < 70; i ++){
        list.push({
            label: day[parseInt(i/10)] +' 第' + (i%10 + 1) +'节',
            value: i
        })
    }
    return list
}

function transCat() {
    const list = [];
    for (let i = 0; i < CONST.categoryList.length; i++) {
        list.push({
            label: CONST.categoryList[i],
            value: i
        })
    }
    return list
}

function transDept() {
    const list = [];
    for (let i = 0; i < CONST.departmentList.length; i++) {
        list.push({
            label: CONST.departmentList[i],
            value: i
        })
    }
    return list
}

export default {
    form: [
        {
            gutter: 20,
            items: [
                {
                    offset: 1,
                    span: 16,
                    item:{
                        model: 'curriculum_name',
                        label: '名称',
                        type: 'input'
                    }
                },
                {
                    span: 7,
                    item:{
                        model: 'category',
                        label: '类别',
                        type: 'select',
                        opts: transCat()
                    }
                },
            ]
        },
        {
            gutter: 20,
            items: [
                {
                    offset: 1,
                    span: 9,
                    item:{
                        model: 'department',
                        label: '院系',
                        type: 'multiSelect',
                        opts: transDept()
                    }
                },
                {
                    span: 7,
                    item:{
                        model: 'time',
                        label: '时间',
                        type: 'multiSelect',
                        opts: transTime()


                    }
                },
                {
                    span: 7,
                    item: {
                        model: 'semester',
                        label: '学期',
                        type: 'select',
                        opts: [
                            {
                                label: '2021-2022 1',
                                value: 0
                            },
                            {
                                label: '2021-2022 2',
                                value: 1
                            },
                            {
                                label: '2021-2022 3',
                                value: 2
                            }
                        ]
                    }
                },
            ],
        },
        {
            gutter: 20,
            items: [
                {
                    offset: 1,
                    span: 10,
                    item: {
                        model: 'teacher',
                        label: '教师',
                        type: 'input'
                    }
                },
                {
                    span: 8,
                    item: {
                        model: 'upper_limit',
                        label: '人数',
                        type: 'inputNumber',
                        min: 1,
                        max: 100
                    }
                },
                {
                    span: 5,
                    item:{
                        model: 'credit',
                        label: '学分',
                        type: 'select',
                        opts: [
                            { label: '1', value: 1},
                            { label: '2', value: 2},
                            { label: '3', value: 3},
                            { label: '4', value: 4},
                            { label: '5', value: 5},
                            { label: '6', value: 6}
                        ]
                    }
                }
            ]
        },
        {
            gutter: 20,
            items: [
                {
                    offset: 1,
                    span: 23,
                    item: {
                        model: 'requirement',
                        label: '要求',
                        type: 'textInput'
                    }
                }
            ]
        },
        {
            gutter: 20,
            items: [
                {
                    span: 23,
                    offset: 1,
                    item: {
                        model: 'introduction',
                        label: '简介',
                        type: 'textInput'
                    }
                }
            ]
        },
        {
            gutter: 20,
            items: [
                {
                    span: 23,
                    offset: 1,
                    item: {
                        model: 'remark',
                        label: '备注',
                        type: 'textInput'
                    }
                }
            ]
        }
    ],
}
