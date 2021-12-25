export function delay(duration: number = 2000): Promise<void> {
  return new Promise(r => setTimeout(r, duration));
}

export function formatDoubleRender(num: number): string {
	return num > 10 ? `${num}` : `0${num}`;
}


export function getRandomColor(): string {
  return '#' + Math.random().toString(16).substr(2, 6);
}