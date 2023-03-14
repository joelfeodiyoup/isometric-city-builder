import { LinearAlgebra } from '../utilities.ts/linear-algebra';

export interface IProjection {}

/**
 * This class handles projection to display in isometric grid
 */
export class IsoProjection implements IProjection {
  xx: number[] = [1, 1, 1];
  xy: number[] = [1, 1, 1];
  public get cellHeight(): number {
    return this.ySpacing * this.cellScaling;
  }
  public get cellWidth(): number {
    return this.xSpacing * this.cellScaling;
  }
  public cellScaling = 20;
  constructor(private readonly xSpacing = 2, private readonly ySpacing = 1) {
    // this.cellHeight = ySpacing * this.cellScaling;
    // this.cellWidth = xSpacing * this.cellScaling;
    /**
     * We need to find a mapping of grid coordinates to the isometric projection.
     * To do this, we can imagine three grid points and then what we expect they will map to.
     * i.e.:
     * (1,1) -> (2x, 2y)
     * (2,1) -> (3x, y)
     * (1,2) -> (3x, 3y)
     * where x is xSpacing, y is ySpacing.
     *
     * And there should be a linear equation f(x, y) => [ax + by + c, dx + ey + g] satisfying all those
     * So we'd have two systems of linear equations. One to solve for a, b, c, the other to solve for d, e, g.
     *
     * From above, A = [[1, 2, 1], [2, 1, 1], [1, 2, 1]];
     * For the first linear equation, b = [2x, 3x, 3x],
     * For the second, b = [2y, y, 3x]
     *
     * Then the linear equation is Ax = b where x is the set of unknowns. So, [a, b, c] for the first, and [d, e, f] for the second.
     * From linear maths, x = A^-1 * b.
     */

    /**
     * inverse of the A matrix for the system of linear equations
     * We can just hard code this here.
     */
    const AInv = [
      [-1, 1, 0],
      [-1, 0, 1],
      [1, 0, 0],
    ];
    // const AInv = [[-1, 1, 0], [-1, 0, 1], [3, -1, -1]];

    // The 'b' vector is determined by the xSpacing variable, which we might want to alter.
    const bx = [0 * xSpacing, 1 * xSpacing, -1 * xSpacing];
    const by = [0 * ySpacing, 1 * ySpacing, 1 * ySpacing];
    // const bx = [2 * xSpacing, 3 * xSpacing, 3 * xSpacing];
    // const by = [2 * ySpacing, 1 * ySpacing, 3 * ySpacing];

    this.xx = LinearAlgebra.ArrayMultiply(AInv, bx);
    this.xy = LinearAlgebra.ArrayMultiply(AInv, by);
  }
  /**
   * transform from grid coordinate to the equivalent x, y coordinates for an isometric projection
   * @param x
   * @param y
   */
  pointToIso(x: number, y: number) {
    return {
      x: x * this.xx[0] + y * this.xx[1] + 1 * this.xx[2],
      y: x * this.xy[0] + y * this.xy[1] + 1 * this.xy[2],
    };
  }
}
