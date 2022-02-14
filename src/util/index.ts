import { useEffect } from "react";

export function delay(duration: number = 2000): Promise<void> {
  return new Promise(r => setTimeout(r, duration));
}

export function formatDoubleRender(num: number): string {
	return num > 10 ? `${num}` : `0${num}`;
}


export function getRandomColor(): string {
  return '#' + Math.random().toString(16).substr(2, 6);
}

export function useTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title}-博客后台管理系统` : "博客后台管理系统";
  }, [title]);
}