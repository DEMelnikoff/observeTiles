
var condition = jsPsych.randomization.sampleWithReplacement([1, 0], 1)

jsPsych.data.addProperties({
    activeCondition: condition
});

function MakeTimeline(game) {
    this.timeline = [
    game.intro.r1part1, 
    game.intro.r1part2, 
    game.intro.r1part3,
    game.task.round1,
    game.Qs.round1,
    game.intro.r2part1,
    game.intro.r2part2,
    game.intro.r2part3,
    game.task.round2,
    game.Qs.round2,
    game.Qs.demographics
    ]
};

if (condition == 1) {
    var exp = new MakeTimeline(activeGame);
} else if (condition == 0 ) {
    var exp = new MakeTimeline(passiveGame);
};

jsPsych.init({
    timeline: exp.timeline,
    // on_interaction_data_update: function(data) {
    //     jsPsych.data.get().push(data);
    // },
    on_data_update: function() {
        database.ref(firebase.auth().currentUser.uid).set({
            data: jsPsych.data.get().values()
        });
    },
    on_finish: function() {
        firebase.database().ref(firebase.auth().currentUser.uid).set({
            data: jsPsych.data.get().values()
        });
        document.body.innerHTML = '<p><p><p align="center">Thank you for participating in the study!<p align="center"><b>You will be automatically re-directed to Prolific in a few moments.</b></p>';
        setTimeout(function () { location.href = "https://app.prolific.co/submissions/complete?cc=865BE374" }, 5000);
    }
});