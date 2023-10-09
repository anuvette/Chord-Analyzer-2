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
   // [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.major_second,])]: "sus2",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.perfect_fifth])]: "m",
  //  [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.minor_third])]: "m",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth])]: "",
 //   [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.major_third])]: "",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fourth, Intervals.perfect_fifth])]: "sus4",
  //  [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.perfect_fourth])]: "sus4",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.flat_fifth])]: "dim",
 //   [JSON.stringify([Intervals.unison, Intervals.flat_fifth, Intervals.minor_third])]: "dim",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sharp_fifth])]: "aug",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.sixth])]: "6(no5)",
    [JSON.stringify([Intervals.unison, Intervals.perfect_fifth, Intervals.sixth])]: "6(no3)",
    [JSON.stringify([Intervals.unison, Intervals.minor_third, Intervals.sixth])]: "m6(no5)",
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

    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth, Intervals.major_seventh])]: "maj7",
    [JSON.stringify([Intervals.unison, Intervals.major_third, Intervals.perfect_fifth, Intervals.major_ninth])]: "add9",















    












   // [JSON.stringify([Intervals.perfect_fifth, Intervals.unison, Intervals.major_third])]: "second inversion major",  



    [JSON.stringify([Intervals.unison, Intervals.unison, Intervals.unison, Intervals.unison, Intervals.unison, Intervals.unison])]: "test"
    // Add more chord definitions here...
};
