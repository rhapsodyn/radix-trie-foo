class Node {
  public edges: Edge[];
  public isWord: boolean;

  constructor(isWord: boolean) {
    this.edges = [];
    this.isWord = isWord;
  }

  isLeaf() {
    return this.edges.length === 0;
  }
}

type NullableNode = Node | null;

type NullableEdge = Edge | null;

class Edge {
  public targetNode: NullableNode;
  public label: string;
  public fullLabel: string;

  constructor(str: string, full: string) {
    this.label = str;
    this.targetNode = null;
    this.fullLabel = full;
  }
}

function prefixLen(strA: string, strB: string) {
  const len = strA.length < strB.length ? strA.length : strB.length;
  let i = 0;
  for (; i < len; i++) {
    if (strA[i] !== strB[i]) {
      break;
    }
  }
  return i;
}

export class RadixTree implements Tree {
  private root: Node;

  constructor() {
    this.root = new Node(false);
  }

  private findEdge(str: string) {
    let node: NullableNode = this.root;
    let elementFound = 0;
    let lastEdge: NullableEdge = null;

    while (node !== null && elementFound < str.length) {
      let i = 0;
      let e: NullableEdge = null;
      for (const edge of node.edges) {
        i = prefixLen(edge.label, str.substring(elementFound));
        if (i > 0) {
          e = edge as Edge;
          break;
        }
      }

      if (e) {
        node = e.targetNode;
        elementFound += i;
        lastEdge = e;

        if (i < lastEdge.label.length) {
          node = null;
        }
      } else {
        node = null;
      }
    }

    return lastEdge;
  }

  insert(str: string): void {
    const lastEdge = this.findEdge(str);

    if (!lastEdge) {
      this.root.edges.push(new Edge(str, str));
    } else {
      if (lastEdge.fullLabel.length > str.length) {
        const j = prefixLen(lastEdge.fullLabel, str);
        if (j === lastEdge.fullLabel.length) {
          const over = lastEdge.fullLabel.length - str.length;
          const front = lastEdge.label.substring(
            0,
            lastEdge.label.length - over
          );
          const back = lastEdge.label.substring(lastEdge.label.length - over);
          lastEdge.label = front;
          lastEdge.fullLabel = lastEdge.fullLabel.substring(0, str.length);
          const e = new Edge(back, lastEdge.fullLabel + back);
          const n = new Node(true);
          e.targetNode = lastEdge.targetNode;
          n.edges = [e];
          lastEdge.targetNode = n;
        } else {
          const over = lastEdge.fullLabel.length - j;
          const front = lastEdge.label.substring(
            0,
            lastEdge.label.length - over
          );
          const back = lastEdge.label.substring(lastEdge.label.length - over);
          const n = new Node(false);
          const e = new Edge(back, lastEdge.fullLabel);
          e.targetNode = lastEdge.targetNode;
          const e2 = new Edge(
            str.substring(j),
            lastEdge.fullLabel.substring(0, j) + str.substring(j)
          );
          if (e2.label.length > 0) {
            n.edges = [e, e2];
          } else {
            n.edges = [e];
          }
          lastEdge.label = front;
          lastEdge.fullLabel = lastEdge.fullLabel.substring(0, j);
          lastEdge.targetNode = n;
        }
      } else {
        const j = prefixLen(lastEdge.fullLabel, str);
        if (j === lastEdge.fullLabel.length) {
          const n = new Node(true);
          const label = str.substring(j);
          const e = new Edge(label, lastEdge.fullLabel + label);
          e.targetNode = lastEdge.targetNode;
          n.edges = [e];
          lastEdge.targetNode = n;
        } else {
          const over = lastEdge.fullLabel.length - j;
          const front = lastEdge.label.substring(
            0,
            lastEdge.label.length - over
          );
          const back = lastEdge.label.substring(lastEdge.label.length - over);
          const newFullLabel = lastEdge.fullLabel.substring(0, j);
          // console.log(`f: ${front} b: ${back} j: ${j} nfl: ${newFullLabel}`);
          lastEdge.fullLabel = newFullLabel;
          lastEdge.label = front;

          const n = new Node(false);
          const e = new Edge(back, newFullLabel + back);
          e.targetNode = lastEdge.targetNode;
          n.edges = [
            e,
            new Edge(str.substring(j), newFullLabel + str.substring(j)),
          ];
          lastEdge.targetNode = n;
        }
      }
    }
  }

  delete(str: string): boolean {
    throw new Error("Method not implemented.");
  }

  lookup(str: string): boolean {
    const lastEdge = this.findEdge(str);
    return (
      lastEdge !== null &&
      (lastEdge.targetNode === null || lastEdge.targetNode.isWord) &&
      lastEdge.fullLabel === str
    );
  }
}
