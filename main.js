// let data = [];

fetch(
	'https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/stickers/packs/3138/stickers?api_key=Q8RT1iMLKWXIsjwgkbtCDU9er93iFvln&limit=25&offset=0'
)
	.then(response => response.json())
	.then(rawdata => (data = rawdata.data));

var gif = document.querySelector('img');
var button = document.getElementById('button');
var input = document.querySelector('input');

var substringMatcher = function(strs) {
	return function findMatches(q, cb) {
		var matches, substringRegex;

		// an array that will be populated with substring matches
		matches = [];

		// regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i');

		// iterate through the pool of strings and for any string that
		// contains the substring `q`, add it to the `matches` array
		$.each(strs, function(i, str) {
			if (substrRegex.test(str)) {
				matches.push(str);
			}
		});

		cb(matches);
	};
};

var keywords = ['happy', 'cloud', 'hungry', 'burger'];

$('#the-basics .typeahead').typeahead(
	{
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'states',
		source: substringMatcher(states)
	}
);

button.addEventListener('click', function() {
	let gifTitles = data.map(gif => gif.title);
	let gifUrls = data.map(gif => gif.images.fixed_width_small.url);
	let searchKeyword = input.value.toLowerCase();
	let regex = new RegExp(searchKeyword, 'g');

	for (let i = 0; i < gifTitles.length; i++) {
		if (gifTitles[i].toLowerCase().match(regex)) {
			gif.src = gifUrls[i];
		}
	}
});
