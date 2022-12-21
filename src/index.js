fetch(
  'https://pixabay.com/api/?key=32253350-233c165c5f822b5f85a9694b5&q=yellow+flowers&image_type=photo'
).then(resp => {
  console.log(resp.json());
});
