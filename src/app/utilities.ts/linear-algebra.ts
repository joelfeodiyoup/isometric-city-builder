export class LinearAlgebra {
  private static orderedMToNArray(m: number, n: number) {
    return Array.from(Array(n - m), (_, i) => i + m);
  }
  /**
   * Get a vector from m to n.
   *
   * m can be > n if you want. i.e. f(4,1) => [4,3,2,1]
   * @param m -2
   * @param n 4
   * @returns [-2,-1,0,1,2,3,4]
   */
  public static arrayMToN(m: number, n: number) {
    return m < n
      ? this.orderedMToNArray(m, n)
      : this.orderedMToNArray(n, m).reverse();
  }

  public static ArrayMultiply(A: number[][], b: number[]) {
    if (A[0]?.length !== b.length) {
      console.error('dimensions dont match');
      return Array.from(Array(b.length), () => 0);
    }
    const x = A.map((row) => {
      return row.reduce((sum, current, i) => {
        return (sum += current * b[i]);
      }, 0);
    });
    return x;
  }
}
