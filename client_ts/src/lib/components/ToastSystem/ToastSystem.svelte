<script context="module" lang="ts">
	/**
	 * This component is a toasting system the pushes infomation through an
	 * animated toast to the user. To push a new message, simply update the
	 * message store (get by getMessageStore()) to the message you like.
	 */

	import { writable, type Writable } from 'svelte/store';

	// timeout stuff
	let dispearingTimout: NodeJS.Timeout;
	let goneTimeOut: NodeJS.Timeout;

	interface Message {
		type: 'none' | 'error' | 'warn' | 'good' | 'info';
		message: string;
	}

	export const message: Writable<Message> = writable({ type: 'none', message: '' });
</script>

<script lang="ts">
	import CloseIcon from '../styles/icons/CloseIcon.svelte';
	import { onDestroy } from 'svelte';

	let isDisAppearing = false;

	function handleClose() {
		isDisAppearing = true;
	}

	const unsub = message.subscribe((v) => {
		isDisAppearing = false;
		clearTimeout(dispearingTimout);
		clearTimeout(goneTimeOut);

		if (v.type === 'none' || v.type === 'error' || v.type === 'warn') return;
		dispearingTimout = setTimeout(() => {
			isDisAppearing = true;
		}, 5000);
	});

	$: if (isDisAppearing) {
		goneTimeOut = setTimeout(() => {
			message.set({ type: 'none', message: '' });
		}, 500);
	}

	onDestroy(unsub);
</script>

{#if $message.type !== 'none'}
	{#key $message}
		<section>
			<div class={'MessageContainer ' + $message.type} class:Disappear={isDisAppearing}>
				<div class="Message">
					{$message.message}
				</div>
				<div class="CloseContainer">
					<button class="Close" on:click={handleClose}>
						<CloseIcon />
					</button>
				</div>
			</div>
		</section>
	{/key}
{/if}

<style>
	section {
		position: fixed;
		margin-left: auto;
		margin-right: auto;

		width: 100vw;

		display: flex;
		justify-content: center;

		animation: dropdown 0.5s;
		animation-timing-function: ease;
		animation-fill-mode: forwards;
		z-index: 9999;
	}

	@keyframes dropdown {
		from {
			top: -100px;
		}
		to {
			top: 15px;
		}
	}

	.Disappear {
		opacity: 0;
		animation-fill-mode: forwards;
		animation: fadeaway 0.5s;
	}

	@keyframes fadeaway {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.MessageContainer {
		width: 100%;
		max-width: 600px;
		max-height: 600px;
		padding: 10px;
		border-radius: 5px;
		font-family: Arial, Helvetica, sans-serif;

		display: flex;
		position: relative;

		margin: 0 10px;
	}

	.error {
		fill: rgb(85, 0, 0);
		color: rgb(85, 0, 0);
		background-color: pink;
		border: 1px solid rgb(194, 9, 9);
	}

	.info {
		fill: rgb(200, 184, 255);
		color: rgb(200, 184, 255);
		background-color: rgb(114, 91, 145);
		border: 1px solid rgb(87, 102, 126);
	}

	.good {
		fill: rgb(50, 235, 106);
		color: rgb(50, 235, 106);
		background-color: rgb(41, 114, 12);
		border: 1px solid rgb(21, 63, 4);
	}

	.warn {
		fill: rgb(105, 70, 5);
		color: rgb(105, 70, 5);
		background-color: rgb(214, 248, 23);
		border: 1px solid rgb(63, 62, 4);
	}

	.Message {
		flex: 1;
		overflow: auto;
	}

	.CloseContainer {
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Close {
		width: 30px;
		height: 30px;
	}

	.Close:hover :global(svg) {
		fill: #fff;
	}

	.Close :global(svg) {
		transition: fill 0.3s;
		width: 30px;
		height: 30px;
	}
</style>
