/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record','./params/params.js'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record, params) => {
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
                id: params.SETTINGS.TAB.ID,
                label: params.SETTINGS.TAB.LABEL
            })

            form.addFieldGroup({
                id: params.SETTINGS.GROUP.ID,
                label: params.SETTINGS.GROUP.LABEL,
                tab: params.SETTINGS.TAB.ID
            })

            var taskType = form.addField({
                id: params.FIELDS.TYPE.id,
                label: params.FIELDS.TYPE.label,
                type: params.FIELDS.TYPE.type,
                container: params.SETTINGS.GROUP.ID,
            });
            
            taskType.addSelectOption({
                value: 'task',
                text: 'Task'
            });
            taskType.addSelectOption({
                value: 'phonecall',
                text: 'Phone Call'
            });
            
            var date=form.addField({
                id: params.FIELDS.DATE.id,
                label: params.FIELDS.DATE.label,
                type: params.FIELDS.DATE.type,
                container: params.SETTINGS.GROUP.ID
            });


            var memo = form.addField({
                id: params.FIELDS.MEMO.id,
                label: params.FIELDS.MEMO.label,
                type: params.FIELDS.MEMO.type,
                container: params.SETTINGS.GROUP.ID
            });

            memo.updateBreakType({
                breakType: "startcol"
            })

            form.clientScriptModulePath = './createTaskFromMessageCS.js';

            form.addButton({
                id: params.FIELDS.BUTTON.id,
                label: params.FIELDS.BUTTON.label,
                functionName: "createTask()"
            })

        }



        return { beforeLoad }

    });
