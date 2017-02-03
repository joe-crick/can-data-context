export default lowerBounds => upperBounds => function(row, index) {
	return index >= lowerBounds && index <= upperBounds;
};