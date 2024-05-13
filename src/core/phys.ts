import { Dimension, DimensionConstraints, Dynamics } from './types';

export class Phys {
    private GRAVITY = 1.5;
    viewport: Dimension;
    entity: Dimension & Dynamics;
    constraints: DimensionConstraints;

    constructor() {}

    freeze(): void {
        this.entity.dy = Math.abs(this.entity.dy);
        this.entity.width = this.constraints.minWidth || this.entity.width;
        this.entity.height = this.constraints.minHeight || this.entity.height;
    }

    move(): void {
        if (
            this.entity.x > this.viewport.width - this.entity.width ||
            this.entity.x < this.entity.width
        ) {
            this.entity.dx = -this.entity.dx;
        }

        if (
            this.entity.y > this.viewport.height - this.entity.height ||
            this.entity.y < this.entity.height
        ) {
            this.entity.dy = -this.entity.dy;
        }

        this.entity.x += this.entity.dx;
        this.entity.y += this.entity.dy;
    }

    scaleUp(): void {
        if (
            this.constraints.maxWidth &&
            this.entity.width < this.constraints.maxWidth
        ) {
            this.entity.width += 1;
        }

        if (
            this.constraints.maxHeight &&
            this.entity.height < this.constraints.maxHeight
        ) {
            this.entity.height += 1;
        }
    }

    scaleDown(): void {
        if (
            this.constraints.minWidth &&
            this.entity.width > this.constraints.minWidth
        ) {
            this.entity.width -= 1;
        }

        if (
            this.constraints.minHeight &&
            this.entity.height > this.constraints.minHeight
        ) {
            this.entity.height -= 1;
        }
    }

    drop(): void {
        this.tick += 1;

        if (
            this.entity.y + this.entity.height + this.entity.dy >
            this.viewport.height
        ) {
            this.constraints.startY = Math.round(this.entity.y);
            this.entity.dy = -this.entity.dy * this.entity.friction;
        } else {
            this.entity.dy += this.GRAVITY;
        }

        if (
            this.entity.x + this.entity.width + this.entity.dx >
                this.viewport.width ||
            this.entity.x - this.entity.width <= 0
        ) {
            if (this.entity.friction < 0.1) {
                this.entity.friction = 0;
            }

            this.entity.dx = -this.entity.dx * this.entity.friction;
        }

        this.entity.x += this.entity.dx;
        this.entity.y += this.entity.dy;
    }
}
