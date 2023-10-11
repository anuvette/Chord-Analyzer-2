// defining an object that establishes the intervals between notes
const Intervals = {
    unison: 0,
    minor_second: 1,
    major_second: 2,
    minor_third: 3,
    major_third: 4,
    perfect_fourth: 5,
    sharp_fourth:6,
    flat_fifth: 6,
    perfect_fifth: 7,
    sharp_fifth: 8,
    sixth: 9,
    flat_seventh: 10,
    major_seventh: 11,
    octave: 12,
    flat_ninth: 1,        //1+12
    major_ninth: 2,      //2+12
    sharp_ninth: 3,     //3+12
    eleventh: 5,       //actually it is 5+12 or a perfect_fourth an octave up
    sharp_eleven: 6,  //actually it is 6+12
    thirteenth: 9 //actually it is 9+12
};

var ChordLibrary = {

    [JSON.stringify([Intervals.unison])]: "note",
    [JSON.stringify([Intervals.unison, Intervals.major_second])]: "sus2(no5)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third])]: "m(no5)",
    [JSON.stringify([Intervals.unison, Intervals.major_third])]: "(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fourth])]: "sus4(no5)",
    [JSON.stringify([Intervals.unison, Intervals.sharp_fourth])]: "b5(no3)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth])]: "5",
    [JSON.stringify([Intervals.unison, Intervals.sharp_fifth])]: "aug(no3)",
    [JSON.stringify([Intervals.unison, Intervals.sixth])]: "6(no3)",
    [JSON.stringify([Intervals.unison, Intervals.major_seventh])]: "maj7(no3 or no5)",
    [JSON.stringify([Intervals.unison, Intervals.flat_seventh])]: "7(no3 or no5)",


 
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.perfect_fifth])]: "sus2",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.perfect_fifth])]: "m",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth])]: "",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fourth, Intervals.perfect_fifth])]: "sus4",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_fifth])]: "dim",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sharp_fifth])]: "aug",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sixth])]: "6(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.sixth])]: "6(no3)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.sixth])]: "m6(no5)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.sharp_fifth])]: "mb6(no5)",
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.sixth])]: "6sus2",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fourth, Intervals.sixth])]: "6sus4",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sharp_fifth])]: "mb6",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.sharp_fifth])]: "b6(no3)",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.major_seventh])]: "maj7(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.major_seventh])]: "maj7(no3)",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.flat_seventh])]: "7(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.flat_seventh])]: "7(no3)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_seventh])]: "m7(no5)",
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.major_seventh])]: "maj7sus2(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fourth, Intervals.major_seventh])]: "maj7sus4(no5)",
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.flat_seventh])]: "7sus2(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fourth, Intervals.flat_seventh])]: "7sus4(no5)",
    [JSON.stringify([Intervals.unison, Intervals.major_seventh, Intervals.flat_seventh])]: "7,maj7(no3)",
    [JSON.stringify([Intervals.unison, Intervals.flat_ninth, Intervals.major_seventh])]: "maj7b9(no3)",
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.flat_ninth])]: "sus2(addb9)",



    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.flat_ninth])]: "addb9(no5)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_ninth])]: "maddb9(no5)", 
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.major_ninth])]: "add9(no5)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.sharp_ninth])]: "add#9(no5)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.major_ninth])]: "madd9(no5)",
   // [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.sharp_ninth])]: "madd#9(no5)", this cant be right because #9 is the same as m3
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.eleventh])]: "add11(no5)",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sharp_eleven])]: "add#11(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.sharp_eleven])]: "add#11(no3)",

    [JSON.stringify([Intervals.unison, Intervals.major_seventh, Intervals.thirteenth])]: "maj13(no3)",
    [JSON.stringify([Intervals.unison, Intervals.flat_seventh, Intervals.thirteenth])]: "13(no3)",
    [JSON.stringify([Intervals.unison, Intervals.flat_seventh, Intervals.sharp_fifth])]: "b13(no3)",


    [JSON.stringify([Intervals.unison, Intervals.sharp_fifth, Intervals.flat_fifth])]: "b6,b5(no3)",
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.sharp_eleven])]: "sus2(add#11)",   


    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth, Intervals.sixth])]: "6",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.perfect_fifth, Intervals.sixth])]: "m6",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sixth, Intervals.major_ninth])]: "6/9",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.sixth, Intervals.major_ninth])]: "m6/9",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth, Intervals.major_seventh])]: "maj7",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.perfect_fifth, Intervals.flat_seventh])]: "m7",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth, Intervals.flat_seventh])]: "7",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_fifth, Intervals.flat_seventh])]: "m7(b5)",
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.perfect_fifth, Intervals.major_seventh])]: "maj7sus2",
    [JSON.stringify([Intervals.unison, Intervals.major_second, Intervals.perfect_fifth, Intervals.flat_seventh])]: "7sus2",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sixth, Intervals.eleventh])]: "(6/11)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_fifth, Intervals.sixth])]: "dim7",




    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth, Intervals.major_ninth])]: "add9",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.major_seventh, Intervals.major_ninth])]: "maj9",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.flat_seventh, Intervals.major_ninth])]: "9",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_seventh, Intervals.major_ninth])]: "m9",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.major_seventh, Intervals.eleventh])]: "maj11",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_seventh, Intervals.eleventh])]: "m11",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.flat_seventh, Intervals.eleventh])]: "m11(no3)",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.major_seventh, Intervals.thirteenth])]: "maj13",


















    












   // [JSON.stringify([Intervals.perfect_fifth, Intervals.unison, Intervals.major_third])]: "second inversion major",  



    [JSON.stringify([Intervals.unison, Intervals.unison, Intervals.unison, Intervals.unison, Intervals.unison, Intervals.unison])]: "test"
    // Add more chord definitions here...
};
