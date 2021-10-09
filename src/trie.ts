type Node = {
    char: string;
    children: Node[];
    isWord: boolean;
};

export class Trie implements Tree {
    private root: Node;

    constructor() {
        this.root = { char: "", children: [], isWord: false };
    }

    insert(str: string): void {
        if (!str || str.length === 0) {
            return
        }

        let node = this.root;
        let remain = str;

        while (remain.length > 0) {
            let cont = false
            for (const c of node.children) {
                if (remain.startsWith(c.char)) {
                    node = c;
                    remain = remain.substring(1);
                    cont = true
                    break
                }
            }
            if (cont) {
                continue
            } else {
                for (let i = 0; i < remain.length; i++) {
                    const newNode = { char: remain[i], children: [], isWord: false }
                    node.children.push(newNode)
                    node = newNode
                }
                remain = ''
            }
        }

        node.isWord = true
    }

    delete(str: string): boolean {
        throw new Error("Method not implemented.");
    }

    lookup(str: string): boolean {
        let node = this.root
        let remain = str

        while (true) {
            let cont = false
            for (const c of node.children) {
                if (remain.startsWith(c.char)) {
                    node = c
                    remain = remain.substring(1)
                    cont = true
                    break
                }
            }
            if (cont) {
                continue
            } else {
                break
            }
        }
        return node.isWord && remain.length === 0
    }
}
