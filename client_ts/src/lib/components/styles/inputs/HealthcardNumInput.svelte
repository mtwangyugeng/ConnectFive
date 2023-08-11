<script context="module" lang="ts">
	function trimDashs(s: string): string {
		return s.replaceAll('-', '');
	}
	function putDashs(s: string): string {
		// need no dash
		if (s.length < 4) return s;
		// needs one dash
		if (s.length < 7) return s.substring(0, 3) + '-' + s.substring(3);
		//needs two dashes
		return s.substring(0, 3) + '-' + s.substring(3, 6) + '-' + s.substring(6);
	}

	function generateHelperString(n: number) {
		let res = '';
		res = res.padStart(n, 'N');
		res = res.padEnd(10, 'x');
		return putDashs(res);
	}


</script>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';
	import { stringIsAllNumbers } from './_utils';

	let hnDisplay = '';
	export let value = '';

	$: {
		if (hnDisplay.length === 13) {
			hnDisplay = hnDisplay.substring(0, hnDisplay.length - 1);
		}
		value = trimDashs(hnDisplay);
		hnDisplay = putDashs(value);
	}

	let helperString = 'a';
	export let invalid = true;
	export let disabled: boolean;

	function checkValid(hn: string): void {
		if (!stringIsAllNumbers(hn)) {
			helperString = 'Inputs must be numbers.';
			invalid = true
			return;
		}

		if (hn.length < 10) {
			helperString = generateHelperString(hn.length);
			invalid = true;
			return;
		}
		helperString = generateHelperString(hn.length);
		invalid = false;
		return;
	}

	$: {
		checkValid(value)
	}
</script>

<Textfield
	bind:value={hnDisplay}
	label="Health Card Number *"
	disabled={disabled}
	style="width: 100%;"
	invalid={invalid}
>
	<Icon class="material-icons" slot="leadingIcon">credit_card</Icon>
	<HelperText slot="helper">{helperString}</HelperText>
</Textfield>
