import { ArrayTree } from "./array-tree";
import { RadixTree } from "./radix-tree";
import { Trie } from "./trie";
const stringifyObject = require("stringify-object");

const ARRAY_LEN = 2 << 15;
// const ARRAY_LEN = 2 << 5;
const STR_LEN = 2 << 3;

function genRandStr() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < STR_LEN; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function genRandStrs() {
  // const uniqueStrs = new Set<String>();
  // for (let i = 0; i < ARRAY_LEN; i++) {
  //   uniqueStrs.add(genRandStr());
  // }
  // return uniqueStrs;
  const uniqueStrs: any = {};
  for (let i = 0; i < ARRAY_LEN; i++) {
    uniqueStrs[genRandStr()] = true;
  }
  return Object.keys(uniqueStrs);
}

function shuffle<T>(a: Array<T>) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prettyPrint(obj: object) {
  console.log(
    stringifyObject(obj, {
      indent: " ",
      filter(_obj: object, prop: string) {
        return prop !== "fullLabel";
      },
    })
  );
}

test("stuctural correct", () => {
  // const rTrie1 = new RadixTree();
  // rTrie1.insert("test");
  // rTrie1.insert("tester");
  // rTrie1.insert("tester");
  // rTrie1.insert("test");
  // rTrie1.insert("t");
  // rTrie1.insert("test");
  // rTrie1.insert("team");
  // rTrie1.insert("tm");
  // rTrie1.insert("thereafter");
  // rTrie1.insert("therein");
  // rTrie1.insert("this");
  // prettyPrint(rTrie1);
  // const rTrie0 = new RadixTree();
  // rTrie0.insert("romane");
  // rTrie0.insert("romanus");
  // rTrie0.insert("romulus");
  // rTrie0.insert("rubens");
  // rTrie0.insert("ruber");
  // rTrie0.insert("rubicon");
  // rTrie0.insert("rubicundus");
  // rTrie0.insert("rttttttt");
  // rTrie0.insert("rCCCCCCCCCC");
  // prettyPrint(rTrie0);
  // expect(rTrie0.lookup("ruber")).toBe(true);
  // expect(rTrie0.lookup("rubers")).toBe(false);
  // expect(rTrie0.lookup("rubic")).toBe(false);
});

describe("measure time of", () => {
  const all = genRandStrs();
  const evenStrs: string[] = [];
  const oddStrs: string[] = [];

  let even = true;
  for (const str of all) {
    if (even) {
      evenStrs.push(str);
    } else {
      oddStrs.push(str);
    }
    even = !even;
  }

  const exists = shuffle(evenStrs);
  const notExists = shuffle(oddStrs);

  // console.log(`success generate:${all.size} pick:${exists.length}`);
  console.log(
    `success generate:${all.length} pick:${exists.length
    } some are:${exists.slice(0, 3)}`
  );

  function foundAndLost(tree: Tree) {
    for (const str of evenStrs) {
      tree.insert(str);
    }

    const founds = [];
    for (const str of exists) {
      founds.push(tree.lookup(str));
    }

    const lost = [];
    for (const str of notExists) {
      lost.push(tree.lookup(str));
    }

    expect(founds.every(Boolean)).toBe(true);
    expect(lost.every((b) => !b)).toBe(true);
  }

  test("array", () => {
    const tree = new ArrayTree();
    foundAndLost(tree);
  });

  test('trie', () => {
    const treee = new Trie()
    foundAndLost(treee)
  })

  // test("radix tree", () => {
  //   const tree = new RadixTree();
  //   foundAndLost(tree);
  // });
});
