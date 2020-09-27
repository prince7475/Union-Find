class UnionFind {
	constructor(){
		this.size = 0
		this.componentCount = 0
		this.nodeConnectedCount = []
		this.dataToIndex = {}
    this.indexToData = {}
		this.rootIndex = []
}

add(value){
	this.size++
	this.componentCount++
	this.dataToIndex[value] = this.size - 1
  this.indexToData[this.size - 1] = value
	this.nodeConnectedCount[this.size - 1] = 1
	this.rootIndex[this.size - 1] = this.size - 1
}


unify(data1, data2){
	if(this.dataToIndex[data1] === undefined || this.dataToIndex[data2] === undefined) return 'Data doesn’t exist'
	
	let idx1 = this.dataToIndex[data1]
	let idx2 = this.dataToIndex[data2]

	let root1 = this.findRoot(idx1)
	let root2 = this.findRoot(idx2)

		if(root1 === root2) return true

		if(this.nodeConnectedCount[root1] > this.nodeConnectedCount[root2]){
			this.unifyHelper(root1,root2)
}else {
	this.unifyHelper(root2,root1)
}
	return true;

}


unifyHelper(more,less){
			this.nodeConnectedCount[more] += this.nodeConnectedCount[less]
			this.rootIndex[less] = more
			this.componentCount--

}

findRoot(idx){
	let root = idx;
	while(root != this.rootIndex[root]){
		root = this.rootIndex[root]
}

while(idx != root){
	let next = this.rootIndex[idx]
	this.rootIndex[idx] = root
	idx = next
}

return root;
}


printConnectedNode(){
  let result = []
  Object.keys(this.dataToIndex).forEach((el) => {
    let idx = this.dataToIndex[el]
    let rootNodeIdx = this.rootIndex[idx]
    let rootValue = this.indexToData[rootNodeIdx]
    result.push(`${el} => ${rootValue}`)
  })
  return result;
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
unionFind.unify('Z',"jfsdfj")



console.log(unionFind.printConnectedNode())
console.log(unionFind)
