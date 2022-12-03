Attribution: written based on this tutorial https://austinchristiansen.com/posts/tw/ 

Installation:
- Install Wrnagler globally: npm install -g wrangler
- Install pakages: npm i
- Authenticate: wrangler login

- Add following variables:
wrangler secret put <variable name>

TWITTER_API_KEY
TWITTER_API_SECRET
TWITTER_AUTH_TOKEN
TWITTER_AUTH_SECRET

Create relevant KVs:

wrangler kv:namespace create "TWITTER_WORKER"

In the toml file:

kv_namespaces = [
    { binding = "TWITTER_WORKER", id = "<NAMESPACE ID>" }
]

- Deplyment:

wrangler dev
wrangler publish

