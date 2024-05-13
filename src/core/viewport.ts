import { Circle } from './circle';
import { Position } from './types';

export class Viewport {
    private readonly POINTER_THRESHOLD = 40;
    private readonly rootEl: Element;
    private readonly canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    private circles: Circle[] = [];
    private pointer: Position = {
        x: Infinity,
        y: Infinity,
    };

    private moveAnimation = 0;

    constructor(appRoot: Element) {
        if (!appRoot) {
            return;
        }
        this.rootEl = appRoot;
        this.canvas = document.createElement('canvas');
        this.rootEl.appendChild(this.canvas);

        this.run = this.run.bind(this);
        this.poiterPosition = this.poiterPosition.bind(this);
        this.freeze = this.freeze.bind(this);
        this.drop = this.drop.bind(this);

        this.init();
        this.interaction();
    }

    private init(): void {
        const { width, height } = this.rootEl.getBoundingClientRect();

        this.canvas.height = height;
        this.canvas.width = width;
        this.context = this.canvas.getContext('2d');

        this.circles = Array.from({ length: 800 }, () => {
            return new Circle({ context: this.context });
        });

        this.run();
    }

    private run(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.moveAnimation = requestAnimationFrame(this.run);

        for (const circle of this.circles) {
            if (
                this.pointer.x - circle.entity.x < this.POINTER_THRESHOLD &&
                this.pointer.x - circle.entity.x >
                    this.POINTER_THRESHOLD * -1 &&
                this.pointer.y - circle.entity.y < this.POINTER_THRESHOLD &&
                this.pointer.y - circle.entity.y > this.POINTER_THRESHOLD * -1
            ) {
                circle.scaleUp();
            } else {
                circle.scaleDown();
            }

            circle.move();
            circle.draw();
        }
    }

    private poiterPosition(event: MouseEvent): void {
        const { x, y } = event;
        this.pointer = {
            x,
            y,
        };
    }

    private freeze(): void {
        cancelAnimationFrame(this.moveAnimation);
        for (const circle of this.circles) {
            circle.freeze();
        }
    }

    private drop(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.moveAnimation = requestAnimationFrame(this.drop);

        for (const circle of this.circles) {
            circle.drop();
            circle.draw();
        }
    }

    private interaction(): void {
        window.addEventListener('resize', () => {
            this.init();
        });

        this.canvas.addEventListener('mousemove', this.poiterPosition);
        this.canvas.addEventListener('mousedown', this.freeze);
        this.canvas.addEventListener('mouseup', this.drop);
    }
}
