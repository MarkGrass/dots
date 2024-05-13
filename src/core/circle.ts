import { palette, randomFromRange } from '../utils';
import { Phys } from './phys';
import { Dynamics } from './types';

type CircleOptions = Partial<Dynamics> & {
    context: CanvasRenderingContext2D;
    radius?: number;
};

export class Circle extends Phys {
    private readonly MIN_RADIUS = 5;
    private readonly MAX_RADIUS = 15;
    private readonly context!: CanvasRenderingContext2D;
    private color = palette();

    constructor({ context, radius, x, y, dx, dy }: CircleOptions) {
        super();
        const { width, height } = context.canvas;
        const defaultRadius = randomFromRange(this.MIN_RADIUS, this.MAX_RADIUS);
        const defaultX = randomFromRange(
            defaultRadius,
            width - defaultRadius * 2,
        );
        const defaultY = randomFromRange(
            defaultRadius,
            height - defaultRadius * 2,
        );
        const xDirection = Math.round(Math.random()) > 0 ? 1 : -1;
        const yDirection = Math.round(Math.random()) > 0 ? 1 : -1;

        const defaultXSpeed =
            (xDirection * (this.MAX_RADIUS - (radius || defaultRadius))) / 10;
        const defaultYSpeed =
            (yDirection * (this.MAX_RADIUS - (radius || defaultRadius))) / 10;

        this.context = context;
        this.viewport = {
            width,
            height,
        };

        this.entity = {
            friction: randomFromRange(6, 9) / 10,
            width: radius || defaultRadius,
            height: radius || defaultRadius,
            x: x ?? defaultX,
            dx: dx ?? defaultXSpeed,
            y: y ?? defaultY,
            dy: dy ?? defaultYSpeed,
        };

        this.constraints = {
            startX: this.entity.x,
            startY: this.entity.y,
            minWidth: this.entity.width,
            minHeight: this.entity.height,
            maxWidth: this.MAX_RADIUS * 2,
            maxHeight: this.MAX_RADIUS * 2,
        };
    }

    draw() {
        this.context.beginPath();
        this.context.arc(
            this.entity.x,
            this.entity.y,
            this.entity.width,
            0,
            Math.PI * 2,
            false,
        );
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }
}
