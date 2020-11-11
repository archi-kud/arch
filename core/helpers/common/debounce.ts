const debounce = (func: () => any, delay: number): (...args: any[]) => void => { 
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]): void => {
        clearInterval(timeoutId);

        timeoutId = setTimeout((): void => {
            func.apply<any, any[], any>(this, args);
        }, delay);
    };
}

export default debounce;