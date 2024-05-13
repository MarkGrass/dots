export interface Position {
    x: number;
    y: number;
}

export interface Dimension {
    width: number;
    height: number;
}

export interface DimensionConstraints {
    startX?: number;
    startY?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}

export interface Dynamics {
    x: number;
    y: number;
    dx: number;
    dy: number;
}
