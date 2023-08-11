<script context="module" lang="ts">
	function checkValidEmail(email: string): boolean {
		const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return emailReg.test(email);
	}
</script>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';

	export let value = '';
	export let disabled: boolean;
	export let invalid: boolean = true;

	function checkValid(email: string): string {
		const isEmailValid = checkValidEmail(email);
        if(!isEmailValid){
            invalid = true;
            return "Invalid email."
        }
        invalid = false;
		return '';
	}
</script>

<Textfield bind:value label="E-mail *" {disabled} {invalid} style="width: 100%;">
	<Icon class="material-icons" slot="leadingIcon">credit_card</Icon>
	<HelperText slot="helper">{checkValid(value)}</HelperText>
</Textfield>
