/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define([],
    function () {
        var params={
    SETTINGS: {
        TAB: {
            ID: "custpage_activity_tab_msg",
            LABEL: "Задачи"
        },
        GROUP: {
            ID: "custpage_group_activities",
            LABEL: "Създаване на задача"
        }
    },
    FIELDS: {
        TYPE: {
            id: "custpage_create_activity_type",
            label: "Тип задача",
            type: "select"
        },
        DATE: {
            id: "custpage_task_date",
            label: "Дата за напомняне:",
            type: "date"
        },
        MEMO: {
            id: "custpage_task_memo",
            label: "Съобщение:",
            type: "longtext"
        },
        BUTTON: {
            id: "custpage_createTask_btn",
            label: "Създай задача",
        }
    }
}

return params
})