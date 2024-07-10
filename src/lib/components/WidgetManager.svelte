<script lang="ts">
	import { appData, type WidgetData } from '$lib/state/data.svelte';

	let widgetType = $state('');
	let widgetContent = $state('');
	let widgetId: string = $state('');

	// Function to add a new widget
	function addNewWidget() {
		widgetId = crypto.randomUUID();
		let widgetData: unknown;
		try {
			widgetData = JSON.parse(widgetContent);
		} catch {
			widgetData = widgetContent;
		}

		const newWidget: WidgetData = {
			id: widgetId,
			type: widgetType,
			data: widgetData
		};

		appData.createWidget(widgetId, newWidget);
	}
</script>

<div>
	<h2>Widget Manager</h2>
	<div>
		<input type="text" bind:value={widgetType} placeholder="Widget Type" />
		<input type="text" bind:value={widgetContent} placeholder="Widget Content (String or JSON)" />
		<button onclick={addNewWidget}>Add Widget</button>
	</div>
</div>
