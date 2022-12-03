/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
 import OAuth from 'oauth-1.0a';
 import { HmacSHA1, enc } from 'crypto-js';

 addEventListener('scheduled', event => {
	event.waitUntil(triggerPost(event));
  });
  

 const oauth = new OAuth({
	consumer: { key: TWITTER_API_KEY, secret: TWITTER_API_SECRET },
	signature_method: 'HMAC-SHA1',
	hash_function: hashSha1,
});

function hashSha1(baseString, key) {
	return HmacSHA1(baseString, key).toString(enc.Base64)

}

// Will be added to request headers
const reqAuth = {
	url: "https://api.twitter.com/2/tweets",
	method: 'POST',
  };
  
  const token = {
	  key: TWITTER_AUTH_TOKEN,
	  secret: TWITTER_AUTH_SECRET,
  };
  
async function triggerPost(event) {
  
	var reqBody = JSON.stringify({
	  "text": await TWITTER_WORKER.get("TWEET_CONTENT")
	});
	
	const response = await fetch(reqAuth.url, {
	  method: reqAuth.method,
	  headers: {
		...oauth.toHeader(oauth.authorize(reqAuth, token)),
		'Content-Type': 'application/json',
	  },
	  body: reqBody
	})
	
	 return new Response(await response.json());
  }
  