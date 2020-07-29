export const getDataProps = (utils, props) => {
  // Use JSON for Instagram; there are no CORS problems with Instagram's API:
  const instagramPromise = utils.client
    .request(`https://api.instagram.com/oembed?url=${props.embedInstagramURL}`)
    .then((res) => res.json())
    .catch((e) => console.log(`Error when fetching Instagram Post: ${e}`))
  // CORS or Cross Origin Resource Sharing is a security measure that causes
  // you to take extra steps to show the content when working in your local
  // development environment. CORS is not relevant for Instagram, but will
  // be if you try to embed a Tweet using oEmbed.

  // Using the request helper function from the Element SDK (available as
  // utils.client.request) fixes "ReferenceError: fetch is not defined",
  // which would occur if you are trying to use fetch on the server side.
  // The Fetch API (window.fetch) is not defined on the server, since there
  // is no window object outside of the browser. Request acts like fetch.

  // Because the embed code for Instagram posts include <script> tags for their
  // embed scripts, which you will load separately, you need to remove them.
  const jsonEscape = (string) => string.replace(/<script.*<\/script>/, "")
  // Specifically, leaving the </script> tag will cause "SyntaxError:
  // unterminated string literal" error in some browsers, including Firefox.

  return instagramPromise.then((value) =>
    value ? jsonEscape(value.html) : null
  ) // Return null (or an optional error message) if the Promise fails.
  // If the Promise didn't work for some reason, then you can't access the
  // property value.html, so you need to return null to avoid a TypeError.
  //
  // This is usually not a problem with Instagram posts, but can occur if the
  // network request fails for some reason, such as if the oEmbed API is down.

  // If returning multiple Promises, it can be helpful to use Promise.all with
  // an array of Promises, such as when fetching multiple social media posts:
  // return Promise.all([instagramPromiseOne, instagramPromiseTwo]).then(
  //   (values) => [
  //   values[0] ? jsonEscape(values[0].html) : null,
  //   values[1] ? jsonEscape(values[1].html) : null,
  // ])
}
