export default function getPageViewDataFromAPI(apiUrl) {
	var fullApiUrl = apiUrl + '?start-date=40daysAgo&end-date=today&type=page-statistics';
	fullApiUrl += '&url=' + window.location.href;

	var req = new XMLHttpRequest();
	req.open('GET', fullApiUrl, false);
	req.send();

	var response = JSON.parse(req.responseText)[0];

	var data = {
		sessions: { label: 'Sessions', value: response.sessions },
		users: { label: 'Users', value: response.users },
		pageviews: { label: 'Pageviews', value: response.pageviews },
		pageViewsPerSession: { label: 'Pageviews Per Session', value: (Math.round(response.pageViewsPerSession*100)/100) },
		avgSessionDuration: { label: 'Avg Session', value: (Math.round(response.avgSessionDuration) + 's') },
		bounceRate: { label: 'Bounce Rate', value: ((Math.round(response.bounceRate*100)/100) + '%') }
	};

	return data;
};