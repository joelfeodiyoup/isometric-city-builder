/**
 * This class contains state.
 *
 * This may need to be further refined at some point.
 * i.e. right now, storing things like the rotation the user has selected, and allow the user to adjust that.
 */
export class State {
  private _rotationAtTop = 0;
  public get rotationAtTop() {
    return this._rotationAtTop;
  }
  private set rotationAtTop(n: number) {
    this._rotationAtTop = n % 4;
  }
  public rotateRight() {
    this.rotationAtTop++;
  }

  public rotateLeft() {
    this.rotationAtTop--;
  }
}
