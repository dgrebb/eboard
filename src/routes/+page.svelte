<script lang="ts">
	import WidgetManager from '$lib/components/WidgetManager.svelte';
	import { appData, type WidgetData } from '$lib/state/data.svelte';
	import { onMount, type Component } from 'svelte';
	import { writable, derived } from 'svelte/store';

	// Initialize widgets as an empty array
	let widgets = $state<WidgetData[]>([]);

	// Create a writable store for components
	let components: Record<string, Component> = {};

	// Derived store to load components dynamically based on widgets
	$effect(() => {
		widgets = appData.getAllWidgets();
		console.log('🚀 ~ $effect ~ widgets:', widgets);
	});

	async function loadComponents() {
		for (const widget of widgets) {
			if (widget.type && !components[widget.type]) {
				try {
					components[widget.type] = (
						await import(`$widgets/${widget.type}/${widget.type}.svelte`)
					).default;
				} catch (error) {
					console.error(`Failed to load component for type: ${widget.type}`, error);
				}
			}
		}
	}

	onMount(() => {
		// Initial load of components (even though widgets is initially empty)
		loadComponents();
	});

	// Function to add a widget
	const addWidget = (widget: WidgetData) => {
		appData.createWidget(widget.id, widget);
		widgets = appData.getAllWidgets();
	};
</script>

<WidgetManager {addWidget} />

<h1>Widgets</h1>
{#each widgets as { id, type, data }, key}
	{#if type && components[type]}
		<h1>{id}</h1>
		<svelte:component this={components[type]} {data} />
	{:else}
		<p>Loading component for {type || 'unknown type'}...</p>
	{/if}
{/each}
