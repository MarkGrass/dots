export const randomColorChunk = (): number => {
    return Math.floor(Math.random() * 255);
};

export const randomColor = (): string => {
    const red = randomColorChunk();
    const green = randomColorChunk();
    const blue = randomColorChunk();
    const alpha = Math.round(Math.random() * 10) / 10;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const palette = (): string => {
    const colors = ['#451952', '#662549', '#ae445a', '#f39f5a', '#e8bcb9'];
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
};
