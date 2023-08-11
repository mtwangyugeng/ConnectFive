<script context="module" lang="ts">
	function stringIsAllAlphabetic(s: string): boolean {
		const reg = /^[A-Za-z]*$/;

		return reg.test(s);
	}
</script>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Icon from '@smui/textfield/icon';

	export let disabled: boolean;
	export let invalid: boolean = true;

	export let fn: string = '',
		mn: string = '',
		ln: string = '';

	$: fn = fn.toUpperCase();
	$: mn = mn.toUpperCase();
	$: ln = ln.toUpperCase();

	let invalidFn = true,
		invalidMn = false,
		invalidLn = true;
	$: invalid = invalidFn || invalidMn || invalidLn;

	function validateFn(fn: string): string {
		if (fn === '') {
			invalidFn = true;
			return 'First name cannot be empty.';
		}

		if (!stringIsAllAlphabetic(fn)) {
			invalidFn = true;
			return 'Can only contain alphabets.';
		}

		invalidFn = false;
		return '';
	}

	function validateMn(mn: string): string {
		if (!stringIsAllAlphabetic(mn)) {
			invalidMn = true;
			return 'Can only contain alphabets.';
		}

		invalidMn = false;
		return '';
	}

	function validateLn(ln: string): string {
		if (fn === '') {
			invalidLn = true;
			return 'Last name cannot be empty.';
		}

		if (!stringIsAllAlphabetic(ln)) {
			invalidLn = true;
			return 'Can only contain alphabets.';
		}

		invalidLn = false;
		return '';
	}
</script>

<section>
	<span class="Title">
		<Icon class="material-icons" slot="leadingIcon">person</Icon>
		Legal Name
	</span>
	<div class="inputContainer">
		<span style="grid-area: fn">
			<Textfield
				bind:value={fn}
				label="First Name *"
				{disabled}
				style="width: 100%;"
				invalid={invalidFn}
			>
				<HelperText slot="helper">{validateFn(fn)}</HelperText>
			</Textfield>
		</span>

		<span style="grid-area: mn">
			<Textfield
				bind:value={mn}
				label="Middle Name"
				{disabled}
				style="width: 100%;"
				invalid={invalidMn}
			>
				<HelperText slot="helper">{validateMn(mn)}</HelperText>
			</Textfield>
		</span>

		<span style="grid-area: ln">
			<Textfield
				bind:value={ln}
				label="Last Name *"
				{disabled}
				style="width: 100%;"
				invalid={invalidLn}
			>
				<HelperText slot="helper">{validateLn(ln)}</HelperText>
			</Textfield>
		</span>

	</div>
</section>

<style>
	section {
		width: 100%;
	}

	.inputContainer {
		display: grid;
		grid-template-areas: 'fn fn mn mn ln ln';
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		column-gap: 10px;
		width: 100%;
		padding-left: 20px;
	}

	.Title {
		display: flex;
		align-items: center;
        color: #777;
	}
</style>
