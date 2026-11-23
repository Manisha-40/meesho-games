# Meesho Games

A working prototype for a Gameberry Labs case: grow Meesho's daily active users by 10% with a feature, without ads, paid marketing, deals or subscriptions.

Shoppers play short, familiar games inside the Meesho app (Ludo, Snakes & Ladders and Housie), earn coins they can spend at checkout, and see one product they might like while they play. Rewards keep them coming back: a daily streak, weekly goals, badges and a weekly leaderboard.

This is a concept prototype by Manisha Jena (ISB). It is not affiliated with or endorsed by Meesho. Product photos are stock images, and the streak, goals and leaderboard start with sample numbers.

## Run it

It is a static site with no build step. Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Files

- `index.html`, `styles.css`: page and styles
- `data.js`: products, strings in English, Hindi and Tamil, coin rules
- `core.js`: state, routing, coins, lucky finds, effects
- `shop.js`: the Meesho shell (home, product page, cart, coins)
- `games.js`, `ludo.js`, `snakes.js`, `housie.js`, `dice.js`: the games
- `rewards.js`: streak, weekly goals, badges, leaderboard
- `panel.js`: side panels with sample shoppers
