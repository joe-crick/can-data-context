const Box = x => ({
	map: f => Box(f(x)),
	fold: f => f(x),
	chain: this.fold,
	apply: box => box.map(x)
});

export default Box;