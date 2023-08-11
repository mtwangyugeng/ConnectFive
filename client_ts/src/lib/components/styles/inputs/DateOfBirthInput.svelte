<script context="module" lang="ts">

	function isLeapyear(yyyy: string) {
		const y = +yyyy;
		if (y % 100 === 0) {
			if (y % 400 === 0) return true;
			return false;
		}
		return y % 4 === 0;
	}

	function generateHelperString(starter: string, n: number) {
		return starter.substring(0, n).toUpperCase() + starter.substring(n);
	}

	function checkYearIsInRange(yyyy: string): boolean {
		const currentYear = new Date().getFullYear();
		const oldestYear = currentYear - 150;
		const impY = +yyyy;

		if (impY > currentYear || impY < oldestYear) {
			return false;
		}
		return true;
	}

	function checkMonthIsInRange(mm: string): boolean {
		const impM = +mm;
		if (impM > 12 || impM < 1) {
			return false;
		}
		return true;
	}

	function checkDayIsInRange(yyyy: string, mm: string, dd: string) {
		if (['01', '03', '05', '07', '08', '10', '12'].includes(mm) && +dd > 31) return false;
		if (['04', '06', '09', '11'].includes(mm) && +dd >= 31) return false;
		if (mm === '02' && +dd >= 30) return false;
		if (!isLeapyear(yyyy) && mm === '02' && dd === '29') return false;
		return true;
	}
</script>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';
	import { stringIsAllNumbers } from './_utils';

	export let disabled: boolean;
	export let invalid: boolean = false;

	export let yyyy = '',
		mm = '',
		dd = '';

	let yInvalid = true,
		mInvalid = true,
		dInvalid = true;
	$: invalid = yInvalid || mInvalid || dInvalid;

	function errY(yyyy: string) {
		if (!stringIsAllNumbers(yyyy)) {
			yInvalid = true;
			return 'Inputs must be numbers.';
		}
		if (yyyy.length > 4) {
			yInvalid = true;
			return "Can't be more than 4 characters.";
		}
		if (yyyy.length < 4) {
			yInvalid = true;
			return generateHelperString('yyyy', yyyy.length);
		}

		if (yyyy.length === 4) {
			const isYearInRange = checkYearIsInRange(yyyy);
			if (!isYearInRange) {
				yInvalid = true;
				return 'Year is out of range.';
			}
		}

		yInvalid = false;
		return generateHelperString('yyyy', yyyy.length);
	}

	function errM(mm: string) {
		if (!stringIsAllNumbers(mm)) {
			mInvalid = true;
			return 'Inputs must be numbers.';
		}
		if (mm.length > 2) {
			mInvalid = true;
			return "Can't be more than 2 characters.";
		}
		if (mm.length < 2) {
			mInvalid = true;
			return generateHelperString('mm', mm.length);
		}

		if (mm.length === 2) {
			const isMonthInRange = checkMonthIsInRange(mm);
			if (!isMonthInRange) {
				mInvalid = true;
				return 'Month is out of range.';
			}
		}

		mInvalid = false;
		return generateHelperString('mm', mm.length);
	}

	function errD(dd: string, mInvalid: boolean, yInvalid:boolean) {
		if (!stringIsAllNumbers(dd)) {
			dInvalid = true;
			return 'Inputs must be numbers.';
		}
		if (dd.length > 2) {
			dInvalid = true;
			return "Can't be more than 2 characters.";
		}
		if (dd.length < 2) {
			dInvalid = true;
			return generateHelperString('dd', dd.length);
		}

		if (dd.length === 2) {
			let isDayInRange;
			if (!mInvalid && !yInvalid) isDayInRange = checkDayIsInRange(yyyy, mm, dd);
			else if (!yInvalid) isDayInRange = checkDayIsInRange(yyyy, '01', dd);
			else if (!mInvalid) isDayInRange = checkDayIsInRange('2000', mm, dd);
            else isDayInRange = checkDayIsInRange('2000', '01', dd);

			if (!isDayInRange) {
				dInvalid = true;
				return 'Day is out of range.';
			}
		}

		dInvalid = false;
		return generateHelperString('dd', dd.length);
	}
</script>

<section style="width: 100%;">
	<span class="Title">
		<Icon class="material-icons" slot="leadingIcon">event</Icon>
		Date of Birth
	</span>
	<div class="inputContainer">
		<span style="grid-area: y;">
			<Textfield
				bind:value={yyyy}
				label="YYYY *"
				{disabled}
				style="width: 100%;"
				invalid={yInvalid}
			>
				<HelperText slot="helper">{errY(yyyy)}</HelperText>
			</Textfield>
		</span>
		<h4 class="center" style="grid-area: d1;">-</h4>
		<span style="grid-area: m">
			<Textfield bind:value={mm} label="MM *" {disabled} style="width: 100%;" invalid={mInvalid}>
				<HelperText slot="helper">{errM(mm)}</HelperText>
			</Textfield>
		</span>
		<h4 class="center" style="grid-area: d2;">-</h4>
		<span style="grid-area: d">
			<Textfield bind:value={dd} label="DD *" {disabled} style="width: 100%;" invalid={dInvalid}>
				<HelperText slot="helper">{errD(dd, mInvalid, yInvalid)}</HelperText>
			</Textfield>
		</span>
	</div>
</section>

<style>
	.inputContainer {
		display: grid;
		grid-template-areas: 'y d1 m d2 d';
		grid-template-columns: 2fr 10px 1fr 10px 1fr;
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
