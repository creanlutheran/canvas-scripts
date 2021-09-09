// ==UserScript==
// @name         Set Canvas Default Due Times
// @version      1.0
// @description  Allows user to set default due date times in Canvas
// @author       Ben Fisher (ben.fisher@creanlutheran.org)
// @include      https://*.instructure.com/courses/*/assignments/*/edit
// @include      https://*.instructure.com/courses/*/assignments/new
// @include	 https://*.instructure.com/courses/*/assignments/new?quiz_lti
// @include      https://*.instructure.com/courses/*/assignments/edit?quiz_lti
// @include      https:/*.instructure.com/courses/*/discussion_topics/new
// @include      https://*.instructure.com/courses/*/discussion_topics/new
// @include      https://*.instructure.com/courses/*/discussion_topics/*/edit
// @include      https://*.instructure.com/courses/*/quizzes/*/edit
// @include      https://*.instructure.com/courses/*/quizzes/*/edit
// @require      https://unpkg.com/dayjs@1.8.21/dayjs.min.js



// ==/UserScript==
(function() {

	$(document).ready(function() {


		setTimeout(function() {

			// change the times below to set default due date times

			/**
			 * defaultTimes is an array of 24 hour times in HH:MM format
			 * timeFormat is the default format for displaying times
			 *   see https://day.js.org/docs/en/display/format for more info
			 */

			const defaultTimes = ['07:55', '09:50', '11:20', '13:15'];
			const timeFormat = 'h:mma';

			const today = dayjs().format('YYYY-MM-DD');
			const displayTimes = defaultTimes.map(t =>
				dayjs(`${today} ${t}`).format(timeFormat)
			);


			var dueDate_ids = [];

			// adds existing due date input ids to array
			(function() {
				$('input.DueDateInput[type=text').each(function() {
					dueDate_ids.push(this.id);
				});

				$('.DueDateInput__Container ').each(function(i, obj) {
					$(this).addClass(`existing_date_input_row_${dueDate_ids[i]}`);

				});

			})();


			// loops through each existing due date input and adds all default due time input buttons to each due date input
			for (let i = 0; i < dueDate_ids.length; i++) {

				for (let j = 0; j < displayTimes.length; j++) {

					$(`.existing_date_input_row_${dueDate_ids[i]}`).append(`<input type="text" class="existing_date_custom_picker_${dueDate_ids[i]}_${[j]}" readonly="readonly" value="${displayTimes[j]}" style="background: #f5f5f5;color: #2d3b45; margin: 10px 5px 0px 0px; max-width: 75px; border: 1px solid rgb(199, 205, 209); border-radius: 3px; transition: background-color 0.2s ease-in-out 0s; display: inline-block; position: relative; padding: 8px 2px; font-size: 1rem; line-height: 20px; text-align: center; vertical-align: middle; text-decoration: none; overflow: hidden; text-shadow: none; user-select: none; cursor: pointer !important;">`);
					$(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).hover(function() {
						$(this).css("background-color", "#e8e8e8");
					}, function() {
						$(this).css("background-color", "#f5f5f5");
					});
					$(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).datepicker({
						dateFormat: "yy-mm-dd " + defaultTimes[j],
						onSelect: function() {
							$(this).closest('div').find('.DueDateInput').val($(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).val()).trigger("change");
							$(this).change(function() {
								$(`.existing_date_custom_picker_${dueDate_ids[i]}_${[j]}`).val(displayTimes[j]);
							});
						}

					});
				}

			}



			// adds all default due time input buttons to each new due date input when +Add is clicked in Canvas
			$("#add_due_date").click(function() {


				setTimeout(function() {

					var lastRow_id_added = $('.Container__DueDateRow-item').find('input.DueDateInput[type=text]').last().attr("id");

					for (let i = 0; i < displayTimes.length; i++) {
						$('.Container__DueDateRow-item').find('.DueDateInput__Container').last().append(`<input type="text" class="added_date_custom_picker_${lastRow_id_added}_${i}" readonly="readonly" value="${displayTimes[i]}" style="background: #f5f5f5;color: #2d3b45; margin: 10px 5px 0px 0px; max-width: 75px; border: 1px solid rgb(199, 205, 209); border-radius: 3px; transition: background-color 0.2s ease-in-out 0s; display: inline-block; position: relative; padding: 8px 2px; font-size: 1rem; line-height: 20px; text-align: center; vertical-align: middle; text-decoration: none; overflow: hidden; text-shadow: none; user-select: none; cursor: pointer !important;">`);

						$(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
							.hover(function() {
								$(this).css("background-color", "#e8e8e8");
							}, function() {
								$(this).css("background-color", "#f5f5f5");
							});

						$(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
							.datepicker({
								dateFormat: "yy-mm-dd " + defaultTimes[i],
								onSelect: function() {
									$(this).closest('div').find('.DueDateInput')
										.val($(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
											.val()).trigger("change");
									$(this).change(function() {
										$(`.added_date_custom_picker_${lastRow_id_added}_${i}`)
											.val(displayTimes[i]);
									});
								}

							});
					}

				}, 1000);

			});

		}, 2000);

	})

})();
