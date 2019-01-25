//=============================================================================
//  MuseScore
//  Linux Music Score Editor
//  $Id:$
//
//  Test plugin
//
//  Copyright (C)2008-2010 Werner Schweer and others
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License version 2.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//=============================================================================

//
//    This is ECMAScript code (ECMA-262 aka "Java Script")
//

//---------------------------------------------------------
//    init
//    this function will be called on startup of
//    mscore
//---------------------------------------------------------


function init()
	{
	// print("test script init");
	};


function run()
      {
      score.name  = "Musikalisches Wurfelspiel";
      score.title = "Musical Dice";
      score.subtitle = "A Unique Waltz Most Every Time";
      score.timesig = new TimeSig(3, 4); // set time signature to 3/4 time
      score.appendPart("Piano");    // create two staff piano part
      score.appendMeasures(16);      // append  16 empty measures

      //Form INPUT data
      //read the UI file and create a form out of it
      var loader = new QUiLoader(null);
      var file = new QFile(pluginPath + "/rolls.ui"); //generated with qtdesigner
      file.open(QIODevice.OpenMode(QIODevice.ReadOnly, QIODevice.Text));
      form = loader.load(file, null);
      //connect signal
      form.buttonBox.accepted.connect(accept);
      //show the form
      form.show();
      //set piano soundfont
      cursor.voice = 0;
      };

//---------------------------------------------------------
//    Adds a note
//---------------------------------------------------------
function addNote(cursor, pitch, duration)
      {
      var chord = new Chord();
      chord.tickLen = duration; //duration the same as tick length
//sum of duration per measure for this piece (3/4 time) must be 1440

      var note = new Note();
      note.pitch = pitch;

      chord.addNote(note);
      cursor.add(chord);
      cursor.next();
      };

//---------------------------------------------------------
//    Adds a chord
//---------------------------------------------------------
function addChord(cursor, pitch, duration, pitch2)
      {
      var chord = new Chord();
      chord.tickLen = duration; //duration the same as tick length
      var note = new Note();
      var note2 = new Note();

      note.pitch = pitch;
      note2.pitch = pitch2;

      chord.addNote(note);
      chord.addNote(note2);
      cursor.add(chord);
      cursor.next();
      };

function addTriChord(cursor, pitch, duration, pitch2, pitch3)
      {
      var chord = new Chord();
      chord.tickLen = duration; //duration the same as tick length
      var note = new Note();
      var note2 = new Note();
      var note3 = new Note();
      note.pitch = pitch;
      note2.pitch = pitch2;
      note3.pitch = pitch3;

      chord.addNote(note);
      chord.addNote(note2);
      chord.addNote(note3);
      cursor.add(chord);
      cursor.next();
      };
//---------------------------------------------------------
//    Accept ==> after player rolls dice and inputs into form
//    called when user presses "Accept" button, this populates the melody
//---------------------------------------------------------

function accept()
{
	//make array for all inputs from the form
      var rolls = new Array(form.roll1.value, form.roll2.value, form.roll3.value, form.roll4.value, form.roll5.value, form.roll6.value, form.roll7.value, form.roll8.value, form.roll9.value, form.roll10.value, form.roll11.value,form.roll12.value, form.roll13.value, form.roll14.value, form.roll15.value, form.roll16.value);

	//var composername = form.plainTextEdit.value;
	/* Measure logic (left are the measure numbers, right are the measure functions)
	1-measure1()
	2-2
	3-3
	4-4
	5-1
	6-2
	7-3
	8-4
	9-1
	10-2
	11-3
	12-4
	13-1
	14-5!
	15-4!
	16-6!
	*/

     	score.keysig = 0; // set key signature to 0 = 0 sharps or flats
	cursor.staff = 0;//treble clef
      	cursor.voice = 0;//piano soundfont
	cursor.rewind(); //start from beginning

//TODO issue with measure 4- being overwritten by measure 1 beginning = cursor issue
	for (var i=0; i < rolls.length; i++)
	{
		if (i == 15) // last measure (16)
		{
			cursor.rewind(); // added cursor reset
			for (var x=0; x < i; x++) // for loop so that cursor can be pointed at the right spot
			{
			      cursor.nextMeasure();
			}     

			measure6(form.roll16.value, i);
		}
		else if (i == 14) // 15th measure V chord
		{
			cursor.rewind();
			for (var x=0; x < i; x++)
			{
			      cursor.nextMeasure();
			}     
			measure4(form.roll15.value, i);
		}
		else if (i == 13) //14th measure IV chord
		{
			cursor.rewind();
			for (var x=0; x < i; x++)
			{
			      cursor.nextMeasure();
			}     
			measure5(form.roll14.value, i);
		}

		else
		{
			cursor.rewind();
			for (var x=0; x < i; x++)
			{
			      cursor.nextMeasure();
			}     
			rotatingMeasures[i%4](rolls[i], i); 
		}

	} 

	//Manually Hard Coded Bass clef because of cursor problem
      	cursor.staff = 1;//bass clef
      	cursor.rewind();//start at beginning
	addAChord();
	cursor.rewind();
	cursor.nextMeasure();

	addGChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addFChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addEChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addAChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addGChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addFChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addEChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addAChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addGChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addFChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addEChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addAChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addDChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addEChord();
	cursor.rewind();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();
	cursor.nextMeasure();

	addAChord();
};

//---------------------------------------------------------
//    Music Sets
//    functions to describe the 6 unique sets of 11
//---------------------------------------------------------

function measure1(rollNumber, measureIndex)
{
	if (rollNumber == 2) 
	{ //la octave
		addChord(cursor, 69, 1440, 81);
	}
	else if (rollNumber == 3) 
	{ // mi do la down
		addNote(cursor, 76, 480);
		addNote(cursor, 72, 480);
		addNote(cursor, 69, 480);
	}
	else if (rollNumber == 4) 
	{ // la do mi do, up down
		addNote(cursor, 69, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 76, 480);
		addNote(cursor, 72, 480);
	}

	else if (rollNumber == 5) 
	{ // la do 
		addNote(cursor, 69, 960);
		addNote(cursor, 72, 240);

	}
	else if (rollNumber == 6) 
	{ // so# la
		addNote(cursor, 68, 240);
		addNote(cursor, 69, 960);

	}
	else if (rollNumber == 7) 
	{ // mi la so la mi la up down up down up
		addNote(cursor, 76, 240);
		addNote(cursor, 81, 240);
		addNote(cursor, 79, 240);
		addNote(cursor, 81, 240);
		addNote(cursor, 76, 240);
		addNote(cursor, 81, 240);
	}
	else if (rollNumber == 8) 
	{ // mi , la ti do re up
		addNote(cursor, 64, 480);
		addNote(cursor, 69, 240);
		addNote(cursor, 71, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 74, 240);
	}
	else if (rollNumber == 9) 
	{ // mi octave hold for measure
		addChord(cursor, 64, 1440, 76);
	}
	else if (rollNumber == 10) 
	{ // mi so mi, up down
		addNote(cursor, 76, 480);
		addNote(cursor, 81, 480);
		addNote(cursor, 76, 480);
	}

	else if (rollNumber == 11) 
	{ //re# mi up
		addNote(cursor, 75, 480);
		addNote(cursor, 76, 960);
	}
	else if (rollNumber == 12) 
	{ // la la la la la la, up down
		addNote(cursor, 69, 240);
		addNote(cursor, 81, 240);
		addNote(cursor, 81, 240);
		addNote(cursor, 69, 240);
		addNote(cursor, 69, 240);
		addNote(cursor, 81, 240);
	}

/*
      	cursor.staff = 1;//bass clef
      	cursor.rewind();//start at beginning
      	
	// go to current measure
	for (var i=0; i < measureIndex; i++)
	{
	      cursor.nextMeasure();
	}     

	addAChord();
      	cursor.staff = 0;
*/
};

function measure2(rollNumber, measureIndex)
{

	if (rollNumber == 2) 
	{    // re mi
		addNote(cursor, 74, 480);
		addNote(cursor, 76, 960);
	}
	else if (rollNumber == 3) 
	{   // do re mi up
		addNote(cursor, 72, 480);
		addNote(cursor, 74, 480);
		addNote(cursor, 76, 480);
	}

	else if (rollNumber == 4) 
	{    // re# mi do up down
		addNote(cursor, 75, 480);
		addNote(cursor, 76, 480);
		addNote(cursor, 72, 480);
	}
	else if (rollNumber == 5) 
	{   // re ti down
		addNote(cursor, 74, 480);
		addNote(cursor, 71, 960);
	}
	else if (rollNumber == 6) 
	{   // fa re down
		addNote(cursor, 77, 480);
		addNote(cursor, 74, 960);
	}

	else if (rollNumber == 7) 
	{   // re fa up
		addNote(cursor, 74, 480);
		addNote(cursor, 77, 960);
	}
	else if (rollNumber == 8) 
	{   // tire  tire domi  up
		addChord(cursor, 71, 960, 74);
		addChord(cursor, 71, 240, 74);
		addChord(cursor, 72, 240, 76);
	}
	else if (rollNumber == 9) 
	{    // mi fa so up
		addNote(cursor, 76, 240);
		addNote(cursor, 77, 240);
		addNote(cursor, 79, 960);
	}
	else if (rollNumber == 10) 
	{ //ti octave
		addChord(cursor, 71, 1440, 83);
	}
	else if (rollNumber == 11) 
	{ //so octave
		addChord(cursor, 67, 1440, 79);
	}	
	else if (rollNumber == 12) 
	{    // ti re re up
		addNote(cursor, 71, 480);
		addNote(cursor, 74, 480);
		addNote(cursor, 74, 480);
	}

/*
        cursor.staff = 1;//bass clef
        cursor.rewind(); //go to beginning
       
	// go to current measure
	for (var i=0; i < measureIndex; i++)
	{
	      cursor.nextMeasure();
	}   

      addGChord();
      cursor.staff = 0;
*/

};

function measure3(rollNumber, measureIndex)
{
	if (rollNumber == 2) 
	{ // do octave
		addChord(cursor, 60, 1440, 72);
	}
	else if (rollNumber == 3) 
	{ //lado
		addChord(cursor, 69, 1440, 72);
	}
	else if (rollNumber == 4) 
	{ //fa la ti do, up
		addNote(cursor, 65, 480);
		addNote(cursor, 69, 240);
		addNote(cursor, 71, 240);
		addNote(cursor, 72, 480);
	}
	else if (rollNumber == 5) 
	{ //do ti la fa la, down up
		addNote(cursor, 72, 480);
		addNote(cursor, 71, 240);
		addNote(cursor, 69, 240);
		addNote(cursor, 65, 240);
		addNote(cursor, 69, 240);
	}
	else if (rollNumber == 6) 
	{ // fa octave
		addChord(cursor, 65, 1440, 77);
	}
	else if (rollNumber == 7) 
	{ // la octave so fa, down
		addChord(cursor, 69, 480, 81);
		addNote(cursor, 67, 480);
		addNote(cursor, 65, 480);
	}

	else if (rollNumber == 8) 
	{ //ti do la, up down
		addNote(cursor, 71, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 69, 480);
	}
	else if (rollNumber == 9) 
	{ //do mi la, up down
		addNote(cursor, 72, 240);
		addNote(cursor, 76, 240);
		addNote(cursor, 69, 480);
	}
	else if (rollNumber == 10) 
	{ //la mi do la,  up down
		addNote(cursor, 69, 960);
		addNote(cursor, 76, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 69, 480);

	}
	else if (rollNumber == 11) 
	{ // la so# down
		addNote(cursor, 69, 480);
		addNote(cursor, 68, 960);

	}
	else if (rollNumber == 12) 
	{ //la ti fa, up down
		addNote(cursor, 69, 240);
		addNote(cursor, 71, 240);
		addNote(cursor, 65, 480);
	}


/*
	cursor.staff = 1;//bass clef
        cursor.rewind(); //go to beginning

	// go to current measure
	for (var i=0; i < measureIndex; i++)
	{
	      cursor.nextMeasure();
	}   

        addFChord();
        cursor.staff = 0;
*/

};
function measure4(rollNumber, measureIndex)
{
	if (rollNumber == 2) 
	{ //ti do ti, up down
		addNote(cursor, 71, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 71, 960);
	}
	else if (rollNumber == 3) 	
	{ //so# ti re do re so#, up down
		addNote(cursor, 68, 240);
		addNote(cursor, 71, 240);		
		addNote(cursor, 74, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 74, 240);
		addNote(cursor, 68, 240);
	}
	else if (rollNumber == 4) 
	{ // mi octave
		addChord(cursor, 64, 1440, 76);
	}
	else if (rollNumber == 5) 
	{ //so# mi, up 
		addNote(cursor, 68, 480);
		addNote(cursor, 76, 960);
	}
	else if (rollNumber == 6) 
	{ //ti re ti, up down
		addNote(cursor, 71, 480);
		addNote(cursor, 74, 480);
		addNote(cursor, 71, 480);
	}	
	else if (rollNumber == 7) 
	{ //so# re ti, up down
		addNote(cursor, 69, 480);
		addNote(cursor, 74, 480);
		addNote(cursor, 71, 480);
	}
	else if (rollNumber == 8) 
	{ // ti mi octave, up 
		addNote(cursor, 71, 480);
		addChord(cursor, 64, 960, 76);
	}
	else if (rollNumber == 9) 
	{ // ti so# mi, down up
		addNote(cursor, 71, 480);
		addNote(cursor, 68, 480);
		addNote(cursor, 76, 480);
	}

	else if (rollNumber == 10) 
	{ // ti mi octave so#, up down 
		addNote(cursor, 71, 480);
		addChord(cursor, 64, 480, 76);
		addNote(cursor, 68, 480);
	}


	else if (rollNumber == 11) 	
	{ //mi re do ti mi, down up
		addNote(cursor, 76, 240);
		addNote(cursor, 74, 240);		
		addNote(cursor, 72, 240);
		addNote(cursor, 71, 240);
		addNote(cursor, 76, 480);

	}
	else if (rollNumber == 12) 	
	{ //mi fa mi do mi, up down up down
		addNote(cursor, 76, 240);
		addNote(cursor, 77, 240);		
		addNote(cursor, 76, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 76, 480);

	}

/*
	cursor.staff = 1;//bass clef
        cursor.rewind(); //go to beginning
        
	// go to current measure
	for (var i=0; i < measureIndex; i++)
	{
	      cursor.nextMeasure();
	}   
	
        addEChord();
        cursor.staff = 0;
*/
};
//Measure 14- special case for resolution of peice
function measure5(rollNumber, measureIndex)
{
	if (rollNumber == 2) 
	{ // re la fa down
		addNote(cursor, 74, 480);
		addNote(cursor, 69, 480);
		addNote(cursor, 65, 480);
	}
	else if (rollNumber == 3) 
	{ //fa re octave up
		addNote(cursor, 65, 480);
		addChord(cursor, 62, 960, 74);
	}
	else if (rollNumber == 4) 
	{ // re octave 
		addChord(cursor, 62, 1440, 74);
	}
	else if (rollNumber == 5) 
	{ // ti do la, up down
		addNote(cursor, 71, 480);
		addNote(cursor, 72, 480);
		addNote(cursor, 69, 480);
	}

	else if (rollNumber == 6) 
	{ // re do la, down
		addNote(cursor, 74, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 69, 960);
	}
	else if (rollNumber == 7) 
	{ // re fa la do la, up down
		addNote(cursor, 62, 480);
		addNote(cursor, 65, 240);
		addNote(cursor, 69, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 69, 240);
	}
	else if (rollNumber == 8) 
	{ // re do ti do la, down
		addNote(cursor, 74, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 71, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 69, 480);
	}
	else if (rollNumber == 9) 
	{ // re la fa mi re, down
		addNote(cursor, 74, 240);
		addNote(cursor, 69, 240);
		addNote(cursor, 77, 240);
		addNote(cursor, 76, 240);
		addNote(cursor, 74, 480);
	}

	else if (rollNumber == 10) 
	{ //ti la re octave, down up
		addNote(cursor, 71, 240);
		addNote(cursor, 69, 240);
		addChord(cursor, 62, 960, 74);
	}
	else if (rollNumber == 11) 
	{ // ti fa re down
		addNote(cursor, 71, 480);
		addNote(cursor, 65, 480);
		addNote(cursor, 62, 480);
	}


	else if (rollNumber == 12) 
	{ // re la octave, up down
		addNote(cursor, 74, 960);
		addChord(cursor, 69, 480,81);
	}



/*
	cursor.staff = 1;//bass clef
        cursor.rewind(); //go to beginning
        
	// go to current measure
	for (var i=0; i < measureIndex; i++)
	{
	      cursor.nextMeasure();
	}   
	
        addDChord();
        cursor.staff = 0;
*/
};

//Ending measure
function measure6(rollNumber, measureIndex)
{
	if (rollNumber == 2) 
	{ //la mi do mi do la up down 
		addNote(cursor, 81, 240);
		addNote(cursor, 76, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 76, 240);
		addNote(cursor, 69, 480);
	}
	else if (rollNumber == 3) 
	{ //la 
		addNote(cursor, 69, 1440);
	}
	else if (rollNumber == 4) 
	{ // ladomi 
		addChord(cursor, 69, 960, 72);
	}
	else if (rollNumber == 5) 
	{ // ti do la, up down
		addNote(cursor, 71, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 69, 960);
	}
	else if (rollNumber == 6) 
	{ // mi do la, down
		addNote(cursor, 76, 480);
		addNote(cursor, 72, 480);
		addNote(cursor, 69, 480);
	}

	else if (rollNumber == 7) 
	{ //so# la, up
		addNote(cursor, 68, 480);
		addNote(cursor, 69, 960);
	}
	else if (rollNumber == 8) 
	{ //do, so#, la, down up
		addNote(cursor, 72, 240);
		addNote(cursor, 68, 240);
		addNote(cursor, 69, 960);
	}
	else if (rollNumber == 9) 
	{ //ti do la,  up down
		addNote(cursor, 71, 240);
		addNote(cursor, 72, 240);
		addNote(cursor, 69, 960);
	}
	else if (rollNumber == 10) 
	{ //la octave
		addChord(cursor, 69, 1440, 81);
	}
	else if (rollNumber == 11) 
	{ //mi la, down
		addNote(cursor, 76, 480);
		addNote(cursor, 69, 960);
	}
	else if (rollNumber == 12) 
	{ //la la la la, up down
		addNote(cursor, 69, 240);
		addNote(cursor, 81, 240);
		addNote(cursor, 81, 240);
		addNote(cursor, 69, 720);
	}

/*
	cursor.staff = 1;//bass clef
        cursor.rewind(); //go to beginning
        
	// go to current measure
	for (var i=0; i < measureIndex; i++)
	{
	      cursor.nextMeasure();
	}   
	
        addAChord(); 
        cursor.staff = 0;
*/
};

//---------------------------------------------------------
//  Bass Clef Chords 
//---------------------------------------------------------

//---------------------------------------------------------
//   A minor chord
//---------------------------------------------------------

function addAChord()
{
	addNote(cursor, 45, 480);
	addChord(cursor, 48, 480, 52);
	addChord(cursor, 48, 480, 52);
};

//---------------------------------------------------------
//   G major chord
//---------------------------------------------------------

function addGChord()
{
	addNote(cursor, 43, 480);
	addChord(cursor, 47, 480, 50);
	addChord(cursor, 47, 480, 50);
};

//---------------------------------------------------------
//   F major chord
//---------------------------------------------------------

function addFChord()
{
	addNote(cursor, 41, 480);
	addChord(cursor, 45, 480, 48);
	addChord(cursor, 45, 480, 48);
};

//---------------------------------------------------------
//   E major chord
//---------------------------------------------------------

function addEChord()
{
	addNote(cursor, 40, 480);
	addChord(cursor, 44, 480, 47);
	addChord(cursor, 44, 480, 47);
      //addTriChord(cursor, 44, 480, 47, 50);
};
//---------------------------------------------------------
//   D major chord
//---------------------------------------------------------

function addDChord()
{
	addNote(cursor, 38, 480);
	addChord(cursor, 41, 480, 45);
	addChord(cursor, 41, 480, 45);
};
//---------------------------------------------------------
//    menu:  defines were the function will be placed
//           in the menu structure
//---------------------------------------------------------
var rotatingMeasures = new Array(measure1, measure2, measure3, measure4);
var score = new Score();
var cursor = new Cursor(score);

var mscorePlugin = {
      menu: 'Plugins.Musical Dice',
      init: init,
      run:  run
      };

mscorePlugin;

