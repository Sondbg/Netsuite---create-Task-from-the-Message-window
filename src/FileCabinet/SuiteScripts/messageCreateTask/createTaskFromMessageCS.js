/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/record', 'N/currentRecord', 'N/ui/dialog', 'N/runtime', "./params/params.js"],
    /**
     * @param{log} log
     * @param{record} record
     */
    function (log, record, currentRecord, dialog, runtime, params) {
        function pageInit(context){

        }
        function createTask() {

            try {

                var currMsg = currentRecord.get();
                var memo = currMsg.getValue({
                    fieldId: params.FIELDS.MEMO.id
                });

                var taskType = currMsg.getValue({
                    fieldId: params.FIELDS.TYPE.id
                });

                var dateTask = currMsg.getValue({
                    fieldId: params.FIELDS.DATE.id
                });

                var recipient = currMsg.getText({
                    fieldId: "recipient"
                });

                var title="Напомняне за връзка c клиент:"+recipient;

                var arrValues = [
                    {
                        "value": taskType,
                        "text": "Тип задача"
                    },
                    {
                        "value": dateTask,
                        "text": "Дата за напомняне"
                    },
                    {
                        "value": memo,
                        "text": "Съобщение"
                    },
                ];
                var fieldsMissing = arrValues.filter(function (field) {
                    return field.value.length < 1
                });

                if (fieldsMissing.length > 0) {
                    var dialogMsg = fieldsMissing.reduce(function (text, currValue) {
                        return text + "<br>"+currValue.text
                    }, "<b>Попълнете полетата!</b>")
                    dialog.alert({
                        title: "Моля попълнете следните полета:",
                        message: dialogMsg
                    })

                    return
                }

                var user = runtime.getCurrentUser();
                createActivity(taskType, memo, dateTask, title, user.id)
            } catch (err) {
                log.error("Error creating the Activity", err)
            }


            function createActivity(taskType, memo, dateTask, taskTitle, user) {
                var dateObj= new Date();
                dateObj.setHours(8);
                var endDate= new Date();
                endDate.setHours(9);
                var defaultActivityValues = {
                        "title": taskTitle,
                        "assigned": user,
                        "startdate": dateTask,
                        "timedevent": true,
                        "starttime": dateObj,
                        "endtime": endDate,
                        "remindertype": "EMAIL",
                        "reminderminutes": "0",
                        "message": memo,
                }
                var activityRecord = record.create({
                    type: taskType,
                    isDynamic: true
                });


                for (var fieldID in defaultActivityValues) {
                    activityRecord.setValue({
                        fieldId: fieldID,
                        value: defaultActivityValues[fieldID]
                    });
                }
                if (taskType=="task"){
                    activityRecord.setValue({
                        fieldId: "sendemail",
                        value: false
                    });
                    activityRecord.setValue({
                        fieldId: "status",
                        value: "PROGRESS"
                    });
                }
                activityRecord.save.promise().then(function (response) {
                    dialog.alert({
                        title: "Създадена задача!",
                        message: "Задачата ви e създадена!"
                    });
                    clearTaskInput()
                    
                }, function (error) {
                    log.error({
                        title: "error creating Activity",
                        details: error
                    })
                    dialog.alert({
                        title: "ГРЕШКА!!!!",
                        message: "<b>ГРЕШКА ПРИ СЪЗДАВАНЕТО, МОЛЯ ОБЪРНЕТЕ CE КЪМ АДМИНИСТРАТОР!</b>"
                    });
                });
            }

            function clearTaskInput(){
                currMsg.setValue({
                    fieldId: "custpage_task_date",
                    value: ""
                });
                currMsg.setValue({
                    fieldId: "custpage_task_date",
                    value: ""
                });
                currMsg.setValue({
                    fieldId: "custpage_task_memo",
                    value: ""
                });
            }

        }


        return {
            pageInit:pageInit,
            createTask:createTask
        };

    });
