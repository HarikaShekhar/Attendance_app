/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

$(function(){
    var view = {
        init: function(){
            var attendance = JSON.parse(localStorage.attendance);
            this.nameColumns = $('tbody .name-col');

            this.nameColumns.each(function(){
                var name = this.innerText;
                var days = attendance[name];
                var parentTr = $(this).parent('tr');

                var htmlStr = '';
                var daysAttended = 0, daysMissed = 0, totaldays = days.length;

                for (var i = 0; i < totaldays; i++) {
                    if (days[i]) {
                        htmlStr += '<td class="attend-col"><input type="checkbox" checked=true></td>';
                        daysAttended += Number(days[i]);
                    }
                    else {
                        htmlStr += '<td class="attend-col"><input type="checkbox"></td>';
                    }
                }

                daysMissed = totaldays - daysAttended;
                htmlStr += '<td class="missed-col">' + daysMissed + '</td>';
                parentTr.append(htmlStr);
            });

            this.manageAttendance();
        },
        manageAttendance: function(){
            var $allCheckboxes = $('tbody input');

            $allCheckboxes.click(function(){
                this.currentMissedCol = $(this).parent().siblings('.missed-col');
                var daysMissed = 0;

                this.currentInputs = this.currentMissedCol.siblings('.attend-col').find('input');

                this.currentInputs.each(function(){
                    if(!($(this).prop('checked'))) {
                        daysMissed++;

                    }
                })

                this.currentMissedCol.text(daysMissed);

                var newAttendance = {};

                var studentRows = $('tbody .student'),
                    newAttendance = {};

                studentRows.each(function() {
                    var name = $(this).children('.name-col').text(),
                        $allCheckboxes = $(this).children('td').children('input');

                    newAttendance[name] = [];

                    $allCheckboxes.each(function() {
                        newAttendance[name].push($(this).prop('checked'));
                    });
                });
                // console.log(newAttendance);
                localStorage.attendance = JSON.stringify(newAttendance);
            });
        }
    };

    view.init();
}());