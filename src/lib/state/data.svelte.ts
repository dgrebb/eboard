export type WidgetData = {
	type?: string;
	id: string;
	data: unknown;
};

export type AppData = {
	count: number;
};

export type CounterWidgetData = WidgetData & {
	title: string;
};

export type InitializedDataState = {
	app: AppData;
	widgets: WidgetData[];
};

export type UninitializedDataState = undefined;

export type DataState = InitializedDataState | UninitializedDataState;

export const createDataState = () => {
	let dataState: DataState = undefined;

	return {
		allData: () => {
			return dataState;
		},

		createWidget: (id: string, widgetData: WidgetData) => {
			if (dataState === undefined) {
				dataState = { widgets: [], app: { count: 0 } };
			}
			const widgetIndex = dataState.widgets.findIndex((widget) => widget.id === id);
			if (widgetIndex === -1) {
				dataState.widgets.push({ ...widgetData });
			} else {
				throw new Error(`Widget with id ${id} already exists.`);
			}
		},

		// updateWidget: (id: string, data: WidgetData) => {
		// 	if (dataState === undefined) {
		// 		throw new Error(`No widgets data available.`);
		// 	}
		// 	const widgetIndex = dataState.widgets.findIndex((widget) => widget.id === id);
		// 	if (widgetIndex === -1) {
		// 		throw new Error(`Widget with id ${id} does not exist.`);
		// 	}
		// 	dataState.widgets[widgetIndex] = data;
		// },

		getWidgetData: (id: string) => {
			if (dataState === undefined) {
				throw new Error(`No widgets data available.`);
			}
			const widget = dataState.widgets.find((widget) => widget.id === id);
			if (widget === undefined) {
				throw new Error(`Widget with id ${id} does not exist.`);
			}
			return { ...widget };
		},

		updateWidgetData: (id: string, data: WidgetData) => {
			if (dataState === undefined) {
				throw new Error(`No widgets data available.`);
			}
			const widgetIndex = dataState.widgets.findIndex((widget) => widget.id === id);
			if (widgetIndex === -1) {
				throw new Error(`Widget with id ${id} does not exist.`);
			}
			dataState.widgets[widgetIndex] = data;
		},

		updateAllData: (data: InitializedDataState) => {
			dataState = data;
		},

		getAllWidgets: () => {
			if (dataState === undefined) {
				throw new Error(`No widgets data available.`);
			}
			return { ...dataState.widgets } as WidgetData[];
		}
	};
};

export const appData = createDataState();
