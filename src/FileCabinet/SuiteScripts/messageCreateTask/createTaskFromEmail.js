/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            var form = scriptContext.form;

            var taskTab = form.addTab({
                id: "custpage_activity_tab_msg",
                label: "Задачи"
            })

            form.addFieldGroup({
                id: "custpage_group_activities",
                label: "Създаване на задача",
                tab: "custpage_activity_tab_msg"
            })

            var taskType = form.addField({
                id: "custpage_create_activity_checkbox",
                label: "Тип задача",
                type: "select",
                container: "custpage_group_activities"
            });

            taskType.addSelectOption({
                value: 'task',
                text: 'Task'
            });
            taskType.addSelectOption({
                value: 'phonecall',
                text: 'Phone Call'
            });
            taskType.addSelectOption({
                value: 'calendarevent',
                text: 'Event'
            });
            form.addField({
                id: "custpage_task_name",
                label: "Име на задачата",
                type: "text",
                container: "custpage_group_activities"
            });

             form.addField({
                id: "custpage_task_date",
                label: "Дата:",
                type: "date",
                container: "custpage_group_activities"
            });

            var startTime = form.addField({
                id: "custpage_task_start_time",
                label: "Начален час:",
                type: "TIMEOFDAY",
                container: "custpage_group_activities"
            });

            startTime.updateBreakType({
                breakType: "startcol"
            });

            form.addField({
                id: "custpage_task_end_time",
                label: "Краен час:",
                type: "TIMEOFDAY",
                container: "custpage_group_activities"
            });

            var reminder = form.addField({
                id: "custpage_task_reminder",
                label: "Напомняне:",
                type: "select",
                container: "custpage_group_activities"
            });

            var memo = form.addField({
                id: "custpage_task_memo",
                label: "Съобщение:",
                type: "longtext",
                container: "custpage_group_activities"
            });

            memo.updateBreakType({
                breakType: "startcol"
            })


            form.clientScriptModulePath = './createTaskFromMessageCS.js';

            form.addButton({
                id: "custpage_createTask_btn",
                label: "Създай задача",
                functionName: "createTask()"
            })
            var minutes = {
                "0 minutes": 0,
                "5 minutes": 5,
                "10 minutes": 10,
                "15 minutes": 25,
                "30 minutes": 30,
                "1 hour": 60,
                "2 hours": 120,
                "3 hours": 180,
                "4 hours": 240,
                "5 hours": 300,
                "8 hours": 480,
                "12 hours": 720,
                "1 day": 1440,
                "2 days": 2880,
                "3 days": 4320,
                "1 week": 10080,
            }

            for (var time in minutes) {
                reminder.addSelectOption({
                    value: minutes[time],
                    text: time
                });
            }
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }



        return { beforeLoad, beforeSubmit }

    });
