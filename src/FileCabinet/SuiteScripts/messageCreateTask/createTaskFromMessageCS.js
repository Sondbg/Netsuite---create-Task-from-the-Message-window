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

                var arrValues = [
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
                    {
                        "value": memo,
                        "text": "Съобщение"
                    },
                ];
                var fieldsMissing = arrValues.filter((field) => {
                    return field.value.length < 1
                });

                if (fieldsMissing.length > 0) {
                    var dialogMsg = fieldsMissing.reduce((text, currValue) => {
                        return text + `<br>${currValue.text}`
                    }, "<b>Попълнете полетата!</b>")
                    dialog.alert({
                        title: "Моля попълнете следните полета:",
                        message: dialogMsg
                    })

                    return
                }
                // if(startTime.toString()==endTime.toString()){
                //     dialog.alert({
                //         title: "Часовете не бива да се съвпадат!",
                //         message: `Крайният час трябва да е различен от началният!`
                //     })
                //     return
                // }
                var user = runtime.getCurrentUser();
                createActivity(taskType, memo, reminder, dateTask, taskTitle, user.id)
            } catch (err) {
                log.error("Error creating the Activity", err)
            }


            function createActivity(taskType, memo, reminder, dateTask, taskTitle, user) {
                var dateObj= Date.now();
                dateObj.setHours(8);

                var defaultActivityValues = {
                    task: {
                        "title": taskTitle,
                        "assigned": user,
                        "status": "PROGRESS",
                        "startdate": dateTask,
                        "timedevent": true,
                        "starttime": dateObj,
                        "endtime": dateObj,
                        "remindertype": "EMAIL",
                        "reminderminutes": reminder,
                        "message": memo,
                        "sendemail":false
                    },

                }
                var activityRecord = record.create({
                    type: taskType,
                    isDynamic: true
                });


                for (var fieldID in defaultActivityValues[taskType]) {
                    activityRecord.setValue({
                        fieldId: fieldID,
                        value: defaultActivityValues[taskType][fieldID]
                    });
                }
                activityRecord.save.promise().then(function (response) {
                    dialog.alert({
                        title: "Създадена задача!",
                        message: "Задачата ви е създадена!"
                    });

                    log.debug("task ID", response)
                }, function (error) {
                    log.error({
                        title: "error creating Activity",
                        details: error
                    })
                });
            }

        }


        return {
            createTask
        };

    });
