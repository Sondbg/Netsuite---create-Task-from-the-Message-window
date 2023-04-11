/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/record', 'N/currentRecord', 'N/ui/dialog', 'N/runtime'],
    /**
     * @param{log} log
     * @param{record} record
     */
    function (log, record, currentRecord, dialog, runtime) {
        function createTask() {

            try {

                var currMsg = currentRecord.get();
                var memo = currMsg.getValue({
                    fieldId: "custpage_task_memo"
                });

                var taskType = currMsg.getValue({
                    fieldId: "custpage_create_activity_checkbox"
                });

                var taskTitle = currMsg.getValue({
                    fieldId: "custpage_task_name"
                });

                var dateTask = currMsg.getValue({
                    fieldId: "custpage_task_date"
                });

                var startTime = currMsg.getValue({
                    fieldId: "custpage_task_start_time"
                });

                var endTime = currMsg.getValue({
                    fieldId: "custpage_task_end_time"
                });

                var reminder = currMsg.getValue({
                    fieldId: "custpage_task_reminder"
                });

                var arrValues = [{
                    "value": memo,
                    "text": "Съобщение"
                },
                {
                    "value": taskTitle,
                    "text": "Име на задачата"
                },
                {
                    "value": taskType,
                    "text": "Тип задача"
                },
                {
                    "value": dateTask,
                    "text": "Дата"
                },
                {
                    "value": startTime,
                    "text": "Начален час"
                },
                {
                    "value": endTime,
                    "text": "Краен час"
                },
                {
                    "value": reminder,
                    "text": "Напомняне"
                },
                ];
                var error = arrValues.filter((field) => {
                    return field.value.length < 1
                })
                log.debug('липсващи данни',error)

            } catch (err) {
                log.error("Error creating the Activity", err)
            }
        }


        return {
            createTask
        };

    });
