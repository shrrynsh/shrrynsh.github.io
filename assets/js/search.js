let searchData = [];

fetch('/search.json')
	.then(res => res.json())
	.then(data =>
	{
		searchData = data;
		initSearchBars();
	});

function initSearchBars()
{
	document.querySelectorAll('.search-box').forEach(box =>
	{
		const input = box.querySelector('.search-input');
		const resultsContainer = box.querySelector('.search-results');

		if (!input || !resultsContainer) return;

		input.addEventListener('input', function ()
		{
			const query = this.value.toLowerCase();
			resultsContainer.innerHTML = '';

			if (query.length < 2) return;

			const results = searchData.filter(item =>
				item.title.toLowerCase().includes(query) ||
				item.content.toLowerCase().includes(query)
			);

			results.slice(0, 10).forEach(result =>
			{
				const li = document.createElement('li');
				li.innerHTML = `<a href="${result.url}">${result.title}</a>`;
				resultsContainer.appendChild(li);
			});
		});
	});
}
