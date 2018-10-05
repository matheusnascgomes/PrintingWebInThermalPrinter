/*
 * author:  Tres Finocchiaro
 * date:    2015-05-22
 * license: Public Domain; Use as you wish.
 * source:  http://qz.io
 */

/*
 * Scales text from a raw ZPL label from 203 DPI to 300 DPI
 */
function scaleZPL(rawCommands, scaleFactor) {
	if (!scaleFactor) {
		scaleFactor = 300/203;
	}
	var sections = rawCommands.split('^');
	
	// ZPL commands to perform conversion on
	var cmds = ['FO', 'A0', 'A@', 'LL', 'LH', 'GB', 'FB', 'BY', 'B3'];

	var output = '';
	for (var i in cmds) {
		for (var j in sections) {
			if (sections[j].indexOf(cmds[i]) === 0) {
				sections[j] = scaleSection(cmds[i], sections[j], scaleFactor);
			}
		}
	}
	
	return sections.join('^');
}

/*
 * Scales all integers found in a designated section
 */
function scaleSection(cmd, section, scaleFactor) {
	section = section.slice(cmd.length, section.length);
	parts = section.split(',');
	for (var p in parts) {
		if (isInt(parts[p])) {
			parts[p] = Math.round(scaleFactor * parts[p]);
		}
	}
	
	return cmd + parts.join();
}

/*
 * Checks if a string is an integer
 */
function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}