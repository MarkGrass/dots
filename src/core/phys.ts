import { Dimension, DimensionConstraints, Dynamics } from './types';

export class Phys {
    viewport: Dimension;
    entity: Dimension & Dynamics;
    constraints: DimensionConstraints;

    constructor() {}

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
}
