export function $(selector: any, parent?: Document): any;
export function $$(selector: any, parent?: Document): any[];
export function el(name: any, attrs: any): any;
export function el2(str: any): ChildNode;
export function el3(name: any, attrs: any): any;
export function loadFromSession(key: any): any;
export function saveToSession(key: any, object: any): void;
export function style(styles: any, id?: string): any;
export function addStyle(styles: any, id: any): void;
export function updateState(state: any, newState: any, value: any): boolean;
export function updateDom(selector: any, updateFn: any): void;
export function switchStyle(styles: any): void;
export function toggleStyle(style: any): void;
export function toBase64(svg: any): string;
export function toSearchable(string: any): any;
export function isBrazil(): boolean;
export function waitForEl(selector: any): Promise<any>;
export function onMutation(fn: any): void;
