
                questions.DetailTable = await $('#questionsTable').DataTable({
                    stateSave: true,
                    stateSaveCallback: function (settings, data) {
                        localStorage.setItem('questionsTable' + settings.sInstance, JSON.stringify(data))
                    },
                    stateLoadCallback: function (settings) {
                        return JSON.parse(localStorage.getItem('questionsTable' + settings.sInstance))
                    },
                    rowId: 'questionId',
                    columnDefs: [
                        { width: 25, targets: 0 }
                    ],
                    columns: [
                        {
                            "title": "", "data": "questionId", "searchable": false, "width": "6%",
                            "render": function (data, type, row) {
                                let actions = ""
                                actions += `<i class="fas fa-cogs" data='${JSON.stringify(row)}' onClick='questions.ShowQuestionModal(this);' ></i>`;
                                actions += row.questionTypeKey == 'OPCION_MULTIPLE' || row.questionTypeKey == 'OPCION_MULTIPLE_LIST' ? `<i class="fas fa-plus-circle" data='${JSON.stringify(row)}' onClick='questions.ShowQuestionOptions(this);' ></i>` : '';
                                return actions;
                            }
                        },
                        {
                            "title": "Llave", "data": "questionKey"
                        },
                        {
                            "title": "Pregunta", "data": "questionValue"
                        },
                        { "title": "Tipo de Pregunta", "data": "questionTypeName" },
                        {
                            "title": "Tipo de Dato", "data": "dataName",
                            "render": function (data, type, row) {
                                return row.questionTypeKey == 'OPCION_MULTIPLE' || row.questionTypeKey == 'OPCION_MULTIPLE_LIST' ? '' : data;
                            }
                        },
                        {
                            "title": "Activo", "data": "active", "searchable": false,
                            "render": function (data, type, row) {
                                if (type === "sort" || type === "type") {
                                    return data;
                                }
                                return data === true ? '<i class="fas fa-check"></i>' : '';
                            }
                        }
                    ],
                    searching: true,
                    ajax: {
                        type: "POST",
                        url: URL + "/Settings/GetCatalogQuestions",
                        data: function () {
                            return {
                                RequestTypeId: $('#SelRequestType').val(),
                                QuestionnaireTemplateId: $('#SelTemplateSections').val(),
                                Active: $('#SelStatus').val()
                            }
                        },
                        dataSrc: function (response) {
                            return response.data;
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    },
                    fnDrawCallback: function () {
                        $(`#questionsTable > tbody > tr[id="${questions.DetailSelectedRow}"]`).addClass('selected');
                    }
                });

                
                questions.OptionTable.ajax.reload(null, false);