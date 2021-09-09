// ==UserScript==
// @name         SetDefaultDueTimes
// @version      0.1
// @description  Allows user to set default due date times in Canvas
// @author       Ben Fisher (ben.fisher@creanlutheran.org)
// @include      https:/*.instructure.com/courses/*/assignments/*
// @include      https:/*.instructure.com/courses/*/discussion_topics/*
// @include      https:/*.instructure.com/courses/*/quizzes/*

// ==/UserScript==
(function() {

	$(document).ready(function() {

		setTimeout(function() {



			const dueTime12hrs = ["7:55am", "9:50am", "11:20am", "1:15pm"];

			const dueTime24hrs = ["07:55", "09:50", "11:20", "13:15"];

			var dueDate_ids = [];

			(function() {
				$('input.DueDateInput[type=text').each(function() {
					dueDate_ids.push(this.id);
				});

				alert(dueDate_ids);

				$('.DueDateInput__Container ').each(function(i, obj) {
					$(this).addClass(`existing_date_input_row_${dueDate_ids[i]}`);

				});

			})();

			for (let i = 0; i < dueTime12hrs.length; i++) {

				for (let j = 0; j < dueTime12hrs.length; j++) {

					$(`.existing_date_input_row_${dueDate_ids[i]}`).append(`<input type="text" class="existing_date_custom_picker_${dueDate_ids[i]}_${[j]}" readonly="readonly" value="${dueTime12hrs[j]}" style="background: #f5f5f5;color: #2d3b45; margin: 10px 5px 0px 0px; max-width: 75px; border: 1px solid rgb(199, 205, 209); border-radius: 3px; transition: background-color 0.2s ease-in-out 0s; display: inline-block; position: relative; padding: 8px 2px; font-size: 1rem; line-height: 20px; text-align: center; vertical-align: middle; text-decoration: none; overflow: hidden; text-shadow: none; user-select: none; cursor: pointer !important;">`);
					$(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).hover(function() {
						$(this).css("background-color", "#e8e8e8");
					}, function() {
						$(this).css("background-color", "#f5f5f5");
					});
					$(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).datepicker({
						dateFormat: "yy-mm-dd " + dueTime24hrs[j],
						onSelect: function() {
							$(this).closest('div').find('.DueDateInput').val($(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).val()).trigger("change");
							$(this).change(function() {
								$(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).val(dueTime12hrs[j]);
							});
						}

					});
				}

			}




			$("#add_due_date").click(function() {


				setTimeout(function() {

					var lastRow_id_added = $('.Container__DueDateRow-item').find('input.DueDateInput[type=text]').last().attr("id");

					for (let i = 0; i < dueTime12hrs.length; i++) {
						$('.Container__DueDateRow-item').find('.DueDateInput__Container').last().append(`<input type="text" class="added_date_custom_picker_${lastRow_id_added}_${i}" readonly="readonly" value="${dueTime12hrs[i]}" style="background: #f5f5f5;color: #2d3b45; margin: 10px 5px 0px 0px; max-width: 75px; border: 1px solid rgb(199, 205, 209); border-radius: 3px; transition: background-color 0.2s ease-in-out 0s; display: inline-block; position: relative; padding: 8px 2px; font-size: 1rem; line-height: 20px; text-align: center; vertical-align: middle; text-decoration: none; overflow: hidden; text-shadow: none; user-select: none; cursor: pointer !important;">`);

						alert("List of 12hr array" + dueTime12hrs);

						$(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
							.hover(function() {
								$(this).css("background-color", "#e8e8e8");
							}, function() {
								$(this).css("background-color", "#f5f5f5");
							});

						$(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
							.datepicker({
								dateFormat: "yy-mm-dd " + dueTime24hrs[i],
								onSelect: function() {
									$(this).closest('div').find('.DueDateInput')
										.val($(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
											.val()).trigger("change");
									$(this).change(function() {
										$(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
											.val(dueTime12hrs[i]);
									});
								}

							});
					}

				}, 1000);

			});

		}, 2000);

	})

})();
