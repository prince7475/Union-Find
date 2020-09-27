class UnionFind {
  constructor(){
    this.inputData = {}
    this.objectIndexToData = {}
    this.rootIndex = [];
    this.connectNodeCount = []
    this.size = 0
    this.componentCount = 0
  }

  add(value){
    this.size++
    this.componentCount++
    this.inputData[value] = this.size - 1
    this.objectIndexToData[this.size - 1] = value
    this.rootIndex[this.size - 1] = this.size - 1
    this.connectNodeCount[this.size - 1] = 1
  }

  unify(data1, data2){

    let idx1 = this.inputData[data1]
    let idx2 = this.inputData[data2]

    let root1 = this.findRoot(idx1)
    let root2 = this.findRoot(idx2)
    if(root1 === root2) return
    if(this.connectNodeCount[root1] >= this.connectNodeCount[root2]){
      this.connectNodeCount[root1] += this.connectNodeCount[root2]
      this.rootIndex[root2] = root1
      this.componentCount--
    }else {
      this.connectNodeCount[root2] += this.connectNodeCount[root1]
      this.rootIndex[root1] = root2;
      this.componentCount--
    }
    return;
  }


  findRoot(point){
    let root = point;
    while(root != this.rootIndex[root]){
      root = this.rootIndex[root]
    }

    while(point != root){
      let next = this.rootIndex[point]
      this.rootIndex[point] = root;
      point = next
    }
    return root;
  }

  printNodePoints(){
    const result = []
    
    for(let i = 0; i < this.rootIndex.length; i++){
      const node = this.rootIndex[i]
      const pathToRoot = this.getPathToRoot(node,i)
      if(pathToRoot.length){
      result.push(pathToRoot)
      }
    }
    return result;
  }

getPathToRoot(node,startingNode){
  let path = []
  let root = node;
  if(root === this.rootIndex[root]) return `${this.objectIndexToData[startingNode]} => ${ this.objectIndexToData[this.rootIndex[root]]}`


  while(root != this.rootIndex[root]){
    path.push(this.objectIndexToData[startingNode] + " => " + this.objectIndexToData[this.rootIndex[root]])
    root = this.rootIndex[root]
  }

  return path.join("")
}

}


const unionFind = new UnionFind()
unionFind.add("A")
unionFind.add("B")
unionFind.add("C")
unionFind.add("D")
unionFind.add("E")
unionFind.add("F")


unionFind.add("G")
unionFind.add("H")
unionFind.add("I")
unionFind.add("J")
unionFind.add("K")
unionFind.add("L")

unionFind.add("Z")

unionFind.unify("E","D")
unionFind.unify("D","C")
unionFind.unify("C","B")
unionFind.unify("B","A")
unionFind.unify("A","F")

unionFind.unify("H","G")
unionFind.unify("I","H")
unionFind.unify("J","I")
unionFind.unify("K","J")
unionFind.unify("L","K")

unionFind.unify("E","H")
unionFind.unify('A',"Z")



console.log(unionFind.printNodePoints())

console.log(unionFind)
