



var ChromaticScale = {
    scale: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
    UserInputNotes: [],
    allChordsOutput: [],
    UltimateRootNote: 'A',
    init: function (UserInputNotes) {
        this.UserInputNotes = UserInputNotes;
        // Perform other initialization tasks
        this.getChord();
        // console.log(this.UserInputNotes);  //just checking user array
    },

    getScale: function () {

        var NewScale = [];
        var StartingIdx = this.scale.indexOf(this.UserInputNotes[0]);

        for (var i = 0; i < this.scale.length; i++) {
            var NewIdx = (StartingIdx + i) % this.scale.length;
            NewScale.push(this.scale[NewIdx]);
        }

        return NewScale;
    },

    getChord: function () {
        var NewScale = this.getScale(this.UserInputNotes);
        //console.log(NewScale); //just checking if scale was correct
        var IntervalFinder = [];

        for (let j = 0; j < this.UserInputNotes.length; j++) {
            for (let i = 0; i < NewScale.length; i++) {
                if (this.UserInputNotes[j] === NewScale[i]) {
                    IntervalFinder.push(i);
                    //console.log(i);  //this is just to check if interval index is correct

                }
            }
        }


        var FinalChord = ChordLibrary[JSON.stringify(IntervalFinder)];
        if (this.UserInputNotes[0] === this.UltimateRootNote && FinalChord !== undefined) 
        {
            console.log(this.UserInputNotes[0] + FinalChord);
            this.allChordsOutput.push(this.UserInputNotes[0] + FinalChord);        
        
        }

        else if (this.UserInputNotes[0] !== this.UltimateRootNote && FinalChord !== undefined)
        {
            console.log(this.UserInputNotes[0] + FinalChord);
            this.allChordsOutput.push(this.UserInputNotes[0] + FinalChord);
            if (IntervalFinder.length > 2)
            {
                console.log(this.UserInputNotes[0] + FinalChord + "/" + this.UltimateRootNote);
                this.allChordsOutput.push(this.UserInputNotes[0] + FinalChord + "/" + this.UltimateRootNote); 
            }
        }
        
        console.log(this.allChordsOutput); //this is just for testing reasons
        const chordOutputDiv = document.querySelector(".chordOutput");
        chordOutputDiv.innerHTML = this.allChordsOutput.join("<br>");
    },



};

document.querySelector(".container").addEventListener('change', function () {  //USER NOTES ARRAY IS GOTTEN FROM INPUT ARRAY GENERATOR
    var UserInputNotes = [...new Set(UserNotesArray)];            //basically converting array into set which removes dupes and using spread[...] syntax to convert it back into an array
    UserInputNotes = UserInputNotes.filter(item => item != null); //filtering out null values
    UserInputNotes_Permutated = permuteArray(UserInputNotes);
    ChromaticScale.UltimateRootNote = UserInputNotes[0];
    for (let permutation of UserInputNotes_Permutated) { 
        ChromaticScale.init(permutation);
    }
            ChromaticScale.allChordsOutput.splice(0, ChromaticScale.allChordsOutput.length);
});

//ChromaticScale.init(UserInputNotes);

