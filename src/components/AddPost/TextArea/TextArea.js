/** @format */

import React, { useEffect, useRef } from 'react';
import classes from './TextArea.css';

const textArea = (props) => {
	const textareaRef = useRef(null);

	useEffect(() => {
		textareaRef.current.style.height = '0px';
		const scrollHeight = textareaRef.current.scrollHeight;
		textareaRef.current.style.height = scrollHeight + 'px';
	}, [props.value]);

	return (
		// <textarea name="text" onInput='this.style.height = "";this.style.height = this.scrollHeight + "px"' placeholder= "Share your moment" className={classes.TextArea}>{props.children}</textarea>
		// <textarea name="content" TextMode="MultiLine" onKeyUp="setHeight('textBox1');" onKeyDown="setHeight('textBox1');" placeholder= "Share your moment" className={classes.TextArea}>{props.children}</textarea>
		<textarea
			ref={textareaRef}
			placeholder={props.placeholder}
			className={classes.TextArea}
			value={props.value}
			onChange={props.changed}
			onKeyPress={props.press}
		/>
	);
};

export default textArea;
